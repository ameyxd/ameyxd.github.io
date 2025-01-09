// Copyright (c) 2024 Amey Ambade
// Licensed under the MIT License
// Path: src/components/mdx/TableOfContents.tsx

"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { List } from "lucide-react";

interface TableOfContentsProps {
  source: string;
}

interface HeadingInfo {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents({ source }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<HeadingInfo[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  useEffect(() => {
    // Extract headings from source
    const headingMatches = Array.from(
      source.matchAll(/^(#{1,6})\s+(.+)$/gm)
    ).map((match) => ({
      level: match[1].length,
      text: match[2],
      id: match[2].toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    }));

    setHeadings(headingMatches);

    // Set up intersection observer for headings
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-80px 0px -80% 0px" }
    );

    // Observe all heading elements
    document.querySelectorAll("h1, h2, h3, h4, h5, h6").forEach((heading) => {
      observer.observe(heading);
    });

    return () => {
      observer.disconnect();
    };
  }, [source]);

  const handleClickHeading = (headingId: string) => {
    setIsSheetOpen(false); // Close sheet on mobile when clicking a heading
    document.querySelector(`#${headingId}`)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  if (headings.length === 0) return null;

  const TocContent = () => (
    <div className="flex flex-col space-y-2">
      <p className="text-lg font-semibold mb-4">Table of Contents</p>
      <div className="flex flex-col space-y-2">
        {headings.map((heading) => (
          <button
            key={heading.id}
            onClick={() => handleClickHeading(heading.id)}
            className={cn(
              "text-sm hover:text-primary transition-colors text-left",
              heading.level === 1 ? "ml-0" : `ml-${heading.level * 2}`,
              activeId === heading.id
                ? "text-primary font-medium"
                : "text-muted-foreground",
              heading.level > 3 ? "hidden" : "" // Hide h4-h6 for cleaner TOC
            )}
          >
            {heading.text}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop ToC */}
      <nav
        aria-label="Table of contents"
        className="fixed right-8 top-[calc(4rem+4rem)] hidden xl:block w-64 overflow-y-auto max-h-[calc(100vh-420px)]"
      >
        <TocContent />
      </nav>

      {/* Mobile ToC */}
      <div className="fixed bottom-4 right-4 xl:hidden">
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <Button size="icon" className="rounded-full h-12 w-12">
              <List className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-80">
            <TocContent />
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
