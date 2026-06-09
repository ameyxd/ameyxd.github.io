// ---------------------------------------------------------------------------
// FRAGMENTS — a handcrafted list of "things I'm into right now" shown on the
// homepage in place of a hobbies grid. The point is texture, not exhaustive
// hobby coverage. Each fragment should sound like a sentence fragment — short,
// specific, slightly wry. Generic ("running", "hiking") loses the format.
// ---------------------------------------------------------------------------

export type Fragment = {
  text: string;
  // Optional href makes the fragment a link. Use sparingly — overlinking
  // dilutes the curated-list feel.
  href?: string;
};

export const fragments: Fragment[] = [
  { text: "Crow the cat" },
  { text: "Curling on the ice" },
  { text: "Open source design" },
  { text: "Obsidian forward" },
  { text: "Yapping at the gym" },
  { text: "A long-running reading list" },
  { text: "40-minute meditations" },
  { text: "Watching painting restoration videos" },
];
