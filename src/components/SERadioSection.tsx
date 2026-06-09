import Link from "next/link";
import { seRadioEpisodes } from "@/data/se-radio";

// SERadioSection — homepage block surfacing recent episodes I've hosted on
// Software Engineering Radio as Apple Podcasts embeds. Server component:
// iframes are plain HTML so no client state is needed. Renders nothing when
// the episode list is empty so the section disappears cleanly during off
// periods rather than showing an empty header.
export function SERadioSection() {
  if (seRadioEpisodes.length === 0) return null;

  return (
    <section>
      <div className="flex items-end justify-between mb-8">
        <h2 className="text-3xl font-display font-semibold">On SE Radio</h2>
        <Link
          href="https://se-radio.net"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-muted-foreground hover:text-accent-brand transition-colors"
        >
          The show →
        </Link>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {seRadioEpisodes.map((ep) => (
          <iframe
            key={ep.embedSrc}
            src={ep.embedSrc}
            title={ep.title}
            allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
            frameBorder={0}
            height={175}
            // Apple's recommended sandbox set for these embeds — keeps the
            // iframe usable (forms, popups for opening in the Podcasts app)
            // while blocking same-origin parent access.
            sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
            className="w-full max-w-[660px] overflow-hidden rounded-[10px]"
          />
        ))}
      </div>
    </section>
  );
}
