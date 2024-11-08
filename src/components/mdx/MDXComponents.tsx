import { Embed } from '@/components/blog/Embed'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { remarkUrlToEmbed } from '@/lib/remarkUrlToEmbed'
import { remarkTables } from '@/lib/remarkTables'
import { remarkLists } from '@/lib/remarkLists'
import dynamic from 'next/dynamic'

// Separate components into two groups
const embedComponents = {
  Embed: Embed,
}

const markdownComponents = {
  table: ({ children }: { children: React.ReactNode }) => (
    <div className="my-6 w-full overflow-y-auto">
      <table className="w-full border-collapse border">{children}</table>
    </div>
  ),
  th: ({ children }: { children: React.ReactNode }) => (
    <th className="border px-4 py-2 text-left font-bold">{children}</th>
  ),
  td: ({ children }: { children: React.ReactNode }) => (
    <td className="border px-4 py-2">{children}</td>
  ),
  li: ({ children, checked }: { children: React.ReactNode, checked?: boolean }) => {
    if (checked !== undefined) {
      return (
        <li className="flex items-start gap-2 my-1 list-none">
          <input 
            type="checkbox" 
            checked={checked} 
            readOnly 
            className="mt-1.5"
          />
          <span>{children}</span>
        </li>
      );
    }
    return <li className="my-1">{children}</li>;
  },
  ul: ({ children }: { children: React.ReactNode }) => (
    <ul className="list-disc list-inside my-4 space-y-1">
      {children}
    </ul>
  ),
  img: dynamic(() => Promise.resolve(({ src, alt }: { src: string; alt: string }) => (
    <div className="not-prose my-8">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img 
        src={src} 
        alt={alt} 
        className="rounded-lg mx-auto" 
      />
      {alt && (
        <span className="block text-center text-sm text-muted-foreground mt-2 italic">
          {alt}
        </span>
      )}
    </div>
  )), { ssr: false }),
}

// Combine components
const components = {
  ...embedComponents,
  ...markdownComponents,
}

export function MDXContent({ source }: { source: string }) {
  return (
    <MDXRemote 
      source={source}
      components={components}
      options={{
        parseFrontmatter: true,
        mdxOptions: {
          remarkPlugins: [remarkTables, remarkLists, remarkUrlToEmbed],
          rehypePlugins: [],
        }
      }}
    />
  )
} 