import { visit } from 'unist-util-visit'
import { fromMarkdown } from 'mdast-util-from-markdown'
import { gfm } from 'micromark-extension-gfm'
import { gfmFromMarkdown } from 'mdast-util-gfm'

export function remarkLists() {
  return (tree: any) => {
    visit(tree, 'list', (node) => {
      visit(node, 'listItem', (item) => {
        // Check for task list syntax: [x] or [ ]
        const firstChild = item.children[0];
        if (firstChild?.type === 'paragraph' && 
            firstChild.children[0]?.value?.startsWith('[')) {
          const isChecked = firstChild.children[0].value.startsWith('[x]');
          
          // Convert to task list item
          item.checked = isChecked;
          item.type = 'listItem';
          item.data = {
            hProperties: {
              className: 'flex items-start gap-2',
            }
          };
          
          // Remove the [x] or [ ] from the text
          firstChild.children[0].value = firstChild.children[0].value
            .replace(/^\[(x| )\]\s*/, '');
        }
      });
    });
  };
}
