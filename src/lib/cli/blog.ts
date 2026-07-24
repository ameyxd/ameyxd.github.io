import { Command } from 'commander';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs/promises';
import chokidar from 'chokidar';
import matter from 'gray-matter';

// Initialize commander
const program = new Command();

async function processImages() {
  try {
    const contentImagesDir = path.join(process.cwd(), 'content/images');
    const publicImagesDir = path.join(process.cwd(), 'public/images');

    // Check if content/images exists
    try {
      await fs.access(contentImagesDir);
    } catch (error) {
      console.log('Creating content/images directory...');
      await fs.mkdir(contentImagesDir, { recursive: true });
    }

    // Ensure public/images exists
    await fs.mkdir(publicImagesDir, { recursive: true });

    // Read all images from content/images
    const files = await fs.readdir(contentImagesDir);
    const imageFiles = files.filter(file => 
      /\.(jpg|jpeg|png|gif|webp)$/i.test(file)
    );

    if (imageFiles.length === 0) {
      console.log('No images found in content/images directory');
      return;
    }

    for (const file of imageFiles) {
      const sourcePath = path.join(contentImagesDir, file);
      const destPath = path.join(publicImagesDir, file);

      try {
        const sourceStats = await fs.stat(sourcePath);
        const destStats = await fs.stat(destPath).catch(() => null);
        
        if (!destStats || sourceStats.mtime > destStats.mtime) {
          await sharp(sourcePath)
            .resize(1200, null, {
              withoutEnlargement: true
            })
            .jpeg({ quality: 80 })
            .toFile(destPath);
          
          console.log(`Processed: ${file}`);
        } else {
          console.log(`Skipped: ${file} (already up to date)`);
        }
      } catch (error) {
        console.error(`Error processing ${file}:`, error);
      }
    }
  } catch (error) {
    console.error('Error in processImages:', error);
    process.exit(1);
  }
}

// Wrap a title into SVG-safe lines for the OG card. Roughly 22 chars per
// line at 72px Georgia within the 1020px text box; 3 lines max, ellipsized.
function wrapTitle(title: string, maxChars = 24, maxLines = 3): string[] {
  const words = title.split(/\s+/);
  const lines: string[] = [];
  let current = '';
  for (const word of words) {
    if ((current + ' ' + word).trim().length <= maxChars) {
      current = (current + ' ' + word).trim();
    } else {
      if (current) lines.push(current);
      current = word;
    }
  }
  if (current) lines.push(current);
  if (lines.length > maxLines) {
    const kept = lines.slice(0, maxLines);
    kept[maxLines - 1] = kept[maxLines - 1].replace(/.{0,3}$/, '') + '…';
    return kept;
  }
  return lines;
}

function escapeXml(text: string): string {
  return text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

// Generate a branded 1200x630 social card for every post into
// public/images/og/<slug>.jpg. Matches the site-wide /og.jpg treatment:
// dark canvas, accent top bar, serif title, accent domain line. Idempotent —
// a card is only re-rendered when the post file is newer.
async function generateOgImages() {
  const postsDir = path.join(process.cwd(), 'content/posts');
  const outDir = path.join(process.cwd(), 'public/images/og');
  await fs.mkdir(outDir, { recursive: true });

  const files = (await fs.readdir(postsDir)).filter((f) => f.endsWith('.mdx'));
  for (const file of files) {
    const slug = path.basename(file, '.mdx');
    const sourcePath = path.join(postsDir, file);
    const destPath = path.join(outDir, `${slug}.jpg`);

    const sourceStats = await fs.stat(sourcePath);
    const destStats = await fs.stat(destPath).catch(() => null);
    if (destStats && destStats.mtime > sourceStats.mtime) {
      console.log(`Skipped: ${slug} (card up to date)`);
      continue;
    }

    const { data } = matter(await fs.readFile(sourcePath, 'utf-8'));
    const title = String(data.title ?? slug);
    const lines = wrapTitle(title);
    const lineHeight = 88;
    const startY = 300 - ((lines.length - 1) * lineHeight) / 2;
    const titleSpans = lines
      .map(
        (line, i) =>
          `<text x="90" y="${startY + i * lineHeight}" font-family="Georgia, 'Times New Roman', serif" font-size="72" font-weight="600" fill="#fafafa">${escapeXml(line)}</text>`,
      )
      .join('\n  ');

    const svg = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#0a0a0a"/>
  <rect x="0" y="0" width="1200" height="6" fill="#3B82F6"/>
  ${titleSpans}
  <text x="90" y="500" font-family="Georgia, 'Times New Roman', serif" font-size="30" font-style="italic" fill="#a1a1aa">Amey Ambade</text>
  <text x="90" y="560" font-family="Helvetica, Arial, sans-serif" font-size="28" fill="#3B82F6">heyamey.com</text>
</svg>`;

    await sharp(Buffer.from(svg)).jpeg({ quality: 92 }).toFile(destPath);
    console.log(`Generated: ${slug}.jpg`);
  }
}

// Write src/data/post-previews.json — the metadata map that powers hover
// previews on internal /blog/ links inside post bodies. Committed alongside
// the OG cards so the client component can import it statically.
async function generatePostPreviews() {
  const postsDir = path.join(process.cwd(), 'content/posts');
  const outPath = path.join(process.cwd(), 'src/data/post-previews.json');

  const files = (await fs.readdir(postsDir)).filter((f) => f.endsWith('.mdx'));
  const previews: Record<
    string,
    { title: string; description: string; publishedAt: string; readingTime: number }
  > = {};

  for (const file of files) {
    const slug = path.basename(file, '.mdx');
    const raw = await fs.readFile(path.join(postsDir, file), 'utf-8');
    const { data, content } = matter(raw);
    previews[slug] = {
      title: String(data.title ?? slug),
      description: String(data.description ?? ''),
      publishedAt: String(data.publishedAt ?? ''),
      readingTime: Math.ceil(content.split(/\s+/g).length / 200),
    };
  }

  await fs.writeFile(outPath, JSON.stringify(previews, null, 2) + '\n');
  console.log(`Wrote post previews for ${files.length} posts`);
}

// Set up the program
program
  .name('blog')
  .description('CLI for managing blog content')
  .version('1.0.0');

program
  .command('og-images')
  .description('Generate social share cards (public/images/og/) and link-preview data (src/data/post-previews.json) for all posts')
  .action(async () => {
    try {
      await generateOgImages();
      await generatePostPreviews();
    } catch (error) {
      console.error('Failed to generate og images:', error);
      process.exit(1);
    }
  });

// Add commands
program
  .command('process-images')
  .description('Process and optimize images from content/images to public/images')
  .action(async () => {
    try {
      await processImages();
    } catch (error) {
      console.error('Failed to process images:', error);
      process.exit(1);
    }
  });

// Add watch command
program
  .command('watch-images')
  .description('Watch and process images automatically')
  .action(() => {
    console.log('Watching for image changes in content/images...');
    const watcher = chokidar.watch('content/images/**/*', {
      ignored: /(^|[\/\\])\../,
      persistent: true
    });

    watcher
      .on('add', () => processImages())
      .on('change', () => processImages());
  });

// Parse arguments
program.parse(process.argv);