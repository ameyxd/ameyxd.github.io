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
  const { content: rawContent, data: metadata } = matter(source);
  
  // Calculate reading time
  const wordsPerMinute = 200;
  const wordCount = rawContent.split(/\s+/g).length;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);
  
  return {
    source: rawContent,
    metadata: {
      ...metadata,
      readingTime,
    },
    slug,
  } as const;
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
  return getAllPosts(path.join(process.cwd(), "content/posts/"));
}
