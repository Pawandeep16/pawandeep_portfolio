"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, ExternalLink, Github, Lock } from "lucide-react";
import { client, PROJECTS_QUERY } from "@/lib/sanity";
import { fallbackProjects } from "@/lib/fallback-data";
import { driverCheckInProject } from "@/lib/featured-projects";
import type { Project } from "@/lib/types";
import { cn, isSpecificGithubRepo, slugify, visibleTags } from "@/lib/utils";
import { Reveal, SectionHeading } from "@/components/ui";
import { PlaceholderMockup, ProjectVisual } from "@/components/project-visual";

type Category = "all" | "logistics" | "software" | "design";
const FILTERS: { id: Category; label: string }[] = [
  { id: "all", label: "All work" },
  { id: "logistics", label: "Logistics & Operations" },
  { id: "software", label: "Software & Data" },
  { id: "design", label: "Design" },
];

function categoryOf(p: Project): Exclude<Category, "all"> {
  // Category comes from the Sanity project document when set; the title
  // heuristic below is only a fallback for older documents.
  if (p.category === "logistics" || p.category === "software" || p.category === "design") return p.category;
  if (p._id === "local-driver-check-in") return "logistics";
  if (/portfolio/i.test(p.title)) return "design";
  return "software";
}

export function Projects() {
  const [projects, setProjects] = useState<Project[]>(fallbackProjects);
  const [filter, setFilter] = useState<Category>("all");
  // Hero dual-track toggle (Logistics / Web) drives this filter.
  useEffect(() => {
    const onTrack = (e: Event) => {
      const cat = (e as CustomEvent<string>).detail;
      if (cat === "logistics" || cat === "software") setFilter(cat);
    };
    window.addEventListener("portfolio:track", onTrack);
    return () => window.removeEventListener("portfolio:track", onTrack);
  }, []);
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const data = await client.fetch(PROJECTS_QUERY);
        if (alive && Array.isArray(data) && data.length) setProjects(data);
      } catch { /* snapshot stays */ }
    })();
    return () => { alive = false; };
  }, []);

  const all = useMemo(() => [driverCheckInProject as Project, ...projects], [projects]);
  const shown = useMemo(() => (filter === "all" ? all : all.filter((p) => categoryOf(p) === filter)), [all, filter]);

  return (
    <section id="projects" className="scroll-mt-24 py-28 sm:py-40" aria-label="Featured projects">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Chapter IV — Projects" title="Work I'm proud to show." accent="proud" marker="PROJECTS"
          intro="The dispatch system leads. The rest are shipped projects with live demos." />

        <Reveal className="mt-10 flex flex-wrap gap-2" >
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects">
            {FILTERS.map((f) => (
              <button key={f.id} type="button" onClick={() => setFilter(f.id)} aria-pressed={filter === f.id}
                className={filter === f.id ? "rounded-full bg-zinc-900 px-4 py-2 text-sm font-semibold text-white dark:bg-white dark:text-zinc-900" : "rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-600 transition hover:border-zinc-400 hover:text-zinc-900 dark:border-white/15 dark:text-zinc-300 dark:hover:text-white"}>
                {f.label}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-8 space-y-5">
          {shown.map((p, i) => {
            const slug = slugify(p.title);
            const isDriver = p._id === "local-driver-check-in";
            const repo = isSpecificGithubRepo(p.githubUrl) ? p.githubUrl : undefined;
            // Horizontal cards: visual left, content right. The featured
            // build keeps its dark tile; the rest are light cards.
            const dark = isDriver;
            const achievements = isDriver ? driverCheckInProject.caseStudy.features.slice(0, 3) : [];
            return (
              <Reveal key={p._id} delay={0.04 * Math.min(i, 5)}>
                <article className={cn("group flex flex-col overflow-hidden rounded-[1.5rem] transition hover:-translate-y-1 md:flex-row", dark ? "bg-zinc-950 text-white shadow-2xl shadow-zinc-900/20 dark:border dark:border-white/10" : "card-surface")}>
                  {isDriver ? (
                    <div className="flex shrink-0 flex-col justify-center p-6 pb-0 sm:p-7 sm:pb-0 md:w-[38%] md:p-7 md:pb-7 md:pr-0"><PlaceholderMockup title={p.title} label="Featured build — diagram, not a screenshot" /></div>
                  ) : (
                    <div className="flex shrink-0 flex-col justify-center p-6 pb-0 sm:p-7 sm:pb-0 md:w-[38%] md:p-7 md:pb-7 md:pr-0"><ProjectVisual project={p} /></div>
                  )}
                  <div className="flex flex-1 flex-col p-6 sm:p-7">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="eyebrow !text-[11px]">{isDriver ? "Featured · Internal production system" : p.featured ? "Featured project" : "Project"}</p>
                        <h3 className={cn("mt-2 font-semibold leading-snug", isDriver ? "text-2xl sm:text-3xl" : "text-xl")}>
                          <Link href={`/projects/${isDriver ? "driver-check-in-dispatch-system" : slug}`} className={dark ? "text-white hover:text-amber-400" : "text-zinc-900 hover:text-amber-600 dark:text-white dark:hover:text-amber-400"}>{p.title}</Link>
                        </h3>
                      </div>
                      {isDriver && <span className="chip shrink-0"><Lock className="h-3 w-3" /> No public demo</span>}
                    </div>
                    <p className={cn("mt-3 text-sm leading-relaxed sm:text-base", isDriver ? "line-clamp-3" : "line-clamp-2", dark ? "text-zinc-400" : "text-zinc-600 dark:text-zinc-400")}>{p.description}</p>
                    {achievements.length > 0 && (
                      <ul className="mt-4 space-y-1.5">
                        {achievements.map((a) => (
                          <li key={a} className="flex gap-2 text-sm text-zinc-300"><span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />{a}</li>
                        ))}
                      </ul>
                    )}
                    <ul className="mt-4 flex flex-wrap gap-2" aria-label="Technology stack">
                      {visibleTags(p.tags).slice(0, 5).map((t) => <li key={t} className="chip">{t}</li>)}
                    </ul>
                    <div className={cn("mt-6 flex flex-wrap items-center gap-3 border-t pt-5", dark ? "border-white/10" : "border-zinc-200 dark:border-white/10")}>
                      <Link href={`/projects/${isDriver ? "driver-check-in-dispatch-system" : slug}`} className={cn("inline-flex items-center gap-1.5 text-sm font-semibold hover:underline", dark ? "text-amber-400" : "text-amber-600 dark:text-amber-400")}>
                        Case study <ArrowRight className="h-4 w-4" />
                      </Link>
                      {p.liveUrl && (
                        <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className={cn("inline-flex items-center gap-1.5 text-sm font-medium", dark ? "text-zinc-400 hover:text-white" : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white")}>
                          <ExternalLink className="h-4 w-4" /> Live demo
                        </a>
                      )}
                      {repo && (
                        <a href={repo} target="_blank" rel="noopener noreferrer" className={cn("inline-flex items-center gap-1.5 text-sm font-medium", dark ? "text-zinc-400 hover:text-white" : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white")}>
                          <Github className="h-4 w-4" /> Code
                        </a>
                      )}
                      {p.githubUrl && !repo && (
                        <a href="https://github.com/Pawandeep16" target="_blank" rel="noopener noreferrer" className={cn("inline-flex items-center gap-1.5 text-sm font-medium", dark ? "text-zinc-400 hover:text-white" : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white")}>
                          <Github className="h-4 w-4" /> GitHub profile <ArrowUpRight className="h-3.5 w-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
        {shown.length === 0 && <p className="mt-8 text-center text-sm text-zinc-500">No projects in this category yet.</p>}
      </div>
    </section>
  );
}
