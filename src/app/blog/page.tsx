import BlurFade from "@/components/magicui/blur-fade";
import { getBlogPosts } from "@/data/blog";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Blog",
  description: "My thoughts on software development, life, and more.",
};

const BLUR_FADE_DELAY = 0.04;

const getTagColor = (tag: string) => {
  // Simple hash function to get consistent colors for tags
  const hash = tag.split('').reduce((acc, char) => char.charCodeAt(0) + acc, 0);
  const hue = hash % 360;
  return `hsl(${hue}, 70%, 90%)`; // Pastel colors
};

interface PageProps {
  params?: { tag?: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default async function BlogPage({ 
  params,
  searchParams,
  posts: propPosts, 
  tag 
}: PageProps & {
  posts?: Awaited<ReturnType<typeof getBlogPosts>>;
  tag?: string;
}) {
  const posts = propPosts ?? await getBlogPosts();

  return (
    <div className="max-w-[700px] mx-auto">
      {/* Title of blog */}
      <BlurFade delay={BLUR_FADE_DELAY}>
        <header className="text-center mb-16">
          {tag ? (
            <div className="space-y-4">
              <h1 className="text-4xl font-semibold tracking-tight">
                Amey's Blog
              </h1>
              <div className="flex items-center justify-center gap-2 text-xl">
                <span className="text-muted-foreground">Posts tagged</span>
                <Badge
                  variant="secondary"
                  className="text-lg bg-opacity-20 px-3 py-1"
                  style={{
                    backgroundColor: getTagColor(tag),
                  }}
                >
                  #{tag}
                </Badge>
              </div>
            </div>
          ) : (
            <h1 className="text-6xl font-semibold tracking-tight">
              Amey's Blog
            </h1>
          )}
        </header>
      </BlurFade>
      
      <section className="flex flex-col gap-8">
        {posts.map((post, id) => (
          <BlurFade delay={BLUR_FADE_DELAY * 2 + id * 0.05} key={post.slug}>
            <article className="flex flex-col">
              <div className="group">
                <Link href={`/blog/${post.slug}`}>
                  <h2 className="text-4xl font-semibold tracking-tight mb-2 group-hover:text-primary/70 transition-colors">
                    {post.metadata.title}
                  </h2>
                </Link>
                
                <p className="text-muted-foreground leading-relaxed mb-2">
                  {post.metadata.description}
                </p>
                
                <div className="flex items-center gap-2 text-muted-foreground mb-4">
                  <time>{post.metadata.publishedAt}</time>
                  <span>—</span>
                  <span>{post.metadata.readingTime} min read</span>
                </div>

                {post.metadata.coverImage && (
                  <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
                    <Image
                      src={post.metadata.coverImage}
                      alt={post.metadata.title}
                      fill
                      className="object-cover"
                      priority={id === 0}
                    />
                  </div>
                )}
                
                {post.metadata.tags && (
                  <div className="flex flex-wrap gap-2">
                    {post.metadata.tags.map((tag) => (
                      <Link href={`/blog/tag/${tag}`} key={tag}>
                        <Badge
                          variant="secondary"
                          className="bg-opacity-20 hover:bg-opacity-30 transition-colors cursor-pointer dark:text-black"
                          style={{
                            backgroundColor: getTagColor(tag)
                          }}
                        >
                          {tag}
                        </Badge>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </article>
          </BlurFade>
        ))}
      </section>
    </div>
  );
}
