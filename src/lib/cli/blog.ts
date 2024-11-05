import { Command } from 'commander';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs/promises';
import chokidar from 'chokidar';

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

// Set up the program
program
  .name('blog')
  .description('CLI for managing blog content')
  .version('1.0.0');

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