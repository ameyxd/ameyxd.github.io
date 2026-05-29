import { DATA } from "@/data/resume";
import { ProjectCard } from "@/components/project-card";
import BlurFade from "@/components/magicui/blur-fade";

export const metadata = {
  title: "Projects",
  description: "Things I'm building, breaking, and shipping.",
};

const BLUR_FADE_DELAY = 0.04;

export default function ProjectsPage() {
  return (
    <div className="container-wide py-8 md:py-16">
      <BlurFade delay={BLUR_FADE_DELAY}>
        <header className="mb-12 md:mb-16">
          <h1 className="text-4xl md:text-6xl font-display font-semibold tracking-tight">
            Projects
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
            Things I&apos;m building, breaking, and shipping. A mix of energy-sector AI,
            developer tooling, and small experiments that scratched an itch.
          </p>
        </header>
      </BlurFade>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {DATA.projects.map((project, idx) => (
          <BlurFade key={project.title} delay={BLUR_FADE_DELAY * 2 + idx * 0.05}>
            <ProjectCard
              title={project.title}
              href={project.href}
              description={project.description}
              dates={project.dates}
              tags={project.tags}
              image={project.image}
              video={project.video}
              links={project.links}
            />
          </BlurFade>
        ))}
      </section>
    </div>
  );
}
