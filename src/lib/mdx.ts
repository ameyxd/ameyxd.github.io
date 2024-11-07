import { remarkUrlToEmbed } from './remarkUrlToEmbed'

// Add this to your existing MDX configuration
const mdxOptions = {
  remarkPlugins: [
    // ... your existing plugins
    remarkUrlToEmbed
  ],
} 