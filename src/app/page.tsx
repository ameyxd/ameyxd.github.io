import BlurFade from "@/components/magicui/blur-fade";
import { getBlogPosts } from "@/data/blog";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { siteConfig } from "@/config/site";
import { DATA } from "@/data/resume";

export default async function HomePage() {
  const posts = await getBlogPosts();
  const { hobbies } = DATA;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="w-full bg-background">
        <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 space-y-6">
              <h1 className="text-4xl md:text-7xl font-bold tracking-tight">
                Hey, I'm {siteConfig.firstname} 👋🏽 
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl">
                {siteConfig.description}
              </p>
              <p className="text-xl md:text-xl text-primary max-w-3xl">
                {siteConfig.summary}
              </p>
              <div className="flex items-center gap-4 pt-4">
                <Link 
                  href="/blog" 
                  className="px-8 py-3 rounded-full bg-primary/10 hover:bg-primary/20 backdrop-blur-md transition-colors"
                >
                  Read Blog
                </Link>
                <Link 
                  href="/about" 
                  className="px-8 py-3 rounded-full bg-muted/50 hover:bg-muted/70 backdrop-blur-md transition-colors"
                >
                  About Me
                </Link>
              </div>
            </div>
            <div className="relative w-72 h-72 rounded-full overflow-hidden border-4 border-muted">
              <Image
                src="/me.png"
                alt={siteConfig.name}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="w-full max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Posts - Now with cover images */}
          <div className="lg:col-span-2 space-y-8">
            <h2 className="text-3xl font-semibold mb-8">Recent Posts</h2>
            {posts.slice(0, 3).map((post, idx) => (
              <BlurFade key={post.slug} delay={0.1 * idx}>
                <article className="group relative rounded-xl bg-card/30 hover:bg-card/50 backdrop-blur-sm transition-colors overflow-hidden">
                  <Link href={`/blog/${post.slug}`} className="block">
                    {post.metadata.coverImage && (
                      <div className="relative w-full h-48">
                        <Image
                          src={post.metadata.coverImage}
                          alt={post.metadata.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="text-2xl font-semibold mb-2 group-hover:text-primary/70 transition-colors">
                        {post.metadata.title}
                      </h3>
                      <p className="text-muted-foreground line-clamp-2">
                        {post.metadata.description}
                      </p>
                      <div className="flex items-center gap-2 mt-4 text-sm text-muted-foreground">
                        <time>{post.metadata.publishedAt}</time>
                        <span>•</span>
                        <span>{post.metadata.readingTime} min read</span>
                      </div>
                    </div>
                  </Link>
                </article>
              </BlurFade>
            ))}
          </div>

          {/* Sidebar - Made wider */}
          <div className="space-y-8">
            {/* Current Work/Status */}
            <div className="p-8 rounded-xl bg-card/30 backdrop-blur-sm">
              <h2 className="text-2xl font-semibold mb-6">Currently</h2>
              <div className="space-y-4 text-muted-foreground">
                <p className="flex items-center gap-2">
                  <span className="text-xl">🔭</span>
                  Working on ML projects
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-xl">📚</span>
                  Learning about LLMs
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-xl">✍️</span>
                  Writing about tech
                </p>
              </div>
            </div>

            {/* Quick Links */}
            <div className="p-8 rounded-xl bg-card/30 backdrop-blur-sm">
              <h2 className="text-2xl font-semibold mb-6">Quick Links</h2>
              <div className="space-y-3">
                <Link href="/projects" className="block text-muted-foreground hover:text-primary transition-colors">
                  Projects
                </Link>
                <Link href="/blog" className="block text-muted-foreground hover:text-primary transition-colors">
                  All Posts
                </Link>
                <Link href="/about" className="block text-muted-foreground hover:text-primary transition-colors">
                  About
                </Link>
              </div>
            </div>
          </div>
        </div>

        Hobbies Section
        <section className="mt-24">
          <h2 className="text-3xl font-semibold mb-8">Hobbies & Interests</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hobbies.map((hobby, idx) => (
              <Link 
                key={idx} 
                href={`/hobbies/${hobby.toLowerCase().replace(/\s+/g, '-')}`}
                className="p-6 rounded-xl bg-card/30 hover:bg-card/50 backdrop-blur-sm transition-all hover:scale-[1.02]"
              >
                <h3 className="text-xl font-semibold mb-2">{hobby}</h3>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
