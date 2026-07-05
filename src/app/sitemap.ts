import type { MetadataRoute } from "next";
import { getBlogPosts } from "@/data/blog";
import { siteConfig } from "@/config/site";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getBlogPosts();

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: new Date(post.metadata.publishedAt),
    changeFrequency: "yearly",
    priority: 0.7,
  }));

  const routes: MetadataRoute.Sitemap = [
    "",
    "/blog",
    "/projects",
    "/library",
    "/now",
    "/about",
    "/contact",
  ].map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));

  return [...routes, ...postEntries];
}
