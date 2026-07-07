"use client";

import { useEffect, useState } from "react";
import { Glasses } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "reading-mode";

// Floating toggle on post pages. Adds `reading-mode` to <html>: the site
// chrome dims, the measure widens, and the body copy switches to the serif.
// Preference persists across posts via localStorage. The class is removed on
// unmount so the rest of the site is never affected.
export function ReadingModeToggle() {
  const [on, setOn] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) === "on";
    setOn(saved);
    document.documentElement.classList.toggle("reading-mode", saved);
    return () => document.documentElement.classList.remove("reading-mode");
  }, []);

  const toggle = () => {
    const next = !on;
    setOn(next);
    document.documentElement.classList.toggle("reading-mode", next);
    localStorage.setItem(STORAGE_KEY, next ? "on" : "off");
  };

  return (
    <Button
      variant="outline"
      size="icon"
      type="button"
      onClick={toggle}
      aria-pressed={on}
      aria-label={on ? "Exit reading mode" : "Enter reading mode"}
      title={on ? "Exit reading mode" : "Reading mode"}
      className={cn(
        "fixed right-4 top-20 z-40 rounded-full bg-background/80 backdrop-blur-sm transition-colors",
        on && "border-accent-brand text-accent-brand",
      )}
    >
      <Glasses className="size-4" />
    </Button>
  );
}
