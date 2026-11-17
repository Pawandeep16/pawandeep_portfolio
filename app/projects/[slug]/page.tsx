import type { Metadata } from "next";
import { fallbackProjects } from "@/lib/fallback-data";
import { FEATURED_LOCAL_SLUG, driverCheckInProject } from "@/lib/featured-projects";
import { slugify } from "@/lib/utils";
import { CaseStudyClient } from "@/components/case-study-client";

export function generateStaticParams() {
  return [
    { slug: FEATURED_LOCAL_SLUG },
    ...fallbackProjects.map((p) => ({ slug: slugify(p.title) })),
  ];
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const all = [driverCheckInProject, ...fallbackProjects];
  const found = all.find((p) => slugify(p.title) === params.slug || params.slug === FEATURED_LOCAL_SLUG);
  const title = found ? found.title : "Project";
  return { title, description: found?.description ?? "A project by Pawandeep Singh Thandi." };
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  return <CaseStudyClient slug={params.slug} />;
}
