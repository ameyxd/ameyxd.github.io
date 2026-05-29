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
//   - link:         optional reference URL (e.g. Metacritic). When set, the
//                   title on /now becomes a clickable link.
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
  link?: string;
};

export const gaming: {
  currentlyPlaying: Game[];
  completed: Game[];
} = {
  currentlyPlaying: [
    {
      title: "007 First Light",
      platform: "PS5",
      startedAt: "2026-05-01",
      link: "https://www.metacritic.com/game/007-first-light/",
    },
    {
      title: "The Witcher 3: Wild Hunt",
      platform: "PS5",
      startedAt: "2026-04-10",
      link: "https://www.metacritic.com/game/the-witcher-3-wild-hunt/",
    },
    {
      title: "Hades II",
      platform: "PC",
      startedAt: "2026-03-01",
      link: "https://www.metacritic.com/game/hades-ii/",
    },
  ],

  completed: [
    {
      title: "Ghost of Yotei",
      platform: "PS5",
      finishedAt: "2026-04-15",
      link: "https://www.metacritic.com/game/ghost-of-yotei/",
    },
    {
      title: "Black Myth: Wukong",
      platform: "PS5",
      finishedAt: "2025-09-01",
      link: "https://www.metacritic.com/game/black-myth-wukong/",
    },
    {
      title: "Avatar: Frontiers of Pandora",
      platform: "PS5",
      finishedAt: "2024-02-15",
      link: "https://www.metacritic.com/game/avatar-frontiers-of-pandora/",
    },
  ],
};
