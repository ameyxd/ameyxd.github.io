import { getBlogPosts } from "@/data/blog";
import BlogPage from "../../page";

interface TagPageProps {
    params: { tag: string };
    searchParams?: { [key: string]: string | string[] | undefined };
}

// Add this function to generate static paths for all tags
export async function generateStaticParams() {
  const posts = await getBlogPosts();
  const tags = new Set(posts.flatMap(post => post.metadata.tags ?? []));
  
  return Array.from(tags).map((tag) => ({
    tag: tag,
  }));
}

export default async function TagPage({ params, searchParams }: TagPageProps) {
  const posts = await getBlogPosts();
  const filteredPosts = posts.filter(post => 
    post.metadata.tags?.includes(params.tag)
  );
  
  return <BlogPage params={params} searchParams={searchParams} />;
} 