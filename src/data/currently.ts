// ---------------------------------------------------------------------------
// CURRENTLY — the always-visible "what I'm into right this minute" details
// rendered as a stack under the homepage hero and as a single line in the
// footer. Manual updates. Bump these when the answer changes.
//
// The music slot lives elsewhere: <SpotifyNowPlaying /> renders as a card
// below the profile photo and only appears when something is actually
// playing on Spotify (no static fallback). `obsessingOver` is the single
// italic footer line.
// ---------------------------------------------------------------------------

export type CurrentlyStackItem = {
  icon: string; // emoji or short symbol — single char usually
  label: string; // tight string. don't include the icon here.
};

export const currently: {
  stack: CurrentlyStackItem[];
  obsessingOver: string;
} = {
  stack: [
    { icon: "📖", label: "Anthony Bourdain · Kitchen Confidential" },
  ],

  obsessingOver: "the long catalog of bossa nova standards",
};
