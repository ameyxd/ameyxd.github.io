// ---------------------------------------------------------------------------
// NOW — the "currently doing" snapshot that powers /now and the homepage
// "Currently" widget.
//
// Maintenance: bump `updatedAt` whenever you change anything here. The page
// renders a relative phrase ("today", "2 weeks ago", "3 months ago") based on
// this date, computed at build time.
//
// `currentlyDoing` is intentionally a flat bullet list — pick whatever emojis
// and phrasing reflect the moment. The /now page shows these verbatim.
//
// To swap your now state, edit this file in place. Books and games surface
// automatically on /now from src/data/library.ts and src/data/gaming.ts; you
// only need to repeat them here if you want them in the "Doing" bullets.
// ---------------------------------------------------------------------------

export const now = {
  updatedAt: "2026-05-29",

  currentlyDoing: [
    { emoji: "🔧", text: "Building heyamey.com v2" },
    { emoji: "📖", text: "Reading Kitchen Confidential" },
    { emoji: "🎮", text: "Playing Elden Ring DLC" },
  ],
};
