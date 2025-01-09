// Copyright (c) 2024 Amey Ambade
// Licensed under the MIT License

import { getBlogPosts, getPost } from "@/data/blog";
import { DATA } from "@/data/resume";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import BlurFade from "@/components/magicui/blur-fade";
import { MDXContent } from '@/components/mdx/MDXComponents';
import { TableOfContents } from '@/components/blog/TableOfContents';
import Image from 'next/image';

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
    <div className="relative min-h-screen">
      {post.metadata.coverImage && (
        <div className="relative w-full h-64 mb-8">
          <Image
            src={`/${post.metadata.coverImage}`}
            alt={post.metadata.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative pt-16">
        {/* TODO: Add table of contents */}
        {/* <TableOfContents source={post.source} /> */}
        
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
          <article className="flex flex-col gap-8">
            <header className="flex flex-col gap-8 text-center mb-16">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight">
                {post.metadata.title}
              </h1>
              <div className="flex items-center justify-center gap-2 text-muted-foreground text-base sm:text-lg">
                <Suspense fallback={<p className="h-5" />}>
                  <time>{post.metadata.publishedAt}</time>
                  <span>—</span>
                  <span>{post.metadata.readingTime} min read</span>
                </Suspense>
              </div>
              <p className="text-xl sm:text-2xl text-muted-foreground leading-relaxed">
                {post.metadata.description}
              </p>
            </header>
            <div className="prose dark:prose-invert max-w-none prose-headings:scroll-mt-20 prose-headings:font-semibold prose-headings:tracking-tight prose-lead:text-muted-foreground prose-a:underline hover:prose-a:text-primary">
              <MDXContent source={post.source} />
            </div>
          </article>
        </BlurFade>
      </div>
    </div>
  );
}
