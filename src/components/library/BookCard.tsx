import Link from "next/link";
import type { Book } from "@/data/library";
import { AnimatedCheckmark } from "./AnimatedCheckmark";
import { LiveDot } from "./LiveDot";
import { cn } from "@/lib/utils";

type Variant = "read" | "currentlyReading";

interface Props {
  book: Book;
  variant: Variant;
  className?: string;
}

function Stars({ rating }: { rating: NonNullable<Book["rating"]> }) {
  const full = Math.floor(rating);
  const hasHalf = rating % 1 !== 0;
  return (
    <span
      className="text-accent-brand text-sm tracking-tight"
      aria-label={`${rating} out of 5 stars`}
    >
      {"★".repeat(full)}
      {hasHalf && "½"}
    </span>
  );
}

function formatFinished(iso?: string) {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

function formatStarted(iso?: string) {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

export function BookCard({ book, variant, className }: Props) {
  const isRead = variant === "read";

  const content = (
    <article
      className={cn(
        "group flex items-start gap-4 py-4",
        isRead && "border-b border-border/40 last:border-0",
        className,
      )}
    >
      <div className="text-accent-brand pt-1">
        {isRead ? <AnimatedCheckmark /> : <LiveDot />}
      </div>

      {book.cover && (
        // Covers come from the Open Library Covers API (hotlinked); plain img
        // keeps remote URLs simple under output: export.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={book.cover}
          alt=""
          aria-hidden
          loading="lazy"
          className="w-12 h-[4.5rem] shrink-0 rounded object-cover border border-border/40 bg-muted"
        />
      )}

      <div className="flex-1 min-w-0">
        <h3 className="font-display text-lg md:text-xl font-semibold leading-tight">
          {book.title}
        </h3>
        <p className="text-sm text-muted-foreground mt-0.5">{book.author}</p>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-xs text-muted-foreground tabular-nums">
          {isRead ? (
            <>
              {book.finishedAt && <span>Finished {formatFinished(book.finishedAt)}</span>}
              {book.rating && (
                <>
                  <span aria-hidden="true">·</span>
                  <Stars rating={book.rating} />
                </>
              )}
            </>
          ) : (
            book.startedAt && <span>Reading since {formatStarted(book.startedAt)}</span>
          )}
        </div>
        {book.notes && (
          <p className="text-sm text-muted-foreground mt-2 leading-snug">
            &ldquo;{book.notes}&rdquo;
          </p>
        )}
      </div>
    </article>
  );

  if (book.link) {
    return (
      <Link
        href={book.link}
        className="block transition-colors hover:bg-card/40 rounded-lg px-2 -mx-2"
      >
        {content}
      </Link>
    );
  }
  return content;
}
