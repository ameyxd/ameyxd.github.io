"use client";

import { useEffect, useRef, useState } from "react";
import PixelCat from "@/components/PixelCat";

// Tunables -------------------------------------------------------------------
// Where the cat sits when idle on first paint / after returning.
const START_LEFT_PX = 16;
// Distance from the very bottom of the viewport.
const BOTTOM_PX = 8;
// Rendered cat height — drives sprite scaling inside PixelCat.
const CAT_HEIGHT_PX = 96;
// Wrapper widths (in px). Idle gets cropped 5px from the right to hide a
// stray frame-edge pixel in the source sprite; walk needs its full natural
// width so the tail isn't clipped.
const IDLE_WIDTH_PX = 110;
const WALK_WIDTH_PX = 120;
// Walk speed in px per second along the bottom of the viewport.
const WALK_SPEED_PX_S = 70;

// CatMascot — the resident black cat that idles in the bottom-left corner
// (sit + blink) and starts strolling across the bottom of the viewport on
// click. A second click pauses it where it is (idle + blink in place). When a
// walk reaches the right edge, the cat teleports back to its starting corner
// and resumes idling there.
//
// Renders nothing on small screens (hidden md:block on the outer div) — the
// mobile dock + theme toggle are busy enough without a wandering cat.
export function CatMascot() {
  const [walking, setWalking] = useState(false);
  const [leftPx, setLeftPx] = useState(START_LEFT_PX);

  // The authoritative position. State setters in React 18 strict mode
  // double-invoke their updaters to expose impurity bugs, so we keep the
  // canonical "current x" in a ref and use setLeftPx purely as a render
  // trigger.
  const leftRef = useRef<number>(START_LEFT_PX);

  // Drive the left-position animation via rAF when walking. Stopping or
  // unmount cancels the frame loop cleanly. We use a closure-scoped
  // `cancelled` flag so that strict-mode re-mounts (mount → cleanup → mount)
  // don't accumulate parallel rAF chains — only the latest effect's tick
  // keeps running; older closures see their flag flip and bail.
  useEffect(() => {
    if (!walking) return;

    let cancelled = false;
    let lastTime = 0;

    const tick = (time: number) => {
      if (cancelled) return;
      if (lastTime === 0) lastTime = time;
      const deltaMs = time - lastTime;
      lastTime = time;

      const next = leftRef.current + (WALK_SPEED_PX_S * deltaMs) / 1000;
      const maxLeft = window.innerWidth - WALK_WIDTH_PX;

      if (next >= maxLeft) {
        // Walk completed — flip back to idle at the starting corner.
        leftRef.current = START_LEFT_PX;
        setLeftPx(START_LEFT_PX);
        setWalking(false);
        return;
      }

      leftRef.current = next;
      setLeftPx(next);
      requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
    return () => {
      cancelled = true;
    };
  }, [walking]);

  const wrapperWidth = walking ? WALK_WIDTH_PX : IDLE_WIDTH_PX;

  return (
    <div
      // z-40 puts the cat above the bottom dock (z-30) so it visibly slides
      // across the dock chrome rather than tunneling behind it.
      className="fixed z-40 hidden md:block overflow-hidden cursor-pointer select-none"
      style={{
        left: `${leftPx}px`,
        bottom: `${BOTTOM_PX}px`,
        width: wrapperWidth,
        height: CAT_HEIGHT_PX,
      }}
      onClick={() => setWalking((prev) => !prev)}
      role="button"
      aria-label={walking ? "Stop Crow" : "Send Crow walking"}
    >
      <PixelCat size={CAT_HEIGHT_PX} mode={walking ? "walk" : "idle"} />
    </div>
  );
}
