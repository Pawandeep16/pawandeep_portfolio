"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import {
  fallbackEducation,
  fallbackExperience,
  fallbackProjects,
  fallbackSkills,
} from "@/lib/fallback-data";
import { driverCheckInProject, FEATURED_LOCAL_SLUG } from "@/lib/featured-projects";
import { cleanTitle } from "@/lib/site-search";
import { slugify } from "@/lib/utils";

export type MegaMenuId = "projects" | "skills" | "experience";

export interface MegaLink {
  title: string;
  desc?: string;
  href: string;
  /** Section anchors need the cross-page handler; project pages use Link. */
  section?: boolean;
}

export interface MegaColumn {
  heading: string;
  links: MegaLink[];
}

export interface MegaMenu {
  columns: MegaColumn[];
  footer: MegaLink[];
}

const projectHref = (title: string) => `/projects/${slugify(title)}`;

export const MEGA_MENUS: Record<MegaMenuId, MegaMenu> = {
  projects: {
    columns: [
      {
        heading: "Featured work",
        links: [
          {
            title: driverCheckInProject.title,
            desc: "Warehouse driver check-in, dispatch and a live serving board — in production at GoBolt.",
            href: `/projects/${FEATURED_LOCAL_SLUG}`,
          },
          ...fallbackProjects.slice(0, 2).map((p) => ({
            title: p.title,
            desc: p.description.length > 90 ? `${p.description.slice(0, 87)}…` : p.description,
            href: projectHref(p.title),
          })),
        ],
      },
      {
        heading: "More projects",
        links: fallbackProjects.slice(2).map((p) => ({
          title: p.title,
          desc: (p.tags ?? []).slice(0, 3).join(" · "),
          href: projectHref(p.title),
        })),
      },
    ],
    footer: [
      { title: "View all projects", href: "/#projects", section: true },
      { title: "Open the gallery", href: "/#gallery", section: true },
    ],
  },
  skills: {
    columns: [
      {
        heading: "Build",
        links: fallbackSkills.slice(0, 3).map((c) => ({
          title: cleanTitle(c.title),
          desc: c.skills.slice(0, 3).map((s) => s.name).join(" · "),
          href: "/#skills",
          section: true,
        })),
      },
      {
        heading: "Design & lead",
        links: fallbackSkills.slice(3).map((c) => ({
          title: cleanTitle(c.title),
          desc: c.skills.slice(0, 3).map((s) => s.name).join(" · "),
          href: "/#skills",
          section: true,
        })),
      },
    ],
    footer: [{ title: "See all skills", href: "/#skills", section: true }],
  },
  experience: {
    columns: [
      {
        heading: "Where I've worked",
        links: fallbackExperience.map((e) => ({
          title: e.company,
          desc: e.title.trim(),
          href: "/#experience",
          section: true,
        })),
      },
      {
        heading: "Education",
        links: fallbackEducation.map((e) => ({
          title: e.institution,
          desc: e.degree,
          href: "/#education",
          section: true,
        })),
      },
    ],
    footer: [
      { title: "See experience", href: "/#experience", section: true },
      { title: "See education", href: "/#education", section: true },
    ],
  },
};

interface MegaMenuPanelProps {
  id: MegaMenuId;
  onSection: (hash: string) => void;
  onClose: () => void;
}

/**
 * Apple-style mega menu: full-width panel under the nav bar, columns of
 * grouped links, footer row of "view all" links. Opens on hover/focus,
 * closes on Escape, backdrop click, or leaving the area.
 */
export function MegaMenuPanel({ id, onSection, onClose }: MegaMenuPanelProps) {
  const reduce = useReducedMotion();
  const menu = MEGA_MENUS[id];

  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
      animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
      exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
      transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
      className="glass absolute inset-x-0 top-full hidden border-b border-white/50 dark:border-white/10 lg:block"
      role="menu"
      aria-label={`${id} menu`}
    >
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2">
          {menu.columns.map((col) => (
            <div key={col.heading}>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
                {col.heading}
              </p>
              <ul className="mt-4 space-y-4">
                {col.links.map((link) =>
                  link.section ? (
                    <li key={link.title}>
                      <a
                        href={link.href}
                        onClick={(e) => {
                          e.preventDefault();
                          onSection(link.href.replace("/", ""));
                          onClose();
                        }}
                        className="group block rounded-xl px-2 py-1 -mx-2 transition hover:bg-zinc-100 dark:hover:bg-white/5"
                      >
                        <span className="block text-[15px] font-semibold text-zinc-900 group-hover:text-amber-700 dark:text-white dark:group-hover:text-amber-400">
                          {link.title}
                        </span>
                        {link.desc && (
                          <span className="mt-0.5 block text-sm leading-snug text-zinc-500 dark:text-zinc-400">
                            {link.desc}
                          </span>
                        )}
                      </a>
                    </li>
                  ) : (
                    <li key={link.title}>
                      <Link
                        href={link.href}
                        onClick={onClose}
                        className="group block rounded-xl px-2 py-1 -mx-2 transition hover:bg-zinc-100 dark:hover:bg-white/5"
                      >
                        <span className="block text-[15px] font-semibold text-zinc-900 group-hover:text-amber-700 dark:text-white dark:group-hover:text-amber-400">
                          {link.title}
                        </span>
                        {link.desc && (
                          <span className="mt-0.5 block text-sm leading-snug text-zinc-500 dark:text-zinc-400">
                            {link.desc}
                          </span>
                        )}
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 border-t border-zinc-200/70 pt-5 dark:border-white/10">
          {menu.footer.map((link) =>
            link.section ? (
              <a
                key={link.title}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  onSection(link.href.replace("/", ""));
                  onClose();
                }}
                className="inline-flex items-center gap-1 text-sm font-semibold text-amber-700 hover:underline dark:text-amber-400"
              >
                {link.title} <ArrowRight className="h-4 w-4" />
              </a>
            ) : (
              <Link
                key={link.title}
                href={link.href}
                onClick={onClose}
                className="inline-flex items-center gap-1 text-sm font-semibold text-amber-700 hover:underline dark:text-amber-400"
              >
                {link.title} <ArrowRight className="h-4 w-4" />
              </Link>
            ),
          )}
        </div>
      </div>
    </motion.div>
  );
}
