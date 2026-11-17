"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, ExternalLink, Github, Lock } from "lucide-react";
import { client, PROJECTS_QUERY } from "@/lib/sanity";
import { fallbackProjects } from "@/lib/fallback-data";
import { driverCheckInProject, FEATURED_LOCAL_SLUG } from "@/lib/featured-projects";
import type { Project } from "@/lib/types";
import { isSpecificGithubRepo, slugify, visibleTags } from "@/lib/utils";
import { PlaceholderMockup, ProjectVisual } from "@/components/project-visual";
import Image from "next/image";
import { DispatchJourney } from "@/components/dispatch-journey";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

function CaseSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="card-surface p-6 sm:p-7">
      <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">{title}</h2>
      <div className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{children}</div>
    </section>
  );
}

function initialProject(slug: string): Project | null {
  // Render the last-known Sanity snapshot immediately (so the case study is
  // in the server-rendered HTML); the Sanity fetch below updates it.
  if (slug === FEATURED_LOCAL_SLUG) return driverCheckInProject as Project;
  return fallbackProjects.find((p) => slugify(p.title) === slug) ?? null;
}

export function CaseStudyClient({ slug }: { slug: string }) {
  const [project, setProject] = useState<Project | null>(() => initialProject(slug));
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const data: Project[] = await client.fetch(PROJECTS_QUERY);
        const list = Array.isArray(data) && data.length ? data : fallbackProjects;
        if (!alive) return;
        if (slug === FEATURED_LOCAL_SLUG) { setProject(driverCheckInProject as Project); return; }
        const found = list.find((p) => slugify(p.title) === slug);
        if (found) setProject(found);
        else setNotFound(true);
      } catch {
        if (!alive) return;
        if (slug === FEATURED_LOCAL_SLUG) { setProject(driverCheckInProject as Project); return; }
        const found = fallbackProjects.find((p) => slugify(p.title) === slug);
        if (found) setProject(found);
        else setNotFound(true);
      }
    })();
    return () => { alive = false; };
  }, [slug]);

  if (notFound) {
    return (<><Header /><main className="mx-auto max-w-3xl px-4 pb-24 pt-32 text-center"><h1 className="text-3xl font-bold text-zinc-900 dark:text-white">Project not found</h1><p className="mt-3 text-zinc-600 dark:text-zinc-400">That project isn&apos;t here — check the link or browse all projects.</p><Link href="/#projects" className="btn-primary mt-8 inline-flex"><ArrowLeft className="h-4 w-4" /> Back to projects</Link></main><Footer /></>);
  }
  if (!project) {
    return (<><Header /><main className="grid min-h-screen place-items-center"><div className="text-center"><div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-amber-600 border-t-transparent" /><p className="mt-4 text-sm text-zinc-500">Loading case study…</p></div></main><Footer /></>);
  }

  const isDriver = project._id === "local-driver-check-in";
  const repo = isSpecificGithubRepo(project.githubUrl) ? project.githubUrl : undefined;
  // Case-study detail: from the Sanity project fields when filled in
  // (problem / solution / features / contribution / challenges), falling
  // back to the local Driver Check-in write-up for that project.
  const cs = isDriver
    ? {
        problem: project.problem ?? driverCheckInProject.caseStudy.problem,
        solution: project.solution ?? driverCheckInProject.caseStudy.solution,
        features: project.features?.length ? project.features : driverCheckInProject.caseStudy.features,
        contribution: project.contribution ?? driverCheckInProject.caseStudy.contribution,
        challenges: project.challenges?.length ? project.challenges : driverCheckInProject.caseStudy.challenges,
      }
    : project.problem
      ? {
          problem: project.problem,
          solution: project.solution ?? "",
          features: project.features ?? [],
          contribution: project.contribution ?? "",
          challenges: project.challenges ?? [],
        }
      : null;

  return (
    <>
      <Header />
      <main className="mx-auto max-w-5xl px-4 pb-24 pt-28 sm:px-6 lg:px-8">
        <Link href="/#projects" className="inline-flex items-center gap-2 text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"><ArrowLeft className="h-4 w-4" /> All projects</Link>
        <p className="eyebrow mt-8">{isDriver ? "Featured · Internal production system" : "Case study"}</p>
        <h1 className="mt-3 text-4xl font-bold leading-[1.05] tracking-tight text-zinc-900 dark:text-white sm:text-5xl">{project.title}</h1>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">{project.description}</p>
        <ul className="mt-6 flex flex-wrap gap-2" aria-label="Technology stack">
          {visibleTags(project.tags).map((t) => <li key={t} className="chip">{t}</li>)}
        </ul>
        <div className="mt-6 flex flex-wrap gap-3">
          {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-primary !px-5 !py-2.5"><ExternalLink className="h-4 w-4" /> Live demo</a>}
          {repo && <a href={repo} target="_blank" rel="noopener noreferrer" className="btn-ghost !px-5 !py-2.5"><Github className="h-4 w-4" /> View code</a>}
          {isDriver && <span className="chip !py-2.5"><Lock className="h-3.5 w-3.5" /> Internal production system — no public demo</span>}
          {!repo && project.githubUrl && <a href="https://github.com/Pawandeep16" target="_blank" rel="noopener noreferrer" className="btn-ghost !px-5 !py-2.5"><Github className="h-4 w-4" /> GitHub profile <ArrowUpRight className="h-3.5 w-3.5" /></a>}
        </div>

        {isDriver && (
          <figure className="mt-10 overflow-hidden rounded-2xl border border-stone-200/80 dark:border-white/10">
            <Image src="/assets/route-map.svg" alt="Stylised route map — warehouse to destination, Check-in to Delivered" width={640} height={360} className="h-auto w-full" />
            <figcaption className="bg-white px-5 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-stone-500 dark:bg-white/[0.03] dark:text-stone-400">The route the system runs — warehouse to delivered</figcaption>
          </figure>
        )}
        <div className="mt-10">
          {isDriver ? <DispatchJourney compact stages={project.journey?.length ? project.journey : driverCheckInProject.journey} /> : project.image ? <ProjectVisual project={project} /> : <PlaceholderMockup title={project.title} />}
        </div>

        <div className="mt-8 grid gap-5">
          {cs ? (
            <>
              <CaseSection title="Problem"><p>{cs.problem}</p></CaseSection>
              {cs.solution ? <CaseSection title="Solution"><p>{cs.solution}</p></CaseSection> : null}
              {cs.features.length ? (
                <CaseSection title="Key features">
                  <ul className="space-y-2">{cs.features.map((f) => <li key={f} className="flex gap-2"><span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />{f}</li>)}</ul>
                </CaseSection>
              ) : null}
              {cs.contribution ? <CaseSection title="My contribution"><p>{cs.contribution}</p></CaseSection> : null}
              {cs.challenges.length ? (
                <CaseSection title="Challenges & technical decisions">
                  <ul className="space-y-2">{cs.challenges.map((c) => <li key={c} className="flex gap-2"><span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500" />{c}</li>)}</ul>
                </CaseSection>
              ) : null}
            </>
          ) : (
            <>
              <CaseSection title="What it does"><p>{project.description}</p></CaseSection>
              <CaseSection title="A note on detail">
                <p>Full write-up coming soon — the short description and links above are the project as shipped.</p>
              </CaseSection>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
