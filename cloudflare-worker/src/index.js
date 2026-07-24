// Spotify now-playing proxy for heyamey.com.
//
// Holds the long-lived refresh_token + Spotify client credentials as Worker
// secrets, exchanges them for a short-lived access_token on each request,
// and returns the currently-playing Spotify track. When nothing is playing
// right now, falls back to the most recently-played track so the site never
// looks "idle". CORS-open so the browser-side fetch can hit it from
// heyamey.com.
//
// Secrets (set via: wrangler secret put NAME):
//   SPOTIFY_CID       Spotify Client ID
//   SPOTIFY_SECRET    Spotify Client Secret
//   SPOTIFY_REFRESH   refresh_token printed by scripts/spotify-auth.mjs
//                     (must have BOTH user-read-currently-playing AND
//                      user-read-recently-played scopes — re-run the helper
//                      if you minted the token before recently-played was
//                      added.)
//
// Response shape (consumed by SpotifyNowPlaying.tsx + SpotifyEmbed.tsx):
//   { isPlaying:  boolean,             // true = live right now
//     wasPlaying: boolean | undefined, // true = recently-played fallback
//     title?:     string,
//     artist?:    string,
//     albumArt?:  string (image URL),
//     url?:       string (open.spotify.com link),
//     playedAt?:  string (ISO timestamp, only for wasPlaying) }

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Cache-Control": "no-store",
  "Content-Type": "application/json",
};

// Cacheable variant for the content endpoints below — these change at most a
// few times a month, so let Cloudflare's edge cache absorb the traffic.
const CORS_CACHED = {
  "Access-Control-Allow-Origin": "*",
  "Cache-Control": "public, max-age=43200",
  "Content-Type": "application/json",
};

// NOTE: SE Radio episode discovery intentionally does NOT live here — Apple
// 403s requests from Cloudflare Workers' IPs, but the iTunes Lookup API is
// CORS-open, so SERadioSection.tsx queries Apple directly from the browser.

