"use client";

import Link from "next/link";
import { Icons } from "@/components/icons";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isRootBlogPath = pathname === '/blog';

  if (isRootBlogPath) {
    return <>{children}</>;
  }

  return (
    <div className="relative">
      <div className="sticky top-16 z-40 w-full bg-background/80 backdrop-blur-sm border-b">
        <div className="container-wide">
          <div className="flex items-center h-14">
            <Link
              href="/blog"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Icons.arrowLeft className="h-4 w-4" />
              <span>Back to blog</span>
            </Link>
          </div>
        </div>
      </div>
      
      <div className="container-wide py-8 md:py-16">
        {children}
      </div>

    </div>
  );
} 