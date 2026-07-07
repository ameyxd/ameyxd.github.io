"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import previews from "@/data/post-previews.json";

type Previews = Record<
  string,
  { title: string; description: string; publishedAt: string; readingTime: number }
>;

const previewMap = previews as Previews;

// Anchor override for MDX content. Internal /blog/<slug> links get a hover
// preview card (Maggie Appleton style); everything else renders as a plain
// link. Hover only — touch devices just follow the link.
export function HoverPreviewLink({
  href,
  children,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const [open, setOpen] = useState(false);

  const slug = href?.match(/^\/blog\/([^/#?]+)/)?.[1];
  const preview = slug ? previewMap[slug] : undefined;

  if (!href) return <a {...props}>{children}</a>;

  if (!preview) {
    const external = /^https?:\/\//.test(href);
    return (
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <span
      className="relative inline-block"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Link href={href} {...props}>
        {children}
      </Link>
      <AnimatePresence>
        {open && (
          <motion.span
            initial={{ opacity: 0, y: 6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute bottom-full left-1/2 z-40 mb-2 block w-72 -translate-x-1/2 rounded-lg border bg-background p-4 text-left shadow-lg not-prose"
          >
            <span className="block h-1 w-8 rounded bg-accent-brand" />
            <span className="mt-2 block font-display text-sm font-semibold leading-snug text-foreground">
              {preview.title}
            </span>
            <span className="mt-1 block text-xs leading-relaxed text-muted-foreground line-clamp-3">
              {preview.description}
            </span>
            <span className="mt-2 block text-[10px] uppercase tracking-wide text-muted-foreground/70">
              {preview.publishedAt} — {preview.readingTime} min read
            </span>
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}
