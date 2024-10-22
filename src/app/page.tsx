import { HackathonCard } from "@/components/hackathon-card";
import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { ProjectCard } from "@/components/project-card";
import { ResumeCard } from "@/components/resume-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { DATA } from "@/data/resume";
import Link from "next/link";
import Markdown from "react-markdown";

const BLUR_FADE_DELAY = 0.04;

export default function Page() {
  return (
    <main className="flex flex-col min-h-[100dvh] space-y-10">
      <section id="hero">
        <div className="mx-auto w-full max-w-2xl space-y-8">
          <div className="gap-2 flex justify-between">
            <div className="flex-col flex flex-1 space-y-1.5">
              <BlurFadeText
                delay={BLUR_FADE_DELAY}
                className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none"
                yOffset={8}
                text={`Hey, I'm ${DATA.name.split(" ")[0]} 👋`}
              />
              <BlurFadeText
                className="max-w-[600px] md:text-xl"
                delay={BLUR_FADE_DELAY}
                text={DATA.description}
              />
            </div>
            <BlurFade delay={BLUR_FADE_DELAY}>
              <Avatar className="size-28 border">
                <AvatarImage alt={DATA.name} src={DATA.avatarUrl} />
                <AvatarFallback>{DATA.initials}</AvatarFallback>
              </Avatar>
            </BlurFade>
          </div>
        </div>
      </section>
      <section id="about">
        <BlurFade delay={BLUR_FADE_DELAY * 3}>
          <h2 className="text-xl font-bold">About Me</h2>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 4}>
          <Markdown className="prose max-w-full text-pretty font-sans text-sm text-muted-foreground dark:prose-invert">
            {DATA.summary}
          </Markdown>
        </BlurFade>
      </section>
      <section id="work">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <h2 className="text-xl font-bold">Work Experience</h2>
          </BlurFade>
          {DATA.work.map((work, id) => (
            <BlurFade
              key={work.company}
              delay={BLUR_FADE_DELAY * 6 + id * 0.05}
            >
              <ResumeCard
                key={work.company}
                logoUrl={work.logoUrl}
                altText={work.company}
                title={work.company}
                subtitle={work.title}
                href={work.href}
                badges={work.badges}
                period={`${work.start} - ${work.end ?? "Present"}`}
                location={work.location}
              />
            </BlurFade>
          ))}
        </div>
      </section>
      <section id="education">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 7}>
            <h2 className="text-xl font-bold">Education</h2>
          </BlurFade>
          {DATA.education.map((education, id) => (
            <BlurFade
              key={education.school}
              delay={BLUR_FADE_DELAY * 8 + id * 0.05}
            >
              <ResumeCard
                key={education.school}
                href={education.href}
                logoUrl={education.logoUrl}
                altText={education.school}
                title={education.school}
                subtitle={education.degree}
                period={`${education.start} - ${education.end}`}
                location={education.location}
                specialization={education.specialization}
              />
            </BlurFade>
          ))}
        </div>
      </section>
      <section id="skills">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 9}>
            <h2 className="text-xl font-bold">Skills</h2>
          </BlurFade>
          <div className="flex flex-wrap gap-1">
            {DATA.skills.map((skill, id) => (
              <BlurFade key={skill} delay={BLUR_FADE_DELAY * 10 + id * 0.05}>
                <Badge key={skill}>{skill}</Badge>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>
      {/* <section id="projects"> // TODO: Add projects
        <div className="space-y-12 w-full py-12">
          <BlurFade delay={BLUR_FADE_DELAY * 11}>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                  My Projects
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Check out my latest work
                </h2>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Here are some of my projects.
                </p>
              </div>
            </div>
          </BlurFade>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-[800px] mx-auto">
            {DATA.projects.map((project, id) => (
              <BlurFade
                key={project.title}
                delay={BLUR_FADE_DELAY * 12 + id * 0.05}
              >
                <ProjectCard
                  href={project.href}
                  key={project.title}
                  title={project.title}
                  description={project.description}
                  dates={project.dates}
                  tags={project.technologies}
                  image={project.image}
                  video={project.video}
                  links={project.links}
                />
              </BlurFade>
            ))}
          </div>
        </div>
      </section> */}
      <section id="patents">
        <div className="space-y-12 w-full py-12">
          <BlurFade delay={BLUR_FADE_DELAY * 16}>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                  Innovative Contributions
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Patents
                </h2>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  I have contributed to the application of AI in the energy industry through these patented innovations.
                </p>
              </div>
            </div>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 17}>
            <ul className="mb-4 ml-4 divide-y divide-dashed border-l">
              {DATA.patents.map((patent, id) => (
                <BlurFade key={patent.number} delay={BLUR_FADE_DELAY * 18 + id * 0.05}>
                  <li className="relative pl-6 py-4">
                    <div className="absolute left-0 top-4 -ml-[5px] h-[10px] w-[10px] rounded-full bg-foreground"></div>
                    <h3 className="font-semibold">{patent.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      Patent No: {patent.number} | Issued: {patent.issuedDate}
                    </p>
                    <Link href={patent.link} className="text-sm text-blue-500 hover:underline">
                      View Patent
                    </Link>
                  </li>
                </BlurFade>
              ))}
            </ul>
          </BlurFade>
        </div>
      </section>
      <section id="publications">
        <div className="space-y-12 w-full py-12">
          <BlurFade delay={BLUR_FADE_DELAY * 19}>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                  Publications
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Research and Insights
                </h2>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  A collection of my published works and research contributions.
                </p>
              </div>
            </div>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 20}>
            <ul className="mb-4 ml-4 divide-y divide-dashed border-l">
              {DATA.publications.map((pub, id) => (
                <BlurFade key={pub.title} delay={BLUR_FADE_DELAY * 21 + id * 0.05}>
                  <li className="relative pl-6 py-4">
                    <div className="absolute left-0 top-4 -ml-[5px] h-[10px] w-[10px] rounded-full bg-foreground"></div>
                    <h3 className="font-semibold">{pub.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {pub.authors} | {pub.journal} ({pub.year})
                    </p>
                    <Link href={pub.link} className="text-sm text-blue-500 hover:underline">
                      View Publication
                    </Link>
                  </li>
                </BlurFade>
              ))}
            </ul>
          </BlurFade>
        </div>
      </section>
      <section id="professional-contributions">
        <div className="space-y-12 w-full py-12">
          <BlurFade delay={BLUR_FADE_DELAY * 22}>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                  Professional Contributions
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Giving Back to the Community
                </h2>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  My contributions to the professional community and industry advancements.
                </p>
              </div>
            </div>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 23}>
            <ul className="mb-4 ml-4 divide-y divide-dashed border-l">
              {DATA.professionalContributions.map((contribution, index) => (
                <BlurFade key={index} delay={BLUR_FADE_DELAY * 24 + index * 0.05}>
                  <li className="relative pl-6 py-4">
                    <div className="absolute left-0 top-4 -ml-[5px] h-[10px] w-[10px] rounded-full bg-foreground"></div>
                    <h3 className="font-semibold">{contribution.role}</h3>
                    <p className="text-sm text-muted-foreground">
                      {contribution.event}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {contribution.conference}{contribution.year && `, ${contribution.year}`}
                    </p>
                    {contribution.location && (
                      <p className="text-sm text-muted-foreground">
                        {contribution.location}
                      </p>
                    )}
                  </li>
                </BlurFade>
              ))}
            </ul>
          </BlurFade>
        </div>
      </section>
      <section id="professional-memberships">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 22}>
            <h2 className="text-xl font-bold">Professional Memberships</h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 23}>
            <ul className="list-disc list-inside">
              {DATA.professionalMemberships.map((membership, id) => (
                <li key={id} className="text-sm text-muted-foreground">{membership}</li>
              ))}
            </ul>
          </BlurFade>
        </div>
      </section>
      <section id="volunteering">
        <div className="space-y-12 w-full py-12">
          <BlurFade delay={BLUR_FADE_DELAY * 25}>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                  Volunteering
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Making a Difference
                </h2>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Engaging with the community and giving back through volunteer work.
                </p>
              </div>
            </div>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 26}>
            <ul className="mb-4 ml-4 divide-y divide-dashed border-l">
              {DATA.volunteering.map((volunteer, id) => (
                <BlurFade key={volunteer.organization} delay={BLUR_FADE_DELAY * 27 + id * 0.05}>
                  <li className="relative pl-6 py-4">
                    <div className="absolute left-0 top-4 -ml-[5px] h-[10px] w-[10px] rounded-full bg-foreground"></div>
                    <h3 className="font-semibold">{volunteer.organization}</h3>
                    <p className="text-sm text-muted-foreground">{volunteer.role} | {volunteer.period}</p>
                    <p className="text-sm">{volunteer.description}</p>
                  </li>
                </BlurFade>
              ))}
            </ul>
          </BlurFade>
        </div>
      </section>
      <section id="awards">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 26}>
            <h2 className="text-xl font-bold">Awards</h2>
          </BlurFade>
          {DATA.awards.map((award, id) => (
            <BlurFade key={award.title} delay={BLUR_FADE_DELAY * 27 + id * 0.05}>
              <div className="p-2 rounded hover:bg-muted">
                <h3 className="font-semibold">{award.title}</h3>
                <p className="text-sm text-muted-foreground">{award.organization} | {award.year}</p>
              </div>
            </BlurFade>
          ))}
        </div>
      </section>
      <section id="hobbies">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 28}>
            <h2 className="text-xl font-bold">Current Hobbies and Interests</h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 29}>
            <div className="flex flex-wrap gap-2">
              {DATA.hobbies.map((hobby, id) => (
                <Badge key={id} variant="secondary">{hobby}</Badge>
              ))}
            </div>
          </BlurFade>
        </div>
      </section>
      <section id="projects">
        <div className="space-y-12 w-full py-12">
          <BlurFade delay={BLUR_FADE_DELAY * 13}>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                  Projects
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  I like working on open source projects
                </h2>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Here are some of my works. 
                </p>
              </div>
            </div>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 14}>
            <ul className="mb-4 ml-4 divide-y divide-dashed border-l">
              {DATA.hackathons.map((project, id) => (
                <BlurFade
                  key={project.title + project.dates}
                  delay={BLUR_FADE_DELAY * 15 + id * 0.05}
                >
                  <HackathonCard
                    title={project.title}
                    description={project.description}
                    location={project.location}
                    dates={project.dates}
                    image={project.image}
                    links={project.links}
                  />
                </BlurFade>
              ))}
            </ul>
          </BlurFade>
        </div>
      </section>
      <section id="mentoring">
        <div className="space-y-12 w-full py-12">
          <BlurFade delay={BLUR_FADE_DELAY * 30}>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                  Mentoring
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Guiding the Next Generation
                </h2>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  My efforts in mentoring and supporting future professionals.
                </p>
              </div>
            </div>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 31}>
            <ul className="mb-4 ml-4 divide-y divide-dashed border-l">
              {DATA.mentoring.map((mentorship, index) => (
                <BlurFade key={index} delay={BLUR_FADE_DELAY * 32 + index * 0.05}>
                  <li className="relative pl-6 py-4">
                    <div className="absolute left-0 top-4 -ml-[5px] h-[10px] w-[10px] rounded-full bg-foreground"></div>
                    <h3 className="font-semibold">{mentorship.role} at {mentorship.organization}</h3>
                    <p className="text-sm text-muted-foreground">
                      {mentorship.period}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {mentorship.description}
                    </p>
                  </li>
                </BlurFade>
              ))}
            </ul>
          </BlurFade>
        </div>
      </section>
      <section id="contact">
        <div className="grid items-center justify-center gap-4 px-4 text-center md:px-6 w-full py-12">
          <BlurFade delay={BLUR_FADE_DELAY * 16}>
            <div className="space-y-3">
              <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                Contact
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Get in Touch
              </h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Want to chat? Message me{" "}
                <Link
                  href={DATA.contact.social.Bluesky.url}
                  className="text-blue-500 hover:underline"
                >
                  on Bluesky
                </Link>{" "} or {" "}
                <Link href={`mailto:${DATA.contact.email}`} className="text-blue-500 hover:underline">
                   email me.
                </Link>
              </p>
            </div>
          </BlurFade>
        </div>
      </section>
    </main>
  );
}
