import { visit } from 'unist-util-visit'
import { fromMarkdown } from 'mdast-util-from-markdown'
import { gfm } from 'micromark-extension-gfm'
import { gfmFromMarkdown } from 'mdast-util-gfm'

export function remarkTables() {
  return (tree: any) => {
    visit(tree, 'paragraph', (node, index, parent) => {
      // Check if paragraph contains table-like content
      const content = node.children
        ?.map((n: any) => n.value)
        .join('')
        .trim();

      if (content && content.includes('|') && content.includes('\n')) {
        try {
          // Parse potential table content
          const parsed = fromMarkdown(content, {
            extensions: [gfm()],
            mdastExtensions: [gfmFromMarkdown()]
          });

          // If successfully parsed as table, replace the paragraph node
          if (parsed.children[0]?.type === 'table') {
            parent.children[index] = parsed.children[0];
          }
        } catch (e) {
          // If parsing fails, leave node unchanged
          console.warn('Table parsing failed:', e);
        }
      }
    });
  };
}
