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

export default {
  async fetch(req, env) {
    if (req.method === "OPTIONS") {
      return new Response(null, { headers: CORS });
    }

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