// /letterboxd — most recent watched films from the public Letterboxd RSS
// feed. Returns { films: [] } until the LETTERBOXD_USER var is configured.
// RSS is parsed with regexes because Workers have no DOMParser; the feed
// structure is stable enough for this to hold.
async function letterboxdRecent(env, ctx) {
  if (!env.LETTERBOXD_USER) {
    return new Response(JSON.stringify({ films: [] }), { headers: CORS_CACHED });
  }
  // v2: response shape gained `review` — key bumped so stale pre-review
  // cache entries are never served.
  const cacheKey = new Request("https://cache.internal/letterboxd-v2");
  const cached = await caches.default.match(cacheKey);
  if (cached) return cached;

  const res = await fetch(
    `https://letterboxd.com/${env.LETTERBOXD_USER}/rss/`,
    { headers: { "User-Agent": "heyamey.com library section" } },
  );
  if (!res.ok) {
    return new Response(JSON.stringify({ films: [], error: "rss_error" }), {
      status: 502,
      headers: CORS,
    });
  }
  const xml = await res.text();
  const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].slice(0, 8);
  const pick = (block, tag) =>
    (block.match(new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`)) || [])[1] ?? "";
  const decodeEntities = (s) =>
    s
      .replace(/&amp;/g, "&")
      .replace(/&quot;/g, '"')
      .replace(/&#039;/g, "'")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">");
  // description CDATA looks like <p><img .../></p> <p>review text</p>...
  // Entries with no review instead have a lone "Watched on <date>." paragraph.
  const extractReview = (block) => {
    const raw = pick(block, "description");
    const html = raw.replace(/^<!\[CDATA\[/, "").replace(/\]\]>$/, "");
    const paragraphs = [...html.matchAll(/<p>([\s\S]*?)<\/p>/g)].map(
      (m) => m[1],
    );
    const textParagraphs = paragraphs.filter((p) => !/<img\b/i.test(p));
    let text = textParagraphs.join(" ");
    text = decodeEntities(text);
    text = text.replace(/<[^>]+>/g, "").trim();
    if (text.startsWith("Watched on")) return "";
    if (text.length > 500) text = text.slice(0, 500) + "…";
    return text;
  };
  const films = items
    .map(([, block]) => ({
      title: pick(block, "letterboxd:filmTitle"),
      year: pick(block, "letterboxd:filmYear"),
      rating: pick(block, "letterboxd:memberRating"),
      watchedDate: pick(block, "letterboxd:watchedDate"),
      // Strip the leading /<user>/ segment so the Letterboxd username stays private.
      link: pick(block, "link").replace(
        /(https:\/\/letterboxd\.com)\/[^/]+\/film\//,
        "$1/film/",
      ),
      poster: (block.match(/<img src="([^"]+)"/) || [])[1] ?? "",
      review: extractReview(block),
    }))
    .filter((f) => f.title);

  const resp = new Response(JSON.stringify({ films }), {
    headers: CORS_CACHED,
  });
  ctx.waitUntil(caches.default.put(cacheKey, resp.clone()));
  return resp;
}

export default {
  async fetch(req, env, ctx) {
    if (req.method === "OPTIONS") {
      return new Response(null, { headers: CORS });
    }

    const { pathname } = new URL(req.url);
    if (pathname === "/letterboxd") return letterboxdRecent(env, ctx);

    // Trade the refresh_token for a fresh access_token. Spotify issues a new
    // access_token every call; the refresh_token itself never expires.
    const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization:
          "Basic " + btoa(`${env.SPOTIFY_CID}:${env.SPOTIFY_SECRET}`),
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: env.SPOTIFY_REFRESH,
      }).toString(),
    });

    if (!tokenRes.ok) {
      return new Response(
        JSON.stringify({ isPlaying: false, error: "token_refresh_failed" }),
        { status: 502, headers: CORS },
      );
    }
    const { access_token } = await tokenRes.json();

    const npRes = await fetch(
      "https://api.spotify.com/v1/me/player/currently-playing",
      { headers: { Authorization: `Bearer ${access_token}` } },
    );

    // 204 means "authenticated fine, but nothing is currently playing" —
    // fall back to the most recently-played track so the card never goes
    // empty. Requires user-read-recently-played on the refresh token.
    if (npRes.status === 204) {
      const recentRes = await fetch(
        "https://api.spotify.com/v1/me/player/recently-played?limit=1",
        { headers: { Authorization: `Bearer ${access_token}` } },
      );
      if (recentRes.ok) {
        const recent = await recentRes.json();
        const last = recent.items?.[0];
        const item = last?.track;
        if (item) {
          return new Response(
            JSON.stringify({
              isPlaying: false,
              wasPlaying: true,
              title: item.name,
              artist: item.artists?.map((a) => a.name).join(", "),
              albumArt:
                item.album?.images?.[1]?.url ?? item.album?.images?.[0]?.url,
              url: item.external_urls?.spotify,
              playedAt: last.played_at,
            }),
            { headers: CORS },
          );
        }
      }
      // Empty recent-played history (rare) — degrade gracefully.
      return new Response(JSON.stringify({ isPlaying: false }), {
        headers: CORS,
      });
    }
    if (!npRes.ok) {
      return new Response(
        JSON.stringify({
          isPlaying: false,
          error: "spotify_api_error",
          status: npRes.status,
        }),
        { status: 502, headers: CORS },
      );
    }

    const data = await npRes.json();
    const item = data.item;
    return new Response(
      JSON.stringify({
        isPlaying: !!data.is_playing,
        title: item?.name,
        artist: item?.artists?.map((a) => a.name).join(", "),
        // Spotify returns multiple sizes; [1] is the mid-sized (~300px) — a
        // good balance of crispness vs payload. Fall back to first if absent.
        albumArt:
          item?.album?.images?.[1]?.url ?? item?.album?.images?.[0]?.url,
        url: item?.external_urls?.spotify,
      }),
      { headers: CORS },
    );
  },
};
