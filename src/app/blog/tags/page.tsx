import BlurFade from "@/components/magicui/blur-fade";
import { getAllTags } from "@/data/blog";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Tags",
  description: "Every topic on the blog, by tag.",
};

const getTagColor = (tag: string) => {
  const hash = tag.split("").reduce((acc, char) => char.charCodeAt(0) + acc, 0);
  const hue = hash % 360;
  return `hsl(${hue}, 70%, 90%)`;
};

export default async function TagsPage() {
  const tags = await getAllTags();

  return (
    <div className="container-wide py-8 md:py-16">
      <BlurFade delay={0.04}>
        <header className="text-center mb-8 md:mb-16">
          <h1 className="text-4xl md:text-6xl font-display font-semibold tracking-tight">
            Tags
          </h1>
          <p className="mt-4 text-muted-foreground">
            Every topic on the blog. Click one to filter.
          </p>
        </header>
      </BlurFade>

      <BlurFade delay={0.08}>
        <div className="mx-auto flex max-w-2xl flex-wrap items-center justify-center gap-3">
          {tags.map(({ tag, count }) => (
            <Link href={`/blog/tag/${tag}`} key={tag}>
              <Badge
                variant="secondary"
                className="cursor-pointer bg-opacity-20 px-3 py-1.5 text-base transition-colors hover:bg-opacity-30 dark:text-black"
                style={{ backgroundColor: getTagColor(tag) }}
              >
                {tag}
                <span className="ml-1.5 text-muted-foreground/70 dark:text-black/50">
                  {count}
                </span>
              </Badge>
            </Link>
          ))}
        </div>
      </BlurFade>
    </div>
  );
}
