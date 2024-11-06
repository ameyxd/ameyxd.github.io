import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
import { components } from '@/components/mdx/MDXComponents';
import { mdxOptions } from '@/lib/mdx-config';
import fs from 'fs';
import path from 'path';

// Move this to a Client Component
import { BlogContent } from '@/components/mdx/BlogContent';

export async function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), 'content/posts');
  const filenames = fs.readdirSync(postsDirectory);
  
  return filenames.map((filename) => ({
    slug: filename.replace(/\.mdx$/, ''),
  }));
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const filePath = path.join(process.cwd(), 'content/posts', `${slug}.mdx`);
  const fileContent = fs.readFileSync(filePath, 'utf8');
  
  const mdxSource = await serialize(fileContent, {
    parseFrontmatter: true,
    ...mdxOptions
  });

  return <BlogContent source={mdxSource} />;
}
