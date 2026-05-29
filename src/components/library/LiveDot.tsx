import { cn } from "@/lib/utils";

interface Props {
  className?: string;
}

// Accent-blue dot with two staggered ripple rings. Marks a "currently"
// item (book being read, game being played) so it visually contrasts
// with the static checkmark used on finished items.
export function LiveDot({ className }: Props) {
  return (
    <span
      className={cn(
        "relative inline-flex items-center justify-center size-6 shrink-0",
        className,
      )}
      aria-hidden="true"
    >
      <span className="absolute size-3 rounded-full bg-accent-brand/70 animate-ping" />
      <span
        className="absolute size-3 rounded-full bg-accent-brand/40 animate-ping"
        style={{ animationDelay: "0.6s" }}
      />
      <span className="relative size-2 rounded-full bg-accent-brand" />
    </span>
  );
}
