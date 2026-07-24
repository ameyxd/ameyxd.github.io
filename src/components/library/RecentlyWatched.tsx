"use client";

import { useEffect, useState } from "react";

// Recently watched films from Letterboxd, via the Cloudflare Worker's
// /letterboxd endpoint (which proxies + caches the public RSS feed). The
// section renders nothing until the worker has a LETTERBOXD_USER configured
// and returns at least one film — so it is safe to ship dormant.

type Film = {
  title: string;
  year: string;
  rating: string;
  watchedDate: string;
  link: string;
  poster: string;
  review: string;
};

const PROXY = process.env.NEXT_PUBLIC_SPOTIFY_PROXY_URL;

export function RecentlyWatched() {
  const [films, setFilms] = useState<Film[]>([]);

  useEffect(() => {
    if (!PROXY) return;
    fetch(`${PROXY.replace(/\/$/, "")}/letterboxd`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => setFilms((data?.films ?? []).slice(0, 4)))
      .catch(() => {
        // Worker unreachable — section stays hidden.
      });
  }, []);

  if (films.length === 0) return null;

  return (
    <section className="mt-16 md:mt-20">
      <h2 className="text-2xl md:text-3xl font-display font-semibold mb-6">
        Recently watched
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {films.map((film) => (
          <a
            key={film.link}
            href={film.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group"
          >
            {film.poster ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={film.poster}
                alt={film.title}
                loading="lazy"
                className="aspect-[2/3] w-full rounded-lg object-cover border border-border/40 transition-transform group-hover:scale-[1.02]"
              />
            ) : (
              <div className="aspect-[2/3] w-full rounded-lg bg-muted" />
            )}
            <p className="mt-2 text-sm font-medium leading-tight group-hover:text-accent-brand transition-colors">
              {film.title}
              {film.year && (
                <span className="text-muted-foreground"> ({film.year})</span>
              )}
            </p>
            {film.rating && (
              <p className="text-xs text-accent-brand">
                {"★".repeat(Math.floor(Number(film.rating)))}
                {Number(film.rating) % 1 !== 0 && "½"}
              </p>
            )}
            {film.review && (
              <p className="mt-1.5 border-l-2 border-accent-brand/60 pl-2 text-xs italic leading-snug text-muted-foreground line-clamp-3">
                &ldquo;{film.review}&rdquo;
              </p>
            )}
          </a>
        ))}
      </div>
      <p className="mt-3 text-xs text-muted-foreground">via Letterboxd</p>
    </section>
  );
}
