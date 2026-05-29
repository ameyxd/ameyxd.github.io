import type { Game } from "@/data/gaming";
import { AnimatedCheckmark } from "./AnimatedCheckmark";
import { LiveDot } from "./LiveDot";
import { cn } from "@/lib/utils";

type Variant = "completed" | "currentlyPlaying";

interface Props {
  game: Game;
  variant: Variant;
  className?: string;
}

function Stars({ rating }: { rating: NonNullable<Game["rating"]> }) {
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

function formatMonth(iso?: string) {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

export function GameCard({ game, variant, className }: Props) {
  const isCompleted = variant === "completed";

  return (
    <article
      className={cn(
        "group flex items-start gap-4 py-4",
        isCompleted && "border-b border-border/40 last:border-0",
        className,
      )}
    >
      <div className="text-accent-brand pt-1">
        {isCompleted ? <AnimatedCheckmark /> : <LiveDot />}
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="font-display text-lg md:text-xl font-semibold leading-tight">
          {game.link ? (
            <a
              href={game.link}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent-brand transition-colors"
            >
              {game.title}
            </a>
          ) : (
            game.title
          )}
        </h3>
        <p className="text-sm text-muted-foreground mt-0.5">{game.platform}</p>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-xs text-muted-foreground tabular-nums">
          {isCompleted ? (
            <>
              {game.finishedAt && <span>Finished {formatMonth(game.finishedAt)}</span>}
              {game.rating && (
                <>
                  <span aria-hidden="true">·</span>
                  <Stars rating={game.rating} />
                </>
              )}
            </>
          ) : (
            game.startedAt && <span>Playing since {formatMonth(game.startedAt)}</span>
          )}
        </div>
        {game.notes && (
          <p className="text-sm text-muted-foreground mt-2 leading-snug">
            &ldquo;{game.notes}&rdquo;
          </p>
        )}
      </div>
    </article>
  );
}
