/**
 * Copyright (c) 2024 Amey Ambade
 * Licensed under MIT License
 * Path: /app/blog/[slug]/page.tsx
 */

import { client } from "../../../../tina/__generated__/client"
import { TinaMarkdown } from "tinacms/dist/rich-text"
import { DATA } from "@/data/resume"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import { Suspense } from "react"
import BlurFade from "@/components/magicui/blur-fade"

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata | undefined> {
  const response = await client.queries.post({
    relativePath: `${params.slug}.mdx`,
  })
  const post = response.data.post

  const ogImage = post.coverImage 
    ? `${DATA.url}${post.coverImage}` 
    : `${DATA.url}/og?title=${post.title}`

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      url: `${DATA.url}/blog/${params.slug}`,
      images: [{ url: ogImage }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [ogImage],
    },
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string }
}) {
  const response = await client.queries.post({
    relativePath: `${params.slug}.mdx`,
  })
  
  if (!response.data.post) {
    notFound()
  }

  const post = response.data.post

  return (
    <div className="max-w-[700px] mx-auto">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            datePublished: post.date,
            dateModified: post.date,
            description: post.description,
            image: post.coverImage
              ? `${DATA.url}${post.coverImage}`
              : `${DATA.url}/og?title=${post.title}`,
            url: `${DATA.url}/blog/${params.slug}`,
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
            <h1 className="text-6xl font-semibold tracking-tight">
              {post.title}
            </h1>
            <div className="flex items-center justify-center gap-2 text-muted-foreground text-lg">
              <Suspense fallback={<p className="h-5" />}>
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString()}
                </time>
                {post.tags && (
                  <>
                    <span>—</span>
                    <div className="flex gap-2">
                      {post.tags.map((tag: string) => (
                        <span key={tag} className="text-primary">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </>
                )}
              </Suspense>
            </div>
            {post.description && (
              <p className="text-2xl text-muted-foreground leading-relaxed">
                {post.description}
              </p>
            )}
          </header>

          <div className="prose dark:prose-invert max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-lead:text-muted-foreground prose-a:underline hover:prose-a:text-primary prose-p:text-lg prose-headings:text-4xl">
            <TinaMarkdown content={post.body} />
          </div>
        </article>
      </BlurFade>
    </div>
  )
}

export async function generateStaticParams() {
  const postsResponse = await client.queries.postConnection()
  return postsResponse.data.postConnection.edges?.map((post) => ({
    slug: post?.node?._sys.filename,
  })) || []
}