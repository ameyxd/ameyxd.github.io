import { getBlogPosts, getPost } from "@/data/blog";
import { DATA } from "@/data/resume";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import BlurFade from "@/components/magicui/blur-fade";
import { MDXContent } from '@/components/mdx/MDXComponents'

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: {
    slug: string;
  };
}): Promise<Metadata | undefined> {
  let post = await getPost(params.slug);

  let {
    title,
    publishedAt: publishedTime,
    description,
    image,
  } = post.metadata;
  let ogImage = image ? `${DATA.url}${image}` : `${DATA.url}/og?title=${title}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `${DATA.url}/blog/${post.slug}`,
      images: [{ url: ogImage }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function Blog({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  let post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="max-w-[700px] mx-auto">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.description,
            image: post.metadata.image
              ? `${DATA.url}${post.metadata.image}`
              : `${DATA.url}/og?title=${post.metadata.title}`,
            url: `${DATA.url}/blog/${post.slug}`,
            author: {
              "@type": "Person",
              name: DATA.name,
            },
          }),
        }}
      />
      <BlurFade>
      <h1 className="text-4xl font-bold mb-16 text-center">Amey's Blog</h1>
      <article className="flex flex-col gap-8">
          <header className="flex flex-col gap-8 text-center mb-16">
            <h1 className="text-6xl font-semibold tracking-tight">
              {post.metadata.title}
            </h1>
            <div className="flex items-center justify-center gap-2 text-muted-foreground text-lg">
              <Suspense fallback={<p className="h-5" />}>
                <time>{post.metadata.publishedAt}</time>
                <span>—</span>
                <span>{post.metadata.readingTime} min read</span>
              </Suspense>
            </div>
            <p className="text-2xl text-muted-foreground leading-relaxed">
              {post.metadata.description}
            </p>
          </header>
          <div className="prose dark:prose-invert max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-lead:text-muted-foreground prose-a:underline hover:prose-a:text-primary prose-p:text-lg prose-headings:text-4xl">
            <MDXContent source={post.source} />
          </div>
        </article>
      </BlurFade>
    </div>
  );
}
