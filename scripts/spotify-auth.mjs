#!/usr/bin/env node
// One-time Spotify OAuth code grant — mints a permanent refresh_token for the
// Cloudflare Worker proxy that backs <SpotifyNowPlaying /> on heyamey.com.
//
// Run once:
//   SPOTIFY_CID=<id> SPOTIFY_SECRET=<secret> node scripts/spotify-auth.mjs
//
// Flow:
//   1. Prints an authorize URL — open it in your browser, click Agree.
//   2. Spotify redirects to http://127.0.0.1:8787/callback?code=... and this
//      script (listening on 8787) catches the code.
//   3. The script exchanges the code for tokens and prints the refresh_token.
//
// You only run this once — refresh tokens don't expire. Stash the printed
// token securely; you'll feed it to `wrangler secret put SPOTIFY_REFRESH`.

import http from "node:http";
import { Buffer } from "node:buffer";

const CID = process.env.SPOTIFY_CID;
const SECRET = process.env.SPOTIFY_SECRET;
const REDIRECT = "http://127.0.0.1:8787/callback";
// Two scopes — currently-playing for the live track, recently-played for the
// fallback when nothing is actively playing. If you minted a refresh_token
// before recently-played was added, re-run this script to grant the new
// scope (Spotify will treat it as a fresh authorization and issue a new
// refresh_token).
const SCOPE = "user-read-currently-playing user-read-recently-played";
const PORT = 8787;

if (!CID || !SECRET) {
  console.error(
    "Missing env vars. Run as:\n" +
      "  SPOTIFY_CID=<id> SPOTIFY_SECRET=<secret> node scripts/spotify-auth.mjs",
  );
  process.exit(1);
}

const authUrl =
  "https://accounts.spotify.com/authorize?" +
  new URLSearchParams({
    client_id: CID,
    response_type: "code",
    redirect_uri: REDIRECT,
    scope: SCOPE,
  }).toString();

console.log("\n1. Open this URL in your browser and click Agree:\n");
console.log("   " + authUrl);
console.log(
  "\n2. Waiting for the Spotify redirect on http://127.0.0.1:" + PORT + " ...\n",
);

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://127.0.0.1:${PORT}`);
  if (url.pathname !== "/callback") {
    res.statusCode = 404;
    return res.end("Not found");
  }
  const code = url.searchParams.get("code");
  if (!code) {
    res.statusCode = 400;
    res.end(
      "Missing ?code in callback. Check the Spotify dashboard redirect URI " +
        "matches " +
        REDIRECT,
    );
    return;
  }

  res.end(
    "OK — check your terminal for the refresh_token. You can close this tab.",
  );

  try {
    const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization:
          "Basic " + Buffer.from(`${CID}:${SECRET}`).toString("base64"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: REDIRECT,
      }).toString(),
    });

    const body = await tokenRes.json();
    if (!tokenRes.ok) {
      console.error("\nToken exchange failed:", tokenRes.status, body);
      process.exit(1);
    }
    console.log("\n=== refresh_token (save this — you only get one) ===\n");
    console.log(body.refresh_token);
    console.log(
      "\nNext: cd cloudflare-worker && wrangler secret put SPOTIFY_REFRESH",
    );
    console.log("(paste the token above when wrangler prompts you)\n");
  } finally {
    server.close();
  }
});

server.listen(PORT, "127.0.0.1");
