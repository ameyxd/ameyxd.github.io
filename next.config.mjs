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

// Define base config
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true
  },
  reactStrictMode: true,
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

// Create a function that merges configs
const buildConfig = () => {
  const config = { ...nextConfig }
  // Let GitHub Actions inject output if needed
  if (process.env.GITHUB_ACTIONS) {
    config.output = 'export'
  }
  return withMDX(config)
}

console.log('🟢 MDX config created')

export default buildConfig()
