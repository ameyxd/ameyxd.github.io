"use client";

import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Icons } from "@/components/icons";
import { ModeToggle } from "@/components/mode-toggle";
import { TextureToggle } from "@/components/TextureToggle";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const NavItems = () => (
  <>
    <Link
      href="/blog"
      className="text-muted-foreground hover:text-foreground transition-colors"
    >
      Blog
    </Link>
    <Link
      href="/projects"
      className="text-muted-foreground hover:text-foreground transition-colors"
    >
      Projects
    </Link>
    <Link
      href="/library"
      className="text-muted-foreground hover:text-foreground transition-colors"
    >
      Library
    </Link>
    <Link
      href="/now"
      className="text-muted-foreground hover:text-foreground transition-colors"
    >
      Now
    </Link>
    <Link
      href="/about"
      className="text-muted-foreground hover:text-foreground transition-colors"
    >
      About Me
    </Link>
    <Link 
      href="/contact"
      className="text-muted-foreground hover:text-foreground transition-colors"
    >
      Contact
    </Link>
    <a 
      href="/resume.pdf"
      className="text-muted-foreground hover:text-foreground transition-colors"
      download={`${siteConfig.name.replace(/ /g,"_")}_Resume_${new Date().getFullYear()}.pdf`}
    >
      Download Resume
    </a>
  </>
);

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav data-site-chrome className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border/40">
      <div className="container-wide">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link 
              href="/" 
              className="text-lg font-semibold flex items-center gap-2"
            >
              <Icons.mousepointericon className="h-6 w-6" />
              {siteConfig.name}
            </Link>
            <Link
              href="/blog"
              className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Icons.notebook className="h-5 w-5" />
              {/* <span className="text-sm">Blog</span> */}
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <NavItems />
            <div className="flex items-center gap-1">
              <TextureToggle />
              <ModeToggle />
            </div>
          </div>

          {/* Mobile top-right: texture + theme toggles + menu button */}
          <div className="md:hidden flex items-center gap-1">
            <TextureToggle />
            <ModeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              className="p-2"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border/40">
            <div className="flex flex-col gap-4 px-4">
              <NavItems />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
} 