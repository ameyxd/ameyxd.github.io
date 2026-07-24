"use client";

import { useEffect, useState } from "react";
import { Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Background texture switcher. Cycles through overlay textures applied as a
// data attribute on <html> (see globals.css for the actual overlays). Sits
// next to the theme toggle in the navbar, persists via localStorage.
const TEXTURES = [
  "none",
  "grain",
  "paper",
  "dots",
  "grid",
  "scanlines",
  "riso",
] as const;

type Texture = (typeof TEXTURES)[number];
const STORAGE_KEY = "bg-texture";

export function TextureToggle({ className }: { className?: string }) {
  const [texture, setTexture] = useState<Texture>("none");

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as Texture | null;
    if (saved && TEXTURES.includes(saved)) {
      setTexture(saved);
      document.documentElement.dataset.texture = saved;
    }
  }, []);

  const cycle = () => {
    const next =
      TEXTURES[(TEXTURES.indexOf(texture) + 1) % TEXTURES.length];
    setTexture(next);
    document.documentElement.dataset.texture = next;
    localStorage.setItem(STORAGE_KEY, next);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      type="button"
      onClick={cycle}
      aria-label={`Background texture: ${texture}. Click to change.`}
      title={`Texture: ${texture}`}
      className={cn("px-2", texture !== "none" && "text-accent-brand", className)}
    >
      <Layers className="h-[1.2rem] w-[1.2rem]" />
    </Button>
  );
}
