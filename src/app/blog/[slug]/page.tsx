/**
 * Copyright (c) 2024 Amey Ambade
 * Licensed under MIT License
 * Path: /app/blog/[slug]/page.tsx
 */

import { client } from "@/tina/__generated__/client";
import BlogPost from "@/components/BlogPost";

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const result = await client.queries.post({
    relativePath: `${params.slug}.mdx`,
  });

  return <BlogPost {...result} />;
}

export async function generateStaticParams() {
  const postsResponse = await client.queries.postConnection();
  
  return postsResponse.data.postConnection.edges?.map((edge) => ({
    slug: edge?.node?._sys.filename,
  }));
}