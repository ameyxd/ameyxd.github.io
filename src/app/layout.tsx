import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/TopNavbar";
import { DATA } from "@/data/resume";
import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";
import { Icons } from "@/components/icons";
import { ThemeProvider } from "@/components/theme-provider";
import { siteConfig } from "@/config/site";
import { Dock, DockIcon } from "@/components/magicui/dock";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="min-h-screen w-full mb-32">
            {children}
          </main>
          
          {/* Site Footer */}
          <div className="w-full border-t py-8 mb-24 bg-background/50">
            <div className="container-wide flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
              <span className="italic">{siteConfig.personalquote}</span>
              <div className="flex flex-col md:flex-row gap-2">
                <span>© {new Date().getFullYear()} {siteConfig.name}</span>
                <div className="flex items-center gap-2">
                  <div className="size-2 rounded-full bg-emerald-500 animate-pulse [animation-duration:1s]" />
                  <span>{DATA.location}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Links */}
          <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 mx-auto mb-4 flex origin-bottom h-full max-h-14">
            <Dock className="z-50 pointer-events-auto relative mx-auto flex min-h-full h-full items-center px-1 bg-background/80 backdrop-blur-lg [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]">
              {DATA.navbar.map((item) => (
                <DockIcon key={item.href}>
                  <Link
                    href={item.href}
                    className="size-12 flex items-center justify-center"
                  >
                    <item.icon className="size-4" />
                  </Link>
                </DockIcon>
              ))}
              {Object.entries(DATA.contact.social)
                .filter(([_, data]) => data.navbar)
                .map(([platform, data]) => (
                  <DockIcon key={platform}>
                    <a
                      href={data.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="size-12 flex items-center justify-center"
                    >
                      <data.icon className="size-5" />
                    </a>
                  </DockIcon>
                ))}
              <DockIcon>
                <ModeToggle className="size-12 flex items-center justify-center" />
              </DockIcon>
            </Dock>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
