import Link from "next/link";
import BlurFade from "@/components/magicui/blur-fade";
import { now } from "@/data/now";
import { library } from "@/data/library";
import { gaming } from "@/data/gaming";
import { BookCard } from "@/components/library/BookCard";
import { GameCard } from "@/components/library/GameCard";

export const metadata = {
  title: "Now",
  description: "What I'm doing, reading, and playing right now.",
};

const BLUR_FADE_DELAY = 0.04;

function timeSince(iso: string): string {
  const days = Math.floor(
    (Date.now() - new Date(iso).getTime()) / 86_400_000,
  );
  if (days <= 0) return "today";
  if (days === 1) return "yesterday";
  if (days < 7) return `${days} days ago`;
  if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
  if (days < 365) return `${Math.floor(days / 30)} months ago`;
  return `${Math.floor(days / 365)} years ago`;
}

export default function NowPage() {
  const recentBooks = [...library.read]
    .sort((a, b) => (b.finishedAt ?? "").localeCompare(a.finishedAt ?? ""))
    .slice(0, 3);

  const recentGames = [...gaming.completed]
    .sort((a, b) => (b.finishedAt ?? "").localeCompare(a.finishedAt ?? ""))
    .slice(0, 3);

  return (
    <div className="w-full max-w-[72rem] mx-auto px-6 sm:px-8 lg:px-12 py-8 md:py-16">
      <BlurFade delay={BLUR_FADE_DELAY}>
        <header className="mb-12 md:mb-16 max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-display font-semibold tracking-tight">
            Now
          </h1>
          <p className="mt-3 text-sm text-muted-foreground tabular-nums">
            Updated {timeSince(now.updatedAt)}
          </p>
        </header>
      </BlurFade>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
        {/* DOING */}
        <BlurFade delay={BLUR_FADE_DELAY * 2}>
          <section>
            <h2 className="text-2xl md:text-3xl font-display font-semibold mb-6">
              Doing
            </h2>
            <div className="space-y-1">
              {now.currentlyDoing.map((item, idx) => {
                const row = (
                  <article className="flex items-start gap-4 py-3">
                    <span
                      className="text-2xl leading-none shrink-0 w-6 flex items-center justify-center"
                      aria-hidden="true"
                    >
                      {item.emoji}
                    </span>
                    <h3 className="font-display text-lg md:text-xl font-semibold leading-tight">
                      {item.text}
                    </h3>
                  </article>
                );
                return item.href ? (
                  <a
                    key={idx}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block hover:text-accent-brand transition-colors"
                  >
                    {row}
                  </a>
                ) : (
                  <div key={idx}>{row}</div>
                );
              })}
            </div>
          </section>
        </BlurFade>

        {/* READING */}
        <BlurFade delay={BLUR_FADE_DELAY * 3}>
          <section>
            <div className="flex items-end justify-between mb-6">
              <h2 className="text-2xl md:text-3xl font-display font-semibold">
                Reading
              </h2>
              <Link
                href="/library"
                className="text-sm text-muted-foreground hover:text-accent-brand transition-colors"
              >
                Full library →
              </Link>
            </div>
            {library.currentlyReading.length > 0 ? (
              <div className="space-y-3 mb-6">
                {library.currentlyReading.map((book, idx) => (
                  <BookCard
                    key={`${book.title}-${idx}`}
                    book={book}
                    variant="currentlyReading"
                  />
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground mb-6">Between books.</p>
            )}
            {recentBooks.length > 0 && (
              <>
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
                  Recently finished
                </p>
                <div>
                  {recentBooks.map((book, idx) => (
                    <BookCard
                      key={`${book.title}-${idx}`}
                      book={book}
                      variant="read"
                    />
                  ))}
                </div>
              </>
            )}
          </section>
        </BlurFade>

        {/* PLAYING */}
        <BlurFade delay={BLUR_FADE_DELAY * 4}>
          <section>
            <h2 className="text-2xl md:text-3xl font-display font-semibold mb-6">
              Playing
            </h2>
            {gaming.currentlyPlaying.length > 0 ? (
              <div className="space-y-3 mb-6">
                {gaming.currentlyPlaying.map((game, idx) => (
                  <GameCard
                    key={`${game.title}-${idx}`}
                    game={game}
                    variant="currentlyPlaying"
                  />
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground mb-6">Between games.</p>
            )}
            {recentGames.length > 0 && (
              <>
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
                  Recently completed
                </p>
                <div>
                  {recentGames.map((game, idx) => (
                    <GameCard
                      key={`${game.title}-${idx}`}
                      game={game}
                      variant="completed"
                    />
                  ))}
                </div>
              </>
            )}
          </section>
        </BlurFade>
      </div>
    </div>
  );
}
