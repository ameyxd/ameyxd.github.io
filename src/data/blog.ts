import fs from "fs";
import matter from "gray-matter";
import path from "path";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

export type BlogPost = {
  slug: string;
  metadata: {
    title: string;
    publishedAt: string;
    description: string;
    readingTime: number;
    tags: string[];
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

export async function markdownToHTML(markdown: string) {
  const p = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypePrettyCode, {
      // https://rehype-pretty.pages.dev/#usage
      theme: {
        light: "min-light",
        dark: "min-dark",
      },
      keepBackground: false,
    })
    .use(rehypeStringify)
    .process(markdown);

  return p.toString();
}

export async function getPost(slug: string) {
  const filePath = path.join("content/posts", `${slug}.mdx`);
  let source = fs.readFileSync(filePath, "utf-8");
  const { content: rawContent, data: metadata } = matter(source);
  const content = await markdownToHTML(rawContent);
  
  // Calculate reading time
  const wordsPerMinute = 200;
  const wordCount = rawContent.split(/\s+/g).length;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);
  
  return {
    source: content,
    metadata: {
      ...metadata,
      readingTime, // Add computed reading time to metadata
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
