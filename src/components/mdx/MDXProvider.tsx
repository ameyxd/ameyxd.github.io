import { MDXProvider } from '@mdx-js/react'
import { Embed } from '@/components/blog/Embed'

const components = {
  Embed: Embed,
}

export function CustomMDXProvider({ children }: { children: React.ReactNode }) {
  return (
    <MDXProvider components={components}>
      {children}
    </MDXProvider>
  )
}
