import { DATA } from "@/data/resume";
import { siteConfig } from "@/config/site";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="w-full max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <section className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Get in Touch</h1>
        <p className="text-xl text-muted-foreground mb-12">
          Feel free to reach out through any of these channels. I'm always open to discussing new opportunities, collaborations, or just having a chat about technology.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Methods */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold mb-4">Contact Methods</h2>
            <div className="space-y-4">
              <a
                href={`mailto:${DATA.contact.email}`}
                className="flex items-center gap-3 p-4 rounded-xl bg-card/30 hover:bg-card/50 backdrop-blur-sm transition-colors"
              >
                <Icons.email className="h-5 w-5" />
                <span>{DATA.contact.email}</span>
              </a>
              
              {Object.entries(DATA.contact.social).map(([platform, data]) => (
                <a
                  key={platform}
                  href={data.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 rounded-xl bg-card/30 hover:bg-card/50 backdrop-blur-sm transition-colors"
                >
                  {data.icon && <data.icon className="h-5 w-5" />}
                  <span>{data.name}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Location & Availability */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold mb-4">Location</h2>
            <a
              href={DATA.locationLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-4 rounded-xl bg-card/30 hover:bg-card/50 backdrop-blur-sm transition-colors"
            >
              <p className="text-lg mb-2">{DATA.location}</p>
              <p className="text-muted-foreground">
                Open to remote opportunities worldwide
              </p>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
} 