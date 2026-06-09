"use client";

import { useEffect, useState, type ReactNode } from "react";

// SpotifyNowPlaying — renders Spotify activity as an inline italic line in
// the footer's row 2 (where "currently obsessing over: …" lives).
//
// Three states:
//   • currently playing  → ● now playing: ARTIST · TITLE   (pulsing dot)
//   • recently played    → ○ last played: ARTIST · TITLE   (static dot)
//   • neither / no proxy → renders `fallback` verbatim (the obsessing-over
//     line never disappears)
//
// Data shape from the Cloudflare Worker (cloudflare-worker/src/index.js):
//   { isPlaying, wasPlaying?, title?, artist?, albumArt?, url?, playedAt? }

type NowPlaying = {
  isPlaying: boolean;
  wasPlaying?: boolean;
  title?: string;
  artist?: string;
  albumArt?: string;
  url?: string;
  playedAt?: string;
};

const PROXY_URL = process.env.NEXT_PUBLIC_SPOTIFY_PROXY_URL;
// 30s feels live without burning Spotify quota. Bump to 60s if the worker
// starts hitting rate limits.
const POLL_MS = 30_000;

export function SpotifyNowPlaying({ fallback }: { fallback: ReactNode }) {
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
        // of flashing back to the fallback.
      }
    };

    fetchNow();
    const id = setInterval(fetchNow, POLL_MS);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);

  const hasTrack = data?.title;
  if (!hasTrack) return <>{fallback}</>;

  const label = data!.artist ? `${data!.artist} · ${data!.title}` : data!.title!;
  const isLive = data!.isPlaying;
  const prefix = isLive ? "now playing" : "last played";

  const trackText = data!.url ? (
    <a
      href={data!.url}
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-accent-brand transition-colors"
    >
      {label}
    </a>
  ) : (
    <span>{label}</span>
  );

  // Live = pulsing accent dot. Recently-played = static muted dot. The
  // visual delta signals "this is fresh" vs "this is cached" without a
  // verbose timestamp.
  const dotClass = isLive
    ? "bg-accent-brand animate-pulse [animation-duration:1.5s]"
    : "bg-muted-foreground/60";

  return (
    <span className="inline-flex items-center gap-1.5">
      <span
        className={`size-1.5 rounded-full shrink-0 ${dotClass}`}
        aria-hidden="true"
        title={isLive ? "Live from Spotify" : "Recently played on Spotify"}
      />
      <span>
        {prefix}: {trackText}
      </span>
    </span>
  );
}
