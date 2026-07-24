// ---------------------------------------------------------------------------
// SE RADIO — episodes I've hosted on Software Engineering Radio. Rendered as
// Apple Podcasts embeds in the "On SE Radio" homepage section. Order:
// most recent first.
//
// To add an episode: grab the embed code from podcasts.apple.com (Share →
// Embed) and paste the iframe `src` into a new entry below. `title` is for
// the iframe a11y label, not displayed visually.
// ---------------------------------------------------------------------------

export type SERadioEpisode = {
  title: string;
  embedSrc: string;
};

export const seRadioEpisodes: SERadioEpisode[] = [
  {
    title: "Eric Tschetter on Decoupling Observability",
    embedSrc:
      "https://embed.podcasts.apple.com/us/podcast/eric-tschetter-on-decoupling-observability/id120906714?i=1000763163739",
  },
  {
    title: "Sahaj Garg on Designing for Ambiguity in Human Input",
    embedSrc:
      "https://embed.podcasts.apple.com/us/podcast/sahaj-garg-on-designing-for-ambiguity-in-human-input/id120906714?i=1000760353614",
  },
];
