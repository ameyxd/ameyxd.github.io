"use client";

import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { useRef } from "react";
import { flushSync } from "react-dom";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
}

// View Transitions API circular wipe: clicking the toggle expands a circle
// from the button's center across the viewport, revealing the new theme
// underneath. Falls back to an instant swap on browsers without the API and
// when the user prefers reduced motion.
export function ModeToggle({ className }: Props) {
  const { resolvedTheme, setTheme } = useTheme();
  const ref = useRef<HTMLButtonElement>(null);

  const toggle = async () => {
    const next = resolvedTheme === "dark" ? "light" : "dark";

    const supportsTransitions =
      typeof document !== "undefined" &&
      // @ts-expect-error - startViewTransition is not yet in lib.dom typings
      typeof document.startViewTransition === "function";
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!supportsTransitions || prefersReducedMotion || !ref.current) {
      setTheme(next);
      return;
    }

    const rect = ref.current.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const maxRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    // @ts-expect-error - startViewTransition is not yet in lib.dom typings
    const transition = document.startViewTransition(() => {
      flushSync(() => setTheme(next));
    });

    await transition.ready;

    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${maxRadius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration: 600,
        easing: "cubic-bezier(0.4, 0, 0.2, 1)",
        pseudoElement: "::view-transition-new(root)",
      },
    );
  };

  return (
    <Button
      ref={ref}
      variant="ghost"
      type="button"
      size="icon"
      aria-label="Toggle theme"
      className={cn("px-2", className)}
      onClick={toggle}
    >
      <SunIcon className="h-[1.2rem] w-[1.2rem] text-neutral-800 dark:hidden dark:text-neutral-200" />
      <MoonIcon className="hidden h-[1.2rem] w-[1.2rem] text-neutral-800 dark:block dark:text-neutral-200" />
    </Button>
  );
}
