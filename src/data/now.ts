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

export type DoingItem = {
  emoji: string;
  text: string;
  href?: string;
};

export const now: { updatedAt: string; currentlyDoing: DoingItem[] } = {
  updatedAt: "2026-05-29",

  currentlyDoing: [
    { emoji: "🔧", text: "Building heyamey.com v2" },
    {
      emoji: "🔨",
      text: "Building specwarden",
      href: "https://github.com/ameyxd/specwarden",
    },
    {
      emoji: "🤖",
      text: "Building agentic workflows at Dataiku",
      href: "https://linkedin.com/in/ameyxd",
    },
    {
      emoji: "🎙️",
      text: "Hosting SE Radio Podcast",
      href: "https://se-radio.net/team/",
    },
    { emoji: "🥌", text: "Playing curling" },
    { emoji: "🧘", text: "Practicing zen meditation" },
  ],
};
