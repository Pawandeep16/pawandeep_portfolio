import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Download, Github, Linkedin, Mail } from "lucide-react";
import { fallbackHero, fallbackSocialLinks } from "@/lib/fallback-data";
import { DisplayHeading } from "@/components/display-heading";
import { IconLink } from "@/components/animated-icon";

const SOCIAL_ICONS: Record<string, typeof Github> = { GitHub: Github, LinkedIn: Linkedin };

export function Footer() {
  const socials = fallbackSocialLinks.length ? fallbackSocialLinks : [];
  return (
    <footer className="border-t border-stone-200 dark:border-white/10">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* v14: footer sign-off in Anton with the small-word device — same words. */}
        <DisplayHeading text="Let's build something that works." accent="works." chapter="11 — Say hello" marker="HELLO" size="clamp(2.6rem, 6vw, 4.5rem)" className="max-w-3xl" />
        <p className="mt-5 max-w-md leading-relaxed text-stone-600 dark:text-stone-400">
          Full-stack development, design, and warehouse operations — from Mississauga, Ontario.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#contact" className="btn-primary">Hire me <ArrowUpRight className="h-4 w-4" /></a>
          <a href="/resume.pdf" download className="btn-ghost"><Download className="h-4 w-4" /> Download resume</a>
          <a href={`mailto:${fallbackHero.email}`} className="btn-ghost"><Mail className="h-4 w-4" /> {fallbackHero.email}</a>
        </div>

        <div className="hairline mt-16 grid gap-10 pt-10 md:grid-cols-[1fr_auto_auto]">
          <div>
            <p className="flex items-center gap-3">
              <Image src="/assets/portrait.jpg" alt="" width={80} height={80} className="h-10 w-10 rounded-full object-cover ring-1 ring-black/10 dark:ring-white/20" aria-hidden="true" />
              <span className="font-display text-lg text-stone-900 dark:text-white">Pawandeep Singh Thandi</span>
            </p>
            <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.2em] text-stone-500 dark:text-stone-400">Developer · Designer · Ops</p>
          </div>
          <nav aria-label="Footer">
            <p className="eyebrow">Explore</p>
            <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm">
              {[["About", "#about"], ["Skills", "#skills"], ["Experience", "#experience"], ["Study", "#education"], ["Projects", "#projects"], ["Gallery", "#gallery"], ["Contact", "#contact"]].map(([label, href]) => (
                <li key={href}><Link href={href} className="text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-white">{label}</Link></li>
              ))}
            </ul>
          </nav>
          <div>
            <p className="eyebrow">Elsewhere</p>
            <div className="mt-4 flex gap-2">
              {socials.map((s) => {
                const Icon = SOCIAL_ICONS[s.name] ?? Github;
                return (
                  <IconLink key={s._id} href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.name}
                    className="grid h-10 w-10 place-items-center rounded-full border border-stone-200 text-stone-600 transition hover:border-amber-500 hover:text-amber-600 dark:border-white/10 dark:text-stone-300 dark:hover:border-amber-400 dark:hover:text-amber-400">
                    <Icon className="h-4 w-4" />
                  </IconLink>
                );
              })}
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-2 border-t border-stone-200 pt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-stone-500 dark:border-white/10 dark:text-stone-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Pawandeep Singh Thandi · Mississauga, Ontario</p>
          <p>Designed &amp; built by hand</p>
        </div>
      </div>
    </footer>
  );
}
