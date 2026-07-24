"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { seRadioEpisodes as fallbackEpisodes } from "@/data/se-radio";

// SERadioSection — homepage block surfacing episodes I've hosted on Software
// Engineering Radio as Apple Podcasts embeds.
//
// Episode discovery is dynamic: the iTunes Lookup API is CORS-open, so the
// browser queries Apple directly for the show's episodes and keeps the ones
// whose description names me — new episodes appear here automatically once
// Apple indexes them. (Apple 403s Cloudflare Workers, so client-side is not
// just simpler here, it is the only route that works.) The static list in
// src/data/se-radio.ts remains as the fallback when the fetch fails.

const SE_RADIO_ID = "120906714";
const LOOKUP_URL = `https://itunes.apple.com/lookup?id=${SE_RADIO_ID}&media=podcast&entity=podcastEpisode&limit=200`;

type LookupResult = {
  wrapperType: string;
  trackId: number;
  trackName: string;
  releaseDate: string;
  description?: string;
};

function embedSrcFor(id: number) {
  return `https://embed.podcasts.apple.com/us/podcast/id${SE_RADIO_ID}?i=${id}`;
}

export function SERadioSection() {
  const [episodes, setEpisodes] = useState(
    fallbackEpisodes.map((ep) => ({ title: ep.title, embedSrc: ep.embedSrc })),
  );

  useEffect(() => {
    fetch(LOOKUP_URL)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        const eps: LookupResult[] = (data?.results ?? []).filter(
          (r: LookupResult) =>
            r.wrapperType === "podcastEpisode" &&
            (r.description ?? "").includes("Amey Ambade"),
        );
        if (eps.length > 0) {
          eps.sort(
            (a, b) =>
              new Date(b.releaseDate).getTime() -
              new Date(a.releaseDate).getTime(),
          );
          setEpisodes(
            eps.map((ep) => ({
              title: ep.trackName,
              embedSrc: embedSrcFor(ep.trackId),
            })),
          );
        }
      })
      .catch(() => {
        // Apple unreachable — the static fallback stays in place.
      });
  }, []);

  if (episodes.length === 0) return null;

  return (
    <section>
      <div className="flex items-end justify-between mb-8">
        <h2 className="text-3xl font-display font-semibold">On SE Radio</h2>
        <Link
          href="https://se-radio.net"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-muted-foreground hover:text-accent-brand transition-colors"
        >
          The show →
        </Link>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {episodes.map((ep) => (
          <iframe
            key={ep.embedSrc}
            src={ep.embedSrc}
            title={ep.title}
            allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
            frameBorder={0}
            height={175}
            // Apple's recommended sandbox set for these embeds — keeps the
            // iframe usable (forms, popups for opening in the Podcasts app)
            // while blocking same-origin parent access.
            sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
            className="w-full max-w-[660px] overflow-hidden rounded-[10px]"
          />
        ))}
      </div>
    </section>
  );
}
