import { DATA } from "@/data/resume";
import { ResumeCard } from "@/components/resume-card";
import { Separator } from "@/components/ui/separator";
import { siteConfig } from "@/config/site";
import { SidebarNav } from "@/components/about/sidebar-nav";
import Image from "next/image";
import Link from "next/link";
import BlurFade from "@/components/magicui/blur-fade";
import { Highlight } from "@/components/Highlight";
const BLUR_FADE_DELAY = 0.005;

const sections = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "patents", label: "Patents" },
  { id: "publications", label: "Publications" },
  { id: "contributions", label: "Professional Contributions" },
  { id: "memberships", label: "Professional Memberships" },
  { id: "volunteering", label: "Volunteering" },
  { id: "mentoring", label: "Mentoring" },
  { id: "awards", label: "Awards" },
] as const;

export default function AboutPage() {
  return (
    <div className="container-wide py-8 md:py-16 relative">
      <div className="flex gap-8 lg:gap-12">
        {/* Main Content */}
        <div className="flex-1">
          {sections.map((section) => (
            <section 
              key={section.id} 
              id={section.id} 
              className="scroll-mt-24"
            >
              {section.id === "about" ? (
                <div className="flex flex-col md:flex-row items-center gap-12 mb-16">
                  <div className="flex-1 space-y-6">
                    <h1 className="text-4xl md:text-5xl font-display font-semibold">About Me</h1>
                    <p className="text-xl text-muted-foreground">
                      I build <Highlight delay={0.2}>AI systems</Highlight> for
                      clients across industries, and write about when they{" "}
                      <Highlight delay={0.5}>break</Highlight>.
                    </p>
                    <p className="text-lg text-muted-foreground">
                      Amey builds AI for Dataiku clients across pharma, retail,
                      finance, insurance, and energy. He hosts{" "}
                      <Highlight delay={0.8}>SE Radio</Highlight>, lives in
                      Houston with a cat named Crow, lifts heavy, and makes
                      music when it&apos;s quiet.
                    </p>
                    <BlurFade delay={BLUR_FADE_DELAY * 9}>
                      <a 
                        href="/resume.pdf" 
                        download={`${siteConfig.name.replace(/ /g,"_")}_Resume_${new Date().getFullYear()}.pdf`}
                        className="px-6 inline-flex py-3 rounded-lg 
                          bg-gradient-to-b from-black/80 to-black/90 dark:from-zinc-300 dark:to-zinc-400
                          hover:from-black/85 hover:to-black/95 dark:hover:from-zinc-200 dark:hover:to-zinc-300
                          backdrop-blur-sm transition-all duration-300 
                          hover:shadow-[0_8px_16px_-6px_rgba(0,0,0,0.1)] hover:scale-105
                          border border-white/10 dark:border-zinc-400
                          font-medium relative
                          shadow-[0_2px_8px_-3px_rgba(0,0,0,0.1)]
                          after:absolute after:inset-0 after:rounded-lg after:bg-gradient-to-t after:from-white/[0.03] after:to-transparent
                          text-white hover:text-white dark:text-zinc-800 dark:hover:text-zinc-900
                        "
                      >
                        Download CV
                      </a>
                    </BlurFade>
                  </div>
                  <div className="relative w-64 h-64 shrink-0 rounded-full overflow-hidden border-4 border-muted">
                    <Image
                      src="/me.png"
                      alt={siteConfig.name}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                </div>
              ) : (
                <>
                  {section.id === "experience" && (
                    <div className="space-y-10 w-full py-12">
                      <BlurFade delay={BLUR_FADE_DELAY * 11}>
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                          <div className="space-y-2">
                            <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                              Career Journey
                            </div>
                            <h2 className="text-3xl font-display font-semibold tracking-tighter sm:text-5xl">
                              Experience
                            </h2>
                          </div>
                        </div>
                      </BlurFade>
                      <BlurFade delay={BLUR_FADE_DELAY * 12}>
                        <div className="space-y-6">
                          {DATA.work.map((job, index) => (
                            <ResumeCard
                              key={index}
                              logoUrl={job.logoUrl}
                              altText={job.company}
                              title={job.title}
                              subtitle={job.company}
                              href={job.href}
                              badges={job.badges}
                              period={
                                job.start === job.end
                                  ? job.start
                                  : `${job.start} - ${job.end}`
                              }
                              description={job.description}
                              highlights={job.highlights}
                              location={job.location}
                              defaultExpanded={index === 0}
                            />
                          ))}
                        </div>
                      </BlurFade>
                    </div>
                  )}

                  {section.id === "education" && (
                    <div className="space-y-10 w-full py-12">
                      <BlurFade delay={BLUR_FADE_DELAY * 13}>
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                          <div className="space-y-2">
                            <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                              Academic Background
                            </div>
                            <h2 className="text-3xl font-display font-semibold tracking-tighter sm:text-5xl">
                              Education
                            </h2>
                          </div>
                        </div>
                      </BlurFade>
                      <BlurFade delay={BLUR_FADE_DELAY * 14}>
                        <div className="space-y-6">
                          {DATA.education.map((edu, index) => (
                            <ResumeCard
                              key={index}
                              logoUrl={edu.logoUrl}
                              altText={edu.school}
                              title={edu.degree}
                              subtitle={edu.school}
                              href={edu.href}
                              period={`${edu.start} - ${edu.end}`}
                              location={edu.location}
                              specialization={edu.specialization}
                            />
                          ))}
                        </div>
                      </BlurFade>
                    </div>
                  )}

                  {section.id === "patents" && (
                    <div className="space-y-10 w-full py-12">
                      <BlurFade delay={BLUR_FADE_DELAY * 16}>
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                        <div className="space-y-2">
                          <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                            Innovative Contributions
                          </div>
                          <h2 className="text-3xl font-display font-semibold tracking-tighter sm:text-5xl">
                            Patents
                          </h2>
                          <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            One granted US patent and five pending published
                            applications in applied AI and ML, plus a WIPO
                            publication. All in production energy systems.
                          </p>
                        </div>
                      </div>
                    </BlurFade>
                    <BlurFade delay={BLUR_FADE_DELAY * 17}>
                      <ul className="mb-4 ml-4 divide-y divide-dashed border-l space-y-4">
                        {DATA.patents.map((patent, id) => (
                          <BlurFade key={patent.number} delay={BLUR_FADE_DELAY * 18 + id * 0.05}>
                            <article className="group relative rounded-xl bg-card/30 hover:bg-card/50 backdrop-blur-sm transition-colors">
                              <li className="relative pl-6 py-4">
                                <div
                                  className={`absolute left-0 top-[2rem] -ml-[5px] h-[10px] w-[10px] rounded-full ${
                                    patent.status === "Granted"
                                      ? "bg-accent-brand"
                                      : "bg-foreground"
                                  }`}
                                ></div>
                                <div className="flex flex-wrap items-center gap-2 mb-2">
                                  <h3 className="font-semibold text-lg group-hover:text-primary/70 transition-colors">
                                    {patent.title}
                                  </h3>
                                  <span
                                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                                      patent.status === "Granted"
                                        ? "bg-accent-brand/15 text-accent-brand"
                                        : "bg-muted text-muted-foreground"
                                    }`}
                                  >
                                    {patent.status}
                                  </span>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  {patent.number} · {patent.date}
                                </p>
                                <p className="text-sm mt-1">{patent.summary}</p>
                                <Link
                                  href={patent.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-sm text-blue-500 hover:underline"
                                >
                                  View on Google Patents
                                </Link>
                              </li>
                            </article>
                          </BlurFade>
                        ))}
                      </ul>
                    </BlurFade>
                    </div>
                  )}

                  {section.id === "publications" && (
                    <div className="space-y-10 w-full py-12">
                      <BlurFade delay={BLUR_FADE_DELAY * 19}>
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                          <div className="space-y-2">
                            <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                              Research & Development
                            </div>
                            <h2 className="text-3xl font-display font-semibold tracking-tighter sm:text-5xl">
                              Publications
                            </h2>
                            <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                              A collection of my published works and research contributions.
                            </p>
                          </div>
                        </div>
                      </BlurFade>
                      <BlurFade delay={BLUR_FADE_DELAY * 20}>
                        <ul className="mb-4 ml-4 divide-y divide-dashed border-l space-y-4">
                          {DATA.publications.map((pub, id) => (
                            <BlurFade key={pub.title} delay={BLUR_FADE_DELAY * 21 + id * 0.05}>
                              <article className="group relative rounded-xl bg-card/30 hover:bg-card/50 backdrop-blur-sm transition-colors">
                                <li className="relative pl-6 py-4">
                                  <div className="absolute left-0 top-[2rem] -ml-[5px] h-[10px] w-[10px] rounded-full bg-foreground"></div>
                                  <h3 className="font-semibold text-lg mb-2 group-hover:text-primary/70 transition-colors">{pub.title}</h3>
                                  <p className="text-sm text-muted-foreground">{pub.authors}</p>
                                  <p className="text-sm text-muted-foreground">{pub.journal}, {pub.year}</p>
                                  {pub.link && (
                                    <Link href={pub.link} className="text-sm text-blue-500 hover:underline">
                                      View Publication
                                    </Link>
                                  )}
                                </li>
                              </article>
                            </BlurFade>
                          ))}
                        </ul>
                      </BlurFade>
                    </div>
                  )}

                  {section.id === "contributions" && (
                    <div className="space-y-10 w-full py-12">
                      <BlurFade delay={BLUR_FADE_DELAY * 22}>
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                          <div className="space-y-2">
                            <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                              Industry Impact
                            </div>
                            <h2 className="text-3xl font-display font-semibold tracking-tighter sm:text-5xl">
                              Professional Contributions
                            </h2>
                            <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                              My contributions to the professional community.
                            </p>
                          </div>
                        </div>
                      </BlurFade>
                      <BlurFade delay={BLUR_FADE_DELAY * 23}>
                        <ul className="mb-4 ml-4 divide-y divide-dashed border-l space-y-4">
                          {DATA.professionalContributions.map((contrib, id) => (
                            <BlurFade key={contrib.event} delay={BLUR_FADE_DELAY * 24 + id * 0.05}>
                              <article className="group relative rounded-xl bg-card/30 hover:bg-card/50 backdrop-blur-sm transition-colors">
                                <li className="relative pl-6 py-4">
                                  <div className="absolute left-0 top-[2rem] -ml-[5px] h-[10px] w-[10px] rounded-full bg-foreground"></div>
                                  <h3 className="font-semibold text-lg mb-2 group-hover:text-primary/70 transition-colors">{contrib.role}</h3>
                                  <p className="text-sm text-muted-foreground">{contrib.event}</p>
                                  <p className="text-sm text-muted-foreground">{contrib.conference}</p>
                                  <p className="text-sm text-muted-foreground">{contrib.year} • {contrib.location}</p>
                                </li>
                              </article>
                            </BlurFade>
                          ))}
                        </ul>
                      </BlurFade>
                    </div>
                  )}

                  {section.id === "memberships" && (
                    <div className="space-y-10 w-full py-12">
                      <BlurFade delay={BLUR_FADE_DELAY * 25}>
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                          <div className="space-y-2">
                            <h2 className="text-3xl font-display font-semibold tracking-tighter sm:text-5xl">
                              Professional Memberships
                            </h2>
                          </div>
                        </div>
                      </BlurFade>
                      <BlurFade delay={BLUR_FADE_DELAY * 26}>
                        <ul className="mb-4 ml-4 divide-y divide-dashed border-l space-y-4">
                          {DATA.professionalMemberships.map((membership, id) => (
                            <BlurFade key={membership} delay={BLUR_FADE_DELAY * 27 + id * 0.05}>
                              <article className="group relative rounded-xl bg-card/30 hover:bg-card/50 backdrop-blur-sm transition-colors">
                                <li className="relative pl-6 py-4">
                                  <div className="absolute left-0 top-[1.5rem] -ml-[5px] h-[10px] w-[10px] rounded-full bg-foreground"></div>
                                  <p className="text-sm">{membership}</p>
                                </li>
                              </article>
                            </BlurFade>
                          ))}
                        </ul>
                      </BlurFade>
                    </div>
                  )}

                  {section.id === "volunteering" && (
                    <div className="space-y-10 w-full py-12">
                      <BlurFade delay={BLUR_FADE_DELAY * 28}>
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                          <div className="space-y-2">
                            <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                              Community Impact
                            </div>
                            <h2 className="text-3xl font-display font-semibold tracking-tighter sm:text-5xl">
                              Volunteering
                            </h2>
                            <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            Making a difference by giving back to the professional, underprivileged and local communities.
                            </p>
                          </div>
                        </div>
                      </BlurFade>
                      <BlurFade delay={BLUR_FADE_DELAY * 29}>
                        <ul className="mb-4 ml-4 divide-y divide-dashed border-l space-y-4">
                          {DATA.volunteering.map((vol, id) => (
                            <BlurFade key={vol.organization} delay={BLUR_FADE_DELAY * 30 + id * 0.05}>
                              <article className="group relative rounded-xl bg-card/30 hover:bg-card/50 backdrop-blur-sm transition-colors">
                                <li className="relative pl-6 py-4">
                                  <div className="absolute left-0 top-[2rem] -ml-[5px] h-[10px] w-[10px] rounded-full bg-foreground"></div>
                                  <h3 className="font-semibold text-lg mb-2 group-hover:text-primary/70 transition-colors">{vol.organization}</h3>
                                  <p className="text-sm text-muted-foreground">{vol.role} | {vol.period}</p>
                                  <p className="text-sm text-muted-foreground">{vol.description}</p>
                                </li>
                              </article>
                            </BlurFade>
                          ))}
                        </ul>
                      </BlurFade>
                    </div>
                  )}

                  {section.id === "mentoring" && (
                    <div className="space-y-10 w-full py-12">
                      <BlurFade delay={BLUR_FADE_DELAY * 31}>
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                          <div className="space-y-2">
                            <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                              Knowledge Sharing
                            </div>
                            <h2 className="text-3xl font-display font-semibold tracking-tighter sm:text-5xl">
                              Mentoring
                            </h2>
                            <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            Sharing knowledge and experiences to help others grow.
                            </p>
                          </div>
                        </div>
                      </BlurFade>
                      <BlurFade delay={BLUR_FADE_DELAY * 32}>
                        <div className="space-y-4">
                          {DATA.mentoring.map((mentor, id) => (
                            <BlurFade key={mentor.organization} delay={BLUR_FADE_DELAY * 33 + id * 0.05}>
                              <div className="p-4 rounded-xl bg-card/30 hover:bg-card/50 backdrop-blur-sm transition-colors">
                                <h3 className="font-semibold">{mentor.organization}</h3>
                                <p className="text-sm text-muted-foreground">{mentor.role} | {mentor.period}</p>
                                <p className="text-sm mt-2">{mentor.description}</p>
                              </div>
                            </BlurFade>
                          ))}
                        </div>
                      </BlurFade>
                    </div>
                  )}

                  {section.id === "awards" && (
                    <div className="space-y-10 w-full py-12">
                      <BlurFade delay={BLUR_FADE_DELAY * 34}>
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                          <div className="space-y-2">
                            <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                              Recognition
                            </div>
                            <h2 className="text-3xl font-display font-semibold tracking-tighter sm:text-5xl">
                              Awards
                            </h2>
                          </div>
                        </div>
                      </BlurFade>
                      <BlurFade delay={BLUR_FADE_DELAY * 35}>
                        <div className="space-y-4">
                        {DATA.awards.map((award, id) => (
                        <BlurFade key={award.title} delay={BLUR_FADE_DELAY * 31 + id * 0.05}>
                          <div className="p-2 rounded hover:bg-muted">
                            <h3 className="font-semibold">{award.title}</h3>
                            <p className="text-sm text-muted-foreground">{award.organization} | {award.year}</p>
                          </div>
                          </BlurFade>
                        ))}
                        </div>
                      </BlurFade>
                    </div>
                  )}

                  {section.id === "skills" && (
                    <div className="space-y-10 w-full py-12">
                      <BlurFade delay={BLUR_FADE_DELAY * 15}>
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                          <div className="space-y-2">
                            <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                              Technical Expertise
                            </div>
                            <h2 className="text-3xl font-display font-semibold tracking-tighter sm:text-5xl">
                              Skills
                            </h2>
                          </div>
                        </div>
                      </BlurFade>
                      <BlurFade delay={BLUR_FADE_DELAY * 16}>
                        <div className="flex flex-wrap gap-3">
                          {DATA.skills.map((skill, index) => (
                            <div 
                              key={index} 
                              className="px-4 py-2 rounded-full bg-secondary/50 text-sm font-medium"
                            >
                              {skill}
                            </div>
                          ))}
                        </div>
                      </BlurFade>
                    </div>
                  )}
                </>
              )}
            </section>
          ))}
        </div>

        {/* Sidebar Navigation */}
        <SidebarNav sections={sections} />
      </div>
    </div>
  );
} 