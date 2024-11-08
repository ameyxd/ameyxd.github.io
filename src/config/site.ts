import { DATA } from "@/data/resume";
import { describe } from "node:test";
export const siteConfig = {
  name: "Amey Ambade",
  firstname: DATA.firstname,
  title: DATA.name,
  description: DATA.description,
  summary: DATA.summary,
  personalquote: "Fear has killed more dreams than failure ever will.",
  url: "https://heyamey.com",
  shortlink: "heyamey.com",
  ogImage: "https://heyamey.com/og.jpg",
  links: {
    twitter: "https://twitter.com/ameyxd",
    github: "https://github.com/ameyxd",
    linkedin: "https://linkedin.com/in/ameyxd"
  }
} as const; 