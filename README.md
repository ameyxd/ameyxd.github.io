# My Personal Website [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fameyxd%2Fportfolio)

This is my personal website and portfolio, built with Next.js, [shadcn/ui](https://ui.shadcn.com/), and [magic ui](https://magicui.design/), deployed on Vercel.

## Features

- Showcases my personal projects, skills, and experiences
- Includes a blog where I share my thoughts and insights
- Responsive design for optimal viewing on different devices
- Built using Next.js 14, React, Typescript, Shadcn/UI, TailwindCSS, Framer Motion, Magic UI
- Optimized for performance with Next.js and Vercel

## Customization

The website can be easily customized by editing the [single config file](./src/data/resume.tsx) to reflect your own information and preferences.

## Local Development

To run this website locally:

1. Clone this repository:
   ```bash
   git clone https://github.com/ameyxd/portfolio
   ```

2. Navigate to the project directory:
   ```bash
   cd portfolio
   ```

3. Install dependencies:
   ```bash
   pnpm install
   ```

4. Start the development server:
   ```bash
   pnpm dev
   ```

5. Open the [Config file](./src/data/resume.tsx) and customize it with your personal information

## License

This project is licensed under the [MIT license](https://github.com/ameyxd/portfolio/blob/main/LICENSE.md).

## Portfolio & Blog

### Blog Post Workflow

#### 1. Create Content
- Create new MDX file in `content/posts/your-post.mdx`
- Add frontmatter with required metadata:
  ```mdx
  ---
  title: Your Post Title
  publishedAt: YYYY-MM-DD
  description: Brief description
  tags: [tag1, tag2]
  ---
  ```

#### 2. Add Images
- Place images in `content/images/` directory
- Reference in MDX: `![alt text](/images/your-image.jpg)`

#### 3. Test Locally

#### 3.1 Test build process

```bash
pnpm test:all
```

#### 3.2 Run development server

```bash
pnpm dev
```

### 4. Publishing Flow
1. Create new branch for your post:
   ```bash
   git checkout -b post/your-post-name
   ```

2. Commit changes:
   ```bash
   git add .
   git commit -m "post: add new blog post about X"
   ```

3. Push and test build:
   ```bash
   git push origin post/your-post-name
   ```

4. Create PR to master
   - Wait for build to pass
   - Review preview
   - Merge to master

5. Master branch will automatically:
   - Build
   - Deploy to GitHub Pages
   - Process images