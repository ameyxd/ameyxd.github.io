import { visit } from 'unist-util-visit'
import { parseUrl } from './utils/embedUrls.js'

export function remarkUrlToEmbed() {
  return (tree) => {
    visit(tree, 'paragraph', (node) => {
      // Check if paragraph contains a single text node
      if (node.children?.length !== 1 || node.children[0].type !== 'text') {
        return
      }

      const text = node.children[0].value.trim()
      const parsed = parseUrl(text)

      if (parsed) {
        // Transform the node into an MDX component
        node.type = 'mdxJsxFlowElement'
        node.name = 'Embed'
        node.attributes = [
          {
            type: 'mdxJsxAttribute',
            name: 'url',
            value: text
          }
        ]
        // Important: Remove children but keep the node
        node.children = []
      }
    })
  }
} 