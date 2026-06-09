"use client";

import { useEffect, useState } from "react";

// SpotifyEmbed — drops Spotify's own track embed (album art + title + play
// button) at the top of the homepage Fragments list when something is
// playing. Same data source as <SpotifyNowPlaying /> (the Cloudflare Worker
// proxy at NEXT_PUBLIC_SPOTIFY_PROXY_URL), but renders the rich iframe
// instead of an inline italic line. Returns null when nothing is playing,
// so the list naturally starts at the first static fragment.
//
// Wraps itself in <li> so the parent <ul> stays valid HTML.

type NowPlaying = {
  isPlaying: boolean;
  wasPlaying?: boolean;
  title?: string;
  artist?: string;
  url?: string;
};

const PROXY_URL = process.env.NEXT_PUBLIC_SPOTIFY_PROXY_URL;
// 30s feels live without burning Spotify quota. Matches SpotifyNowPlaying.
const POLL_MS = 30_000;

export function SpotifyEmbed() {
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
        // network blips — keep the last good state.
      }
    };

    fetchNow();
    const id = setInterval(fetchNow, POLL_MS);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);

  // Render the embed as long as we have a track to show — covers both the
  // currently-playing state and the recently-played fallback. Same Spotify
  // chrome either way; the footer line (SpotifyNowPlaying) carries the
  // live-vs-recent distinction in words.
  const hasTrack = data?.title && data.url;
  if (!hasTrack) return null;

  // Spotify embed URLs use /embed/track/ID instead of /track/ID. Pull the
  // ID off the open.spotify.com link the worker returns.
  let embedSrc: string;
  try {
    const u = new URL(data!.url!);
    const trackId = u.pathname.split("/").filter(Boolean).pop();
    if (!trackId) return null;
    embedSrc = `https://open.spotify.com/embed/track/${trackId}?utm_source=generator`;
  } catch {
    return null;
  }

  return (
    <li className="leading-relaxed mb-2">
      <iframe
        src={embedSrc}
        title={`${data!.artist ?? "Unknown"} — ${data!.title}`}
        width="100%"
        height={152}
        frameBorder={0}
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        className="rounded-xl max-w-md"
      />
    </li>
  );
}
