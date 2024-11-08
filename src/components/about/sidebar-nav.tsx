"use client";

import { useEffect, useState } from "react";

interface Section {
  id: string;
  label: string;
}

interface SidebarNavProps {
  sections: readonly Section[];
}

export function SidebarNav({ sections }: SidebarNavProps) {
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
            window.history.replaceState(null, "", `#${entry.target.id}`);
          }
        });
      },
      {
        rootMargin: "-20% 0px -80% 0px"
      }
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sections]);

  return (
    <div className="w-64 hidden lg:block">
      <div className="sticky top-24 space-y-2">
        {sections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className={`block px-4 py-2 rounded-lg transition-colors ${
              activeSection === section.id
                ? "text-foreground bg-primary/10 font-medium"
                : "text-muted-foreground hover:text-foreground hover:bg-primary/5"
            }`}
            onClick={(e) => {
              e.preventDefault();
              const element = document.getElementById(section.id);
              if (element) {
                const navbarHeight = 80;
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

                window.scrollTo({
                  top: offsetPosition,
                  behavior: "smooth"
                });
                window.history.pushState(null, "", `#${section.id}`);
              }
            }}
          >
            {section.label}
          </a>
        ))}
      </div>
    </div>
  );
} 