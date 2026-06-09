"use client";

import { useEffect, useState } from "react";

// SpotifyNowPlaying — a small "Now playing" card rendered below the hero
// profile photo. Polls a serverless proxy (Cloudflare Worker / Vercel
// function / similar) that holds the long-lived refresh token + client
// secret, exchanges it for a fresh access token, and returns this minimal
// JSON shape:
//
//   { "isPlaying": true,
//     "title":      "Chega de Saudade",
//     "artist":     "João Gilberto",
//     "albumArt":   "https://i.scdn.co/image/...",
//     "url":        "https://open.spotify.com/track/..." }
//
// The proxy URL is read from NEXT_PUBLIC_SPOTIFY_PROXY_URL at build time.
// When unset, the request fails, or nothing is playing, the card renders
// nothing — there is no static fallback. See PLAN.md (Phase 8) for the
// Cloudflare Worker template and one-time Spotify auth steps.

type NowPlaying = {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  albumArt?: string;
  url?: string;
};

const PROXY_URL = process.env.NEXT_PUBLIC_SPOTIFY_PROXY_URL;
// 30s feels live without burning Spotify quota. Bump to 60s if the worker
// starts hitting rate limits.
const POLL_MS = 30_000;

export function SpotifyNowPlaying() {
  const [data, setData] = useState<NowPlaying | null>(null);

  useEffect(() => {
    if (!PROXY_URL) return;
    let cancelled = false;

    const fetchNow = async () => {
      try {
        const res = await fetch(PROXY_URL, { cache: "no-store" });
        if (!res.ok) return;
        const json = (await res.json()) as NowPlaying;
        if (!cancelled) setData(json);
      } catch {
        // network blips happen — keep showing the last good state instead
        // of flashing back to nothing.
      }
    };

    fetchNow();
    const id = setInterval(fetchNow, POLL_MS);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);

  const live = data?.isPlaying && data.title;
  if (!live) return null;

  const inner = (
    <>
      {data!.albumArt ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={data!.albumArt}
          alt=""
          className="size-12 rounded-md shrink-0 bg-muted object-cover"
        />
      ) : (
        <div className="size-12 rounded-md shrink-0 bg-emerald-500/15" />
      )}
      <div className="min-w-0 flex-1 text-left">
        <p className="text-[10px] uppercase tracking-wider text-muted-foreground flex items-center gap-1.5 mb-0.5">
          <span
            className="size-1.5 rounded-full bg-accent-brand animate-pulse [animation-duration:1.5s] shrink-0"
            aria-hidden="true"
          />
          Now playing
        </p>
        <p className="text-sm font-medium truncate group-hover:text-accent-brand transition-colors">
          {data!.title}
        </p>
        {data!.artist && (
          <p className="text-xs text-muted-foreground truncate">
            {data!.artist}
          </p>
        )}
      </div>
    </>
  );

  const className =
    "group flex items-center gap-3 p-3 rounded-xl border bg-card/50 hover:bg-card/80 transition-colors w-44 md:w-64 shrink-0";

  return data!.url ? (
    <a
      href={data!.url}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      title="Listening on Spotify"
    >
      {inner}
    </a>
  ) : (
    <div className={className} title="Listening on Spotify">
      {inner}
    </div>
  );
}
