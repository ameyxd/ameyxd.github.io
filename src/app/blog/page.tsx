import BlurFade from "@/components/magicui/blur-fade";
import { getBlogPosts } from "@/data/blog";
import Link from "next/link";

export const metadata = {
  title: "Blog",
  description: "My thoughts on software development, life, and more.",
};

const BLUR_FADE_DELAY = 0.04;

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="max-w-[700px] mx-auto">
      <section className="flex flex-col gap-8">
        {posts
          .sort((a, b) => {
            if (
              new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
            ) {
              return -1;
            }
            return 1;
          })
          .map((post, id) => (
            <BlurFade delay={BLUR_FADE_DELAY * 2 + id * 0.05} key={post.slug}>
              <Link
                className="flex flex-col space-y-2 group"
                href={`/blog/${post.slug}`}
              >
                <article>
                  <h2 className="text-4xl font-semibold tracking-tight mb-2 group-hover:text-primary/70 transition-colors">
                    {post.metadata.title}
                  </h2>
                  <div className="flex items-center gap-2 text-muted-foreground mb-4">
                    <time>{post.metadata.publishedAt}</time>
                    <span>—</span>
                    <span>{post.metadata.readingTime} min read</span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {post.metadata.description}
                  </p>
                </article>
              </Link>
            </BlurFade>
          ))}
      </section>
    </div>
  );
}
