import { Embed } from '@/components/blog/Embed'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { remarkUrlToEmbed } from '@/lib/remarkUrlToEmbed'
import { remarkTables } from '@/lib/remarkTables'
import { remarkLists } from '@/lib/remarkLists'
import rehypeSlug from 'rehype-slug'
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
  // h1: ({ children }: { children: React.ReactNode }) => (
  //   <h1 className="scroll-m-20 text-4xl font-bold tracking-tight mt-8 mb-4">{children}</h1>
  // ),
  // h2: ({ children }: { children: React.ReactNode }) => (
  //   <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight mt-10 mb-4">{children}</h2>
  // ),
  // h3: ({ children }: { children: React.ReactNode }) => (
  //   <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mt-8 mb-4">{children}</h3>
  // ),
  // h4: ({ children }: { children: React.ReactNode }) => (
  //   <h4 className="scroll-m-20 text-xl font-semibold tracking-tight mt-6 mb-4">{children}</h4>
  // ),
  // h5: ({ children }: { children: React.ReactNode }) => (
  //   <h5 className="scroll-m-20 text-lg font-semibold tracking-tight mt-6 mb-3">{children}</h5>
  // ),
  // h6: ({ children }: { children: React.ReactNode }) => (
  //   <h6 className="scroll-m-20 text-base font-semibold tracking-tight mt-6 mb-3">{children}</h6>
  // ),
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
          rehypePlugins: [[rehypeSlug, {}]],
        }
      }}
    />
  )
} 