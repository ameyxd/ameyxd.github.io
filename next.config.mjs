/** @type {import('next').NextConfig} */
import createMDX from '@next/mdx'
import { remarkUrlToEmbed } from './src/lib/remarkUrlToEmbed.js'

console.log('🟢 Loading Next.js config')

const withMDX = createMDX({
  options: {
    remarkPlugins: [[remarkUrlToEmbed, { debug: true }]],
    rehypePlugins: [],
    providerImports: ['@mdx-js/react'],
    mdxRs: false,
  }
})

const nextConfig = {
  typescript: {
    ignoreBuildErrors: true
  },
  reactStrictMode: true,
  output: "export",
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  experimental: {
    mdxRs: false,
  }
}

console.log('🟢 MDX config created')

export default withMDX(nextConfig)
