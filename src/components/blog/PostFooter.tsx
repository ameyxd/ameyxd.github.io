import Link from "next/link";
import { getAdjacentPosts, getRelatedPosts } from "@/data/blog";

// Server components rendered below the post body: related reading first,
// then chronological previous/next navigation.

export async function RelatedPosts({ slug }: { slug: string }) {
  const related = await getRelatedPosts(slug, 2);
  if (related.length === 0) return null;

  return (
    <aside className="mt-16 border-t pt-8">
      <h2 className="font-display text-2xl font-semibold tracking-tight mb-6">
        Keep reading
      </h2>
      <div className="grid gap-6 sm:grid-cols-2">
        {related.map((post) => (
          <Link
            href={`/blog/${post.slug}`}
            key={post.slug}
            className="group rounded-lg border p-5 transition-colors hover:border-accent-brand/60"
          >
            <h3 className="font-display text-lg font-semibold tracking-tight group-hover:text-accent-brand transition-colors">
              {post.metadata.title}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
              {post.metadata.description}
            </p>
            <p className="mt-3 text-xs text-muted-foreground/70">
              {post.metadata.publishedAt} — {post.metadata.readingTime} min read
            </p>
          </Link>
        ))}
      </div>
    </aside>
  );
}

export async function PostNav({ slug }: { slug: string }) {
  const { newer, older } = await getAdjacentPosts(slug);
  if (!newer && !older) return null;

  return (
    <nav
      aria-label="Post navigation"
      className="mt-10 flex flex-col gap-4 border-t pt-8 sm:flex-row sm:justify-between"
    >
      {older ? (
        <Link
          href={`/blog/${older.slug}`}
          className="group flex-1 text-left"
        >
          <span className="text-xs uppercase tracking-wide text-muted-foreground/70">
            ← Older
          </span>
          <span className="mt-1 block font-display font-semibold tracking-tight group-hover:text-accent-brand transition-colors">
            {older.metadata.title}
          </span>
        </Link>
      ) : (
        <span className="flex-1" />
      )}
      {newer ? (
        <Link
          href={`/blog/${newer.slug}`}
          className="group flex-1 text-right"
        >
          <span className="text-xs uppercase tracking-wide text-muted-foreground/70">
            Newer →
          </span>
          <span className="mt-1 block font-display font-semibold tracking-tight group-hover:text-accent-brand transition-colors">
            {newer.metadata.title}
          </span>
        </Link>
      ) : (
        <span className="flex-1" />
      )}
    </nav>
  );
}
