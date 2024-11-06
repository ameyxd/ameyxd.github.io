'use client';

import { MDXRemote } from 'next-mdx-remote';
import { components } from './MDXComponents';

export function BlogContent({ source }: { source: any }) {
  return (
    <article className="prose prose-invert prose-pre:bg-background prose-pre:border prose-pre:border-border max-w-none
      prose-headings:text-foreground
      prose-p:text-muted-foreground
      prose-strong:text-foreground
      prose-em:text-foreground
      prose-li:text-muted-foreground
      prose-code:text-foreground
      prose-table:text-muted-foreground
      prose-td:border-border
      prose-th:border-border
      prose-th:text-foreground
      prose-blockquote:text-muted-foreground
      prose-blockquote:border-l-2
      prose-blockquote:border-border
      prose-a:text-blue-400
      prose-a:no-underline
      hover:prose-a:text-blue-300
      prose-a:transition-colors">
      <MDXRemote {...source} components={components} />
    </article>
  );
}
