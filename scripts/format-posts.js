import { readdir, renameSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const postsDirectory = join(dirname(__dirname), 'content/posts');

readdir(postsDirectory, (err, files) => {
  files.forEach(file => {
    if (file.endsWith('.md')) {
      const oldPath = join(postsDirectory, file);
      // Convert filename to kebab-case and change extension to .mdx
      const newName = file
        .slice(0, -3) // remove .md
        .toLowerCase()
        .replace(/\s+/g, '-') // replace spaces with hyphens
        .replace(/[^a-z0-9-]/g, '') // remove special characters
        + '.mdx';
      
      const newPath = join(postsDirectory, newName);
      
      renameSync(oldPath, newPath);
      console.log(`Renamed: ${file} → ${newName}`);
    }
  });
});
