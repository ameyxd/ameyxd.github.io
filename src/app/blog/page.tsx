/**
 * Copyright (c) 2024 Amey Ambade
 * Licensed under MIT License
 * Path: /app/blog/page.tsx
 */

import { client } from "../../../tina/__generated__/client"
import Link from "next/link"
import BlurFade from "@/components/magicui/blur-fade"
import { Metadata } from "next"
import { DATA } from "@/data/resume"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "Blog",
  description: "Read my thoughts on software development, design, and more.",
  openGraph: {
    title: "Blog | " + DATA.name,
    description: "Read my thoughts on software development, design, and more.",
    url: `${DATA.url}/blog`,
    siteName: DATA.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | " + DATA.name,
    description: "Read my thoughts on software development, design, and more.",
  },
}

export default async function BlogIndexPage() {
  const postsResponse = await client.queries.postConnection({
    sort: "publishedAt",
    last: 100, // Adjust based on your needs
  })
  
  const posts = postsResponse.data.postConnection.edges?.map(post => ({
    slug: post?.node?._sys.filename,
    metadata: {
      title: post?.node?.title,
      publishedAt: post?.node?.publishedAt,
      description: post?.node?.description,
      readingTime: post?.node?.readingTime,
    },
  })) || []

  return (
    <div className="max-w-[700px] mx-auto">
      <BlurFade>
        <div className="flex flex-col gap-8">
          <header className="flex flex-col gap-4">
            <h1 className="text-4xl font-semibold tracking-tight">Blog</h1>
            <p className="text-xl text-muted-foreground">
              My thoughts on software development, design, and more.
            </p>
          </header>

          <div className="flex flex-col divide-y divide-muted/10">
            {posts.map((post) => (
              <article key={post.slug} className="py-8">
                <Link href={`/blog/${post.slug}`}>
                  <h2 className="text-2xl font-semibold tracking-tight hover:text-primary transition-colors">
                    {post.metadata.title}
                  </h2>
                </Link>
                <div className="flex items-center gap-2 text-muted-foreground text-lg mt-2">
                  <Suspense fallback={<p className="h-5" />}>
                    <time>
                      {new Date(post.metadata.publishedAt).toLocaleDateString()}
                    </time>
                    <span>—</span>
                    <span>{post.metadata.readingTime} min read</span>
                  </Suspense>
                </div>
                {post.metadata.description && (
                  <p className="text-muted-foreground mt-4 leading-relaxed">
                    {post.metadata.description}
                  </p>
                )}
              </article>
            ))}
          </div>
        </div>
      </BlurFade>
    </div>
  )
}