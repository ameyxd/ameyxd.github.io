// ---------------------------------------------------------------------------
// LIBRARY — manual book log.
//
// Edit this file when you start, finish, or stop reading a book. Push the
// commit; the /library page picks it up on next build. The homepage "Latest
// reads" preview shows the three most-recently-finished entries.
//
// Schema:
//   - title:        required, what's on the cover
//   - author:       required
//   - cover:        optional path under public/books/ (e.g. "/books/foo.jpg")
//   - startedAt:    ISO date, currently-reading only
//   - finishedAt:   ISO date, read-shelf only — entries in `read` MUST have this
//   - rating:       1..5, optional, only shown when set
//   - notes:        one-line takeaway, optional
//   - link:         goodreads / hardcover / storygraph url, optional
//
// Order in `read` doesn't strictly matter — the page groups by year and sorts
// within each year — but keeping reverse-chronological by hand is friendlier
// for diffs and reviewing the file.
// ---------------------------------------------------------------------------

export type Book = {
  title: string;
  author: string;
  cover?: string;
  startedAt?: string;
  finishedAt?: string;
  rating?: 0.5 | 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5;
  notes?: string;
  link?: string;
};

export const library: {
  currentlyReading: Book[];
  read: Book[];
} = {
  currentlyReading: [
    {
      title: "The Body Keeps the Score",
      author: "Bessel van der Kolk",
      startedAt: "2026-04-10",
      notes: "Trauma, embodiment, and the nervous system.",
    },
  ],

  read: [
    {
      title: "Giovanni's Room",
      author: "James Baldwin",
      finishedAt: "2026-04-01",
      rating: 4.5,
    },
    {
      title: "The Three-Body Problem",
      author: "Liu Cixin",
      finishedAt: "2026-03-01",
      rating: 2,
    },
    {
      title: "Flesh",
      author: "David Szalay",
      finishedAt: "2026-02-01",
      rating: 2,
    },
    {
      title: "The Courage to Be Disliked",
      author: "Ichiro Kishimi & Fumitake Koga",
      finishedAt: "2025-01-04",
      rating: 5,
      notes: "Adlerian psychology — teleology over etiology. Wrote about it on the blog.",
      link: "/blog/kishimi-adlerian-psychology",
    },
  ],
};
