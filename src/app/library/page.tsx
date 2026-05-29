import BlurFade from "@/components/magicui/blur-fade";
import { BookCard } from "@/components/library/BookCard";
import { library, type Book } from "@/data/library";

export const metadata = {
  title: "Library",
  description: "Books I'm reading, books I've read, and the one-line takeaway from each.",
};

const BLUR_FADE_DELAY = 0.04;

type YearGroup = { year: number; books: Book[] };

function groupByYear(books: Book[]): YearGroup[] {
  const map = new Map<number, Book[]>();
  for (const b of books) {
    if (!b.finishedAt) continue;
    const year = new Date(b.finishedAt).getFullYear();
    const bucket = map.get(year) ?? [];
    bucket.push(b);
    map.set(year, bucket);
  }
  return Array.from(map.entries())
    .sort(([a], [b]) => b - a)
    .map(([year, books]) => ({
      year,
      books: [...books].sort((a, b) =>
        (b.finishedAt ?? "").localeCompare(a.finishedAt ?? ""),
      ),
    }));
}

export default function LibraryPage() {
  const { currentlyReading, read } = library;
  const byYear = groupByYear(read);

  return (
    <div className="container-wide py-8 md:py-16">
      <BlurFade delay={BLUR_FADE_DELAY}>
        <header className="mb-12 md:mb-16 max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-display font-semibold tracking-tight">
            Library
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Books I&apos;m reading, books I&apos;ve read, and the one-line
            takeaway from each.
          </p>
        </header>
      </BlurFade>

      {currentlyReading.length > 0 && (
        <BlurFade delay={BLUR_FADE_DELAY * 2}>
          <section className="mb-16 md:mb-20">
            <h2 className="text-2xl md:text-3xl font-display font-semibold mb-6">
              Currently reading
            </h2>
            <div className="space-y-3">
              {currentlyReading.map((book, idx) => (
                <BookCard
                  key={`${book.title}-${idx}`}
                  book={book}
                  variant="currentlyReading"
                />
              ))}
            </div>
          </section>
        </BlurFade>
      )}

      <BlurFade delay={BLUR_FADE_DELAY * 3}>
        <section>
          <h2 className="text-2xl md:text-3xl font-display font-semibold mb-6">
            Finished
          </h2>
          {byYear.length === 0 ? (
            <p className="text-muted-foreground">Nothing logged yet.</p>
          ) : (
            <div className="space-y-12">
              {byYear.map(({ year, books }) => (
                <div key={year}>
                  <h3 className="text-xl font-display font-semibold text-muted-foreground mb-4 tabular-nums">
                    {year}
                  </h3>
                  <div>
                    {books.map((book, idx) => (
                      <BookCard
                        key={`${book.title}-${idx}`}
                        book={book}
                        variant="read"
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </BlurFade>
    </div>
  );
}
