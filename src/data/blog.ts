import fs from "fs";
import matter from "gray-matter";
import path from "path";

export type BlogPost = {
  slug: string;
  metadata: {
    title: string;
    publishedAt: string;
    description: string;
    readingTime: number;
    tags: string[];
    coverImage?: string;
  };
  content: string;
};

type BlogPostMetadata = {
  title: string;
  publishedAt: string;
  description: string;
  readingTime: number;
  image?: string;
  coverImage?: string;
  tags?: string[];
}

function getMDXFiles(dir: string) {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

export async function getPost(slug: string) {
  const filePath = path.join("content/posts", `${slug}.mdx`);
  let source = fs.readFileSync(filePath, "utf-8");
  const { content: rawContent, data } = matter(source);

  // Calculate reading time
  const wordsPerMinute = 200;
  const wordCount = rawContent.split(/\s+/g).length;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);

  const metadata = data as BlogPostMetadata;

  return {
    source: rawContent,
    metadata: {
      ...metadata,
      readingTime,
    },
    slug,
  };
}

async function getAllPosts(dir: string) {
  let mdxFiles = getMDXFiles(dir);
  return Promise.all(
    mdxFiles.map(async (file) => {
      let slug = path.basename(file, path.extname(file));
      let { metadata, source } = await getPost(slug);
      return {
        metadata,
        slug,
        source,
      };
    })
  );
}

export async function getBlogPosts() {
  // return getAllPosts(path.join(process.cwd(), "content/posts/"));
  const posts = await getAllPosts(path.join(process.cwd(), "content/posts/"));
  return posts.sort((a, b) =>
    new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime()
  );
}

// Chronological neighbors of a post. Posts are sorted newest-first, so
// "newer" is the previous array entry and "older" the next one.
export async function getAdjacentPosts(slug: string) {
  const posts = await getBlogPosts();
  const index = posts.findIndex((post) => post.slug === slug);
  if (index === -1) return { newer: null, older: null };
  return {
    newer: index > 0 ? posts[index - 1] : null,
    older: index < posts.length - 1 ? posts[index + 1] : null,
  };
}

// Related posts ranked by shared-tag count, recency as tie-breaker. Falls
// back to the most recent other posts when nothing shares a tag.
export async function getRelatedPosts(slug: string, count = 2) {
  const posts = await getBlogPosts();
  const current = posts.find((post) => post.slug === slug);
  if (!current) return [];

  const currentTags = new Set(current.metadata.tags ?? []);
  const others = posts.filter((post) => post.slug !== slug);

  const scored = others
    .map((post) => ({
      post,
      shared: (post.metadata.tags ?? []).filter((tag) => currentTags.has(tag))
        .length,
    }))
    .sort(
      (a, b) =>
        b.shared - a.shared ||
        new Date(b.post.metadata.publishedAt).getTime() -
          new Date(a.post.metadata.publishedAt).getTime(),
    );

  return scored.slice(0, count).map(({ post }) => post);
}

// All tags across posts with usage counts, most-used first.
export async function getAllTags() {
  const posts = await getBlogPosts();
  const counts = new Map<string, number>();
  for (const post of posts) {
    for (const tag of post.metadata.tags ?? []) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  return Array.from(counts.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}
