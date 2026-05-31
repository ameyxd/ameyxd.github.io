"use client";

import { useState } from "react";

/**
 * PixelCat — animated black-cat mascot.
 *
 * Setup:
 *   1. Drop cat-walk.png and cat-idle.png into  /public/sprites/
 *   2. import PixelCat from "@/components/PixelCat";
 *   3. <PixelCat />                      // idles, walks on hover
 *      <PixelCat mode="walk" />          // force walk
 *      <PixelCat mode="idle" size={96} /> // force idle, custom height
 *
 * The sheets are clean uniform-cell strips (one row each), so the
 * animation steps through frames with no drift or clipping.
 */

// One row per animation. Cell = the box each frame occupies.
const SHEETS = {
  walk: { src: "/sprites/cat-walk.png", frames: 6, cellW: 432, cellH: 348, fps: 9 },
  idle: { src: "/sprites/cat-idle.png", frames: 4, cellW: 432, cellH: 360, fps: 5 },
};

// One keyframe drives every instance; each instance sets its own --cat-end.
const KEYFRAMES = `
@keyframes cat-cycle { to { background-position-x: var(--cat-end); } }
@media (prefers-reduced-motion: reduce) {
  .pixel-cat { animation: none !important; background-position-x: 0 !important; }
}`;

export default function PixelCat({
  size = 120,        // rendered height in px; width scales to keep proportions
  mode,              // "walk" | "idle"; omit to let hover decide
  interactive = true, // when no mode is set: idle normally, walk on hover
  flip = false,      // mirror horizontally (face left instead of right)
  className = "",
  style = {},
}) {
  const [hovered, setHovered] = useState(false);

  const active = mode ?? (interactive && hovered ? "walk" : "idle");
  const sheet = SHEETS[active];

  const scale = size / sheet.cellH;
  const frameW = Math.round(sheet.cellW * scale);
  const stripW = frameW * sheet.frames;          // total animated travel
  const duration = sheet.frames / sheet.fps;     // seconds for a full loop

  return (
    <>
      <style>{KEYFRAMES}</style>
      <div
        className={`pixel-cat ${className}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          width: frameW,
          height: size,
          backgroundImage: `url(${sheet.src})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: `${stripW}px ${size}px`,
          backgroundPositionX: 0,
          // steps(frames) lands exactly on each frame; travel one full strip then loop
          animation: `cat-cycle ${duration}s steps(${sheet.frames}) infinite`,
          ["--cat-end"]: `-${stripW}px`,
          transform: flip ? "scaleX(-1)" : "none",
          // these are downscaled hi-res renders; smooth scaling looks best.
          // swap to "pixelated" if you want hard pixel edges.
          imageRendering: "auto",
          ...style,
        }}
        aria-label="Black cat mascot"
        role="img"
      />
    </>
  );
}
