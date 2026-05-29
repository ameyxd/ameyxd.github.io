// ---------------------------------------------------------------------------
// GAMING — manual game log.
//
// Edit this file when you start a new game, finish one, or shelf one. The
// /now page surfaces currentlyPlaying[0] and the most-recently-completed
// entries.
//
// Schema:
//   - title:        required, what the game is called
//   - platform:     PS5 / PC / Switch / Other — also used as a visual chip
//   - cover:        optional, path under public/games/
//   - startedAt:    ISO date, currently-playing only
//   - finishedAt:   ISO date, completed shelf only
//   - rating:       0.5 to 5 in halves, optional
//   - notes:        one-line takeaway, optional
//
// Mirror of library.ts on purpose — keeping the shape parallel makes the
// /now page easier to render and the skill easier to script.
// ---------------------------------------------------------------------------

export type Game = {
  title: string;
  platform: "PS5" | "PC" | "Switch" | "Other";
  cover?: string;
  startedAt?: string;
  finishedAt?: string;
  rating?: 0.5 | 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5;
  notes?: string;
};

export const gaming: {
  currentlyPlaying: Game[];
  completed: Game[];
} = {
  currentlyPlaying: [
    {
      title: "Elden Ring: Shadow of the Erdtree",
      platform: "PS5",
      startedAt: "2024-06-21",
      notes: "Working through the DLC. Final boss is humbling.",
    },
  ],

  completed: [
    // Add finished games here, most recent first.
  ],
};
