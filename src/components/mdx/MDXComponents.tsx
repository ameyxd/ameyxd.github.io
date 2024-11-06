import { Embed } from '@/components/blog/Embed'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { remarkUrlToEmbed } from '@/lib/remarkUrlToEmbed'

const components = {
  Embed: Embed,
}

// Add fix for tables, lists, code blocks, and blockquotes not being 

export function MDXContent({ source }: { source: string }) {
  return (
    <MDXRemote 
      source={source}
      components={components}
      options={{
        parseFrontmatter: true,
        mdxOptions: {
          remarkPlugins: [remarkUrlToEmbed], // Add the remark plugin here
          rehypePlugins: [],
        }
      }}
    />
  )
} 