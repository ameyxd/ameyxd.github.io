"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
  className?: string;
  // Delay (seconds) before the highlight starts drawing in. Stagger multiple
  // highlights in the same paragraph for a sequenced reveal.
  delay?: number;
  // Duration of the draw-in animation.
  duration?: number;
  // Re-fire the draw every time the element scrolls back into view.
  // Default true — pin to false for a one-shot reveal on first sight.
  repeat?: boolean;
}

// Hand-drawn yellow highlighter behind a word or short phrase. The yellow strip
// is a linear-gradient bottom band; the animation grows its background-size
// from 0% to 100% width, reading as a marker being drawn across the text. The
// color is the accent-highlight token in globals.css so it can be reskinned.
export function Highlight({
  children,
  className,
  delay = 0,
  duration = 0.7,
  repeat = true,
}: Props) {
  return (
    <motion.span
      className={cn("highlight", className)}
      initial={{ backgroundSize: "0% 100%" }}
      whileInView={{ backgroundSize: "100% 100%" }}
      viewport={{ once: !repeat, margin: "-40px" }}
      transition={{
        duration,
        delay,
        ease: [0.65, 0, 0.35, 1],
      }}
    >
      {children}
    </motion.span>
  );
}
