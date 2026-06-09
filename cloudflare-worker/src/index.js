// Spotify now-playing proxy for heyamey.com.
//
// Holds the long-lived refresh_token + Spotify client credentials as Worker
// secrets, exchanges them for a short-lived access_token on each request,
// hits Spotify's currently-playing endpoint, and returns a minimal JSON
// shape the static site can render directly. CORS-open so the browser-side
// fetch in <SpotifyNowPlaying /> can hit it from heyamey.com.
//
// Secrets (set via: wrangler secret put NAME):
//   SPOTIFY_CID       Spotify Client ID
//   SPOTIFY_SECRET    Spotify Client Secret
//   SPOTIFY_REFRESH   refresh_token printed by scripts/spotify-auth.mjs
//
// Response shape (consumed by SpotifyNowPlaying.tsx):
//   { isPlaying: boolean,
//     title?:    string,
//     artist?:   string,
//     albumArt?: string (image URL),
//     url?:      string (open.spotify.com link) }

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

    // 204 means "authenticated fine, but nothing is currently playing" — a
    // valid state, not an error. Mirror that as { isPlaying: false }.
    if (npRes.status === 204) {
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
