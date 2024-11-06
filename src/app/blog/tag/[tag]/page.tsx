import { getBlogPosts } from "@/data/blog";
import BlogPage from "../../page";

// Add this function to generate static paths for all tags
export async function generateStaticParams() {
  const posts = await getBlogPosts();
  const tags = new Set(posts.flatMap(post => post.metadata.tags ?? []));
  
  return Array.from(tags).map((tag) => ({
    tag: tag,
  }));
}

export default async function TagPage({ params }: { params: { tag: string } }) {
  const posts = await getBlogPosts();
  const filteredPosts = posts.filter(post => 
    post.metadata.tags?.includes(params.tag)
  );
  
  return <BlogPage posts={filteredPosts} tag={params.tag} />;
} 