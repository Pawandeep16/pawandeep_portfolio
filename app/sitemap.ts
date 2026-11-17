import type { MetadataRoute } from "next";
import { fallbackProjects } from "@/lib/fallback-data";
import { FEATURED_LOCAL_SLUG } from "@/lib/featured-projects";
import { slugify } from "@/lib/utils";

const base = "https://pawandeep-portfolio.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const projects = [FEATURED_LOCAL_SLUG, ...fallbackProjects.map((p) => slugify(p.title))];
  return [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/studio`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.3 },
    ...projects.map((slug) => ({
      url: `${base}/projects/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
