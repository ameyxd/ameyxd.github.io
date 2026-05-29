"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  delay?: number;
}

// Circle draws in clockwise, then the check strokes through it. Animates on
// mount (mobile intersection-observer + negative margin proved unreliable, so
// we always play once after hydration). Color comes from currentColor — wrap
// in a `text-accent-brand` (or any text-*) container.
export function AnimatedCheckmark({ className, delay = 0 }: Props) {
  return (
    <motion.svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      className={cn("size-6 shrink-0", className)}
      aria-hidden="true"
    >
      <motion.circle
        cx="16"
        cy="16"
        r="14"
        strokeWidth="2"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut", delay }}
      />
      <motion.path
        d="M9.5 16.5 l4.5 4.5 l8.5 -9.5"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut", delay: delay + 0.45 }}
      />
    </motion.svg>
  );
}
