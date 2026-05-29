// ---------------------------------------------------------------------------
// CURRENTLY — the always-visible "what I'm into right this minute" details
// rendered as a stack under the homepage hero and as a single line in the
// footer. Manual updates. Bump these when the answer changes.
//
// `stack` is the three-line hero detail (playing / reading / watching).
// `obsessingOver` is the single italic footer line.
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
    { icon: "♪", label: "João Gilberto · Chega de Saudade" },
    { icon: "📖", label: "Anthony Bourdain · Kitchen Confidential" },
    { icon: "👁", label: "Baumgartner Restoration on YouTube" },
  ],

  obsessingOver: "18th-century varnish removal at the millimeter scale",
};
