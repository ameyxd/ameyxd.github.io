# Spotify now-playing proxy

Cloudflare Worker that backs the `<SpotifyNowPlaying />` card on heyamey.com.
Holds the Spotify refresh_token + client credentials as Worker secrets,
exchanges them for a short-lived access token on each request, and returns
the currently-playing track as JSON. Runs on Cloudflare's edge — your laptop
does not need to be on.

## One-time setup

### 1. Mint a refresh token (from the repo root)

```bash
SPOTIFY_CID=<your Client ID> SPOTIFY_SECRET=<your Client Secret> \
  node scripts/spotify-auth.mjs
```

Open the URL it prints, click Agree, the terminal will print a
`refresh_token`. Save it.

### 2. Install wrangler + log in (one-time per machine)

```bash
pnpm add -g wrangler
wrangler login
```

### 3. Push secrets to Cloudflare

From this `cloudflare-worker/` directory:

```bash
wrangler secret put SPOTIFY_CID       # paste Client ID
wrangler secret put SPOTIFY_SECRET    # paste Client Secret
wrangler secret put SPOTIFY_REFRESH   # paste refresh_token from step 1
```

### 4. Deploy

```bash
wrangler deploy
```

Wrangler prints the public worker URL — looks like
`https://heyamey-spotify.<your-subdomain>.workers.dev`.

### 5. Sanity check

Open the worker URL in a browser:

- nothing playing on Spotify → `{"isPlaying": false}`
- something playing → `{"isPlaying": true, "title": "...", "artist": "...", "albumArt": "...", "url": "..."}`

### 6. Wire it into the site

Add the worker URL as `NEXT_PUBLIC_SPOTIFY_PROXY_URL` in GitHub Actions
secrets. The main site workflow passes it to `pnpm build` at deploy time;
the next deploy materializes the live card.

## Updating

```bash
# Edit src/index.js, then:
wrangler deploy
```

Secrets persist across deploys.

## Cost

Cloudflare Workers free tier: 100,000 requests/day. The site polls every
30 seconds while a visitor has the page open — well under the limit for any
realistic traffic. Spotify API: free, no quota concerns for personal use.
