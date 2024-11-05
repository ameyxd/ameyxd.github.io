/**
 * Copyright (c) 2024 Amey Ambade
 * Licensed under MIT License
 * Path: /components/BlogPost.tsx
 */

import { useTina } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";

interface BlogPostProps {
  data: any;
  query: string;
  variables: object;
}

export default function BlogPost({ data, query, variables }: BlogPostProps) {
  const { data: post } = useTina({
    query,
    variables,
    data,
  });

  return (
    <article className="prose lg:prose-xl mx-auto px-4">
      <header>
        <h1>{post.post.title}</h1>
        {post.post.date && (
          <time dateTime={post.post.date}>
            {new Date(post.post.date).toLocaleDateString()}
          </time>
        )}
        {post.post.tags && (
          <div className="flex gap-2 mt-4">
            {post.post.tags.map((tag: string) => (
              <span
                key={tag}
                className="bg-gray-100 px-2 py-1 rounded-md text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>
      
      {post.post.coverImage && (
        <img
          src={post.post.coverImage}
          alt={post.post.title}
          className="my-8 rounded-lg shadow-lg"
        />
      )}
      
      <div className="mt-8">
        <TinaMarkdown content={post.post.body} />
      </div>
    </article>
  );
}