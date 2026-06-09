import BlurFade from "@/components/magicui/blur-fade";
import { getBlogPosts } from "@/data/blog";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { DATA } from "@/data/resume";
import { library } from "@/data/library";
import { BookCard } from "@/components/library/BookCard";
import { now } from "@/data/now";
import { currently } from "@/data/currently";
import { fragments } from "@/data/fragments";
import { Highlight } from "@/components/Highlight";
import { SpotifyNowPlaying } from "@/components/SpotifyNowPlaying";
import { SERadioSection } from "@/components/SERadioSection";

const BLUR_FADE_DELAY = 0.04;

export default async function HomePage() {
  const posts = await getBlogPosts();
  const sortedPosts = [...posts].sort((a, b) =>
    (b.metadata.publishedAt ?? "").localeCompare(a.metadata.publishedAt ?? ""),
  );
  const featuredPost = sortedPosts[0];
  const secondaryPost = sortedPosts[1];

  const latestReads = [...library.read]
    .sort((a, b) => (b.finishedAt ?? "").localeCompare(a.finishedAt ?? ""))
    .slice(0, 3);

  const featuredProjects = DATA.projects.slice(0, 2);
  const featuredDoing = now.currentlyDoing.slice(0, 4);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="w-full bg-background">
        <div className="container-wide py-16 md:py-24">
          <div className="flex flex-col-reverse md:flex-row items-start gap-10 md:gap-14">
            <div className="flex-1 space-y-6 min-w-0">
              <BlurFade delay={BLUR_FADE_DELAY}>
                <h1 className="text-4xl md:text-7xl font-display font-semibold tracking-tight leading-[1.05]">
                  Hey, I&apos;m{" "}
                  <span className="underline decoration-accent-brand decoration-4 underline-offset-8 md:decoration-[6px] md:underline-offset-[12px]">
                    {siteConfig.firstname}
                  </span>{" "}
                  <span aria-hidden="true">👋🏽</span>
                </h1>
              </BlurFade>

              <BlurFade delay={BLUR_FADE_DELAY * 2}>
                <p className="text-2xl md:text-3xl font-display font-medium leading-snug max-w-2xl">
                  I build <Highlight delay={0.2}>AI</Highlight> systems for
                  clients across industries, and write about when they{" "}
                  <Highlight delay={0.5}>break</Highlight>.
                </p>
              </BlurFade>

              <BlurFade delay={BLUR_FADE_DELAY * 3}>
                <p className="text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed">
                  Amey builds AI for Dataiku clients across pharma, retail,
                  finance, insurance, and energy. He hosts SE Radio, lives in
                  Houston with a cat named{" "}
                  <Highlight delay={0.8}>Crow</Highlight>, lifts heavy, and
                  makes music when it&apos;s quiet.
                </p>
              </BlurFade>

              <BlurFade delay={BLUR_FADE_DELAY * 4}>
                <div className="space-y-1 pt-2 max-w-md">
                  {currently.stack.map((item, idx) => (
                    <p
                      key={idx}
                      className="text-sm text-muted-foreground flex items-baseline gap-3 tabular-nums"
                    >
                      <span
                        className="w-4 inline-flex justify-center text-base shrink-0"
                        aria-hidden="true"
                      >
                        {item.icon}
                      </span>
                      <span className="truncate">{item.label}</span>
                    </p>
                  ))}
                </div>
              </BlurFade>

              <BlurFade delay={BLUR_FADE_DELAY * 5}>
                <div className="flex flex-wrap items-center gap-x-8 gap-y-3 pt-2 text-base">
                  <Link
                    href="/blog"
                    className="hover:text-accent-brand transition-colors"
                  >
                    → Read the writing
                  </Link>
                  <Link
                    href="/projects"
                    className="hover:text-accent-brand transition-colors"
                  >
                    → See what I&apos;m building
                  </Link>
                </div>
              </BlurFade>
            </div>

            <div className="flex flex-col items-center gap-4 shrink-0">
              <BlurFade delay={BLUR_FADE_DELAY * 2}>
                <div className="relative w-44 h-44 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-muted shrink-0">
                  <Image
                    src="/me.png"
                    alt={siteConfig.name}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </BlurFade>
              <BlurFade delay={BLUR_FADE_DELAY * 3}>
                <SpotifyNowPlaying />
              </BlurFade>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container-wide pb-16 space-y-24">
        {/* SE Radio */}
        <BlurFade delay={BLUR_FADE_DELAY * 5.5}>
          <SERadioSection />
        </BlurFade>

        {/* Writing */}
        {featuredPost && (
          <BlurFade delay={BLUR_FADE_DELAY * 6}>
            <section>
              <div className="flex items-end justify-between mb-8">
                <h2 className="text-3xl font-display font-semibold">Writing</h2>
                <Link
                  href="/blog"
                  className="text-sm text-muted-foreground hover:text-accent-brand transition-colors"
                >
                  All posts →
                </Link>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
                {/* Big featured post */}
                <article className="lg:col-span-2 group">
                  <Link
                    href={`/blog/${featuredPost.slug}`}
                    className="block"
                  >
                    {featuredPost.metadata.coverImage && (
                      <div className="relative w-full aspect-[16/9] mb-5 rounded-xl overflow-hidden bg-muted">
                        <Image
                          src={featuredPost.metadata.coverImage}
                          alt={featuredPost.metadata.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                        />
                      </div>
                    )}
                    <h3 className="text-2xl md:text-4xl font-display font-semibold leading-tight mb-2 group-hover:text-accent-brand transition-colors">
                      {featuredPost.metadata.title}
                    </h3>
                    <p className="text-muted-foreground line-clamp-2 mb-3">
                      {featuredPost.metadata.description}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground tabular-nums">
                      <time>{featuredPost.metadata.publishedAt}</time>
                      <span aria-hidden="true">·</span>
                      <span>{featuredPost.metadata.readingTime} min read</span>
                    </div>
                  </Link>
                </article>

                {/* Small secondary post */}
                {secondaryPost && (
                  <article className="group">
                    <Link
                      href={`/blog/${secondaryPost.slug}`}
                      className="block"
                    >
                      {secondaryPost.metadata.coverImage && (
                        <div className="relative w-full aspect-[4/3] mb-4 rounded-xl overflow-hidden bg-muted">
                          <Image
                            src={secondaryPost.metadata.coverImage}
                            alt={secondaryPost.metadata.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                          />
                        </div>
                      )}
                      <h3 className="text-xl md:text-2xl font-display font-semibold leading-tight mb-2 group-hover:text-accent-brand transition-colors">
                        {secondaryPost.metadata.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-3 mb-3">
                        {secondaryPost.metadata.description}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground tabular-nums">
                        <time>{secondaryPost.metadata.publishedAt}</time>
                        <span aria-hidden="true">·</span>
                        <span>
                          {secondaryPost.metadata.readingTime} min read
                        </span>
                      </div>
                    </Link>
                  </article>
                )}
              </div>
            </section>
          </BlurFade>
        )}

        {/* Currently */}
        <BlurFade delay={BLUR_FADE_DELAY * 7}>
          <section>
            <div className="flex items-end justify-between mb-8">
              <h2 className="text-3xl font-display font-semibold">Currently</h2>
              <Link
                href="/now"
                className="text-sm text-muted-foreground hover:text-accent-brand transition-colors"
              >
                What I&apos;m up to →
              </Link>
            </div>
            <div>
              {featuredDoing.map((item, idx) => {
                const row = (
                  <article className="flex items-start gap-4 py-3">
                    <span
                      className="text-2xl leading-none shrink-0 w-6 flex items-center justify-center"
                      aria-hidden="true"
                    >
                      {item.emoji}
                    </span>
                    <h3 className="font-display text-lg md:text-xl font-semibold leading-tight">
                      {item.text}
                    </h3>
                  </article>
                );
                return item.href ? (
                  <a
                    key={idx}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block hover:text-accent-brand transition-colors"
                  >
                    {row}
                  </a>
                ) : (
                  <div key={idx}>{row}</div>
                );
              })}
            </div>
          </section>
        </BlurFade>

        {/* Projects */}
        {featuredProjects.length > 0 && (
          <BlurFade delay={BLUR_FADE_DELAY * 8}>
            <section>
              <div className="flex items-end justify-between mb-8">
                <h2 className="text-3xl font-display font-semibold">Projects</h2>
                <Link
                  href="/projects"
                  className="text-sm text-muted-foreground hover:text-accent-brand transition-colors"
                >
                  All projects →
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
                {featuredProjects.map((proj, idx) => {
                  const tags =
                    (proj as any).tags ?? (proj as any).technologies ?? [];
                  return (
                    <article key={idx} className="group">
                      <a
                        href={proj.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                      >
                        {proj.image && (
                          <div className="relative w-full aspect-video mb-4 rounded-xl overflow-hidden bg-muted">
                            <Image
                              src={proj.image}
                              alt={proj.title}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                            />
                          </div>
                        )}
                        <h3 className="text-xl md:text-2xl font-display font-semibold leading-tight mb-2 group-hover:text-accent-brand transition-colors">
                          {proj.title}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-3 mb-3">
                          {proj.description}
                        </p>
                        {tags.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {tags.slice(0, 4).map((tag: string) => (
                              <span
                                key={tag}
                                className="text-xs text-muted-foreground bg-muted/50 px-2 py-0.5 rounded"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </a>
                    </article>
                  );
                })}
              </div>
            </section>
          </BlurFade>
        )}

        {/* Latest Reads */}
        {latestReads.length > 0 && (
          <BlurFade delay={BLUR_FADE_DELAY * 9}>
            <section>
              <div className="flex items-end justify-between mb-8">
                <h2 className="text-3xl font-display font-semibold">
                  Latest reads
                </h2>
                <Link
                  href="/library"
                  className="text-sm text-muted-foreground hover:text-accent-brand transition-colors"
                >
                  Full library →
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-4">
                {latestReads.map((book, idx) => (
                  <BookCard
                    key={`${book.title}-${idx}`}
                    book={book}
                    variant="read"
                  />
                ))}
              </div>
            </section>
          </BlurFade>
        )}

        {/* Fragments */}
        <BlurFade delay={BLUR_FADE_DELAY * 10}>
          <section>
            <h2 className="text-3xl font-display font-semibold mb-3">
              <Highlight>Fragments</Highlight>
            </h2>
            <p className="text-sm text-muted-foreground mb-8 italic max-w-2xl">
              Things I&apos;m into right now. Updated when the answer changes.
            </p>
            <ul className="space-y-2 font-display text-lg md:text-xl">
              {fragments.map((frag, idx) => (
                <li key={idx} className="leading-relaxed">
                  {frag.href ? (
                    <a
                      href={frag.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-accent-brand transition-colors"
                    >
                      {frag.text}
                    </a>
                  ) : (
                    frag.text
                  )}
                </li>
              ))}
            </ul>
          </section>
        </BlurFade>
      </div>
    </div>
  );
}
