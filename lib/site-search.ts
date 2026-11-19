// Site search index — built from the same fallback data the sections
// render, so search results always match real portfolio content. No
// placeholder entries: every result links to a real section or case study.
import {
  fallbackEducation,
  fallbackExperience,
  fallbackProjects,
  fallbackSkills,
} from "./fallback-data";
import { driverCheckInProject, FEATURED_LOCAL_SLUG } from "./featured-projects";
import { slugify } from "./utils";

export type SearchKind = "Section" | "Project" | "Skill" | "Experience";

export interface SearchEntry {
  id: string;
  title: string;
  kind: SearchKind;
  description: string;
  href: string;
  keywords: string;
}

/** Strip emoji / stray punctuation from CMS titles for display + matching. */
export function cleanTitle(title: string): string {
  return title
    .replace(/[^\p{L}\p{N}&\-/ ]/gu, "")
    .replace(/\s+/g, " ")
    .trim();
}

const SECTIONS: SearchEntry[] = [
  { id: "about", title: "About", kind: "Section", description: "Background, approach and what I do", href: "/#about", keywords: "bio background story who am i" },
  { id: "skills", title: "Skills", kind: "Section", description: "Frontend, backend, design, AI and automation", href: "/#skills", keywords: "stack technologies tools frontend backend design" },
  { id: "experience", title: "Experience", kind: "Section", description: "GoBolt, Obsidian Glass and Catalyst", href: "/#experience", keywords: "work history jobs career team lead developer" },
  { id: "education", title: "Study", kind: "Section", description: "Loyalist College and B.Tech", href: "/#education", keywords: "education degree college university loyalist" },
  { id: "projects", title: "Projects", kind: "Section", description: "Featured work and case studies", href: "/#projects", keywords: "work portfolio case studies apps" },
  { id: "gallery", title: "Gallery", kind: "Section", description: "Artwork and design gallery", href: "/#gallery", keywords: "art artwork design gallery chapters" },
  { id: "certifications", title: "Certifications", kind: "Section", description: "Certificates and credentials", href: "/#certifications", keywords: "certificates credentials" },
  { id: "testimonials", title: "Testimonials", kind: "Section", description: "What people say about working with me", href: "/#testimonials", keywords: "reviews recommendations feedback" },
  { id: "contact", title: "Contact", kind: "Section", description: "Email, LinkedIn, GitHub and the contact form", href: "/#contact", keywords: "email hire me linkedin github message" },
];

const PROJECTS: SearchEntry[] = [
  {
    id: "driver-check-in",
    title: driverCheckInProject.title,
    kind: "Project",
    description: "Google Apps Script system for warehouse driver check-in, dispatch and a live serving board — in production at GoBolt.",
    href: `/projects/${FEATURED_LOCAL_SLUG}`,
    keywords: (driverCheckInProject.tags ?? []).join(" "),
  },
  ...fallbackProjects.map((p) => ({
    id: `project-${slugify(p.title)}`,
    title: p.title,
    kind: "Project" as const,
    description: p.description.length > 120 ? `${p.description.slice(0, 117)}…` : p.description,
    href: `/projects/${slugify(p.title)}`,
    keywords: (p.tags ?? []).join(" "),
  })),
];

const SKILLS: SearchEntry[] = fallbackSkills.map((c) => ({
  id: `skill-${slugify(cleanTitle(c.title))}`,
  title: cleanTitle(c.title),
  kind: "Skill" as const,
  description: c.skills.slice(0, 4).map((s) => s.name).join(" · "),
  href: "/#skills",
  keywords: c.skills.map((s) => s.name).join(" "),
}));

const EXPERIENCE: SearchEntry[] = fallbackExperience.map((e) => ({
  id: `exp-${slugify(e.company)}`,
  title: e.company,
  kind: "Experience" as const,
  description: e.title.trim(),
  href: "/#experience",
  keywords: `${e.company} ${e.title} ${(e.technologies ?? []).slice(0, 6).join(" ")}`,
}));

const EDUCATION: SearchEntry[] = fallbackEducation.map((e) => ({
  id: `edu-${slugify(e.institution)}`,
  title: e.institution,
  kind: "Experience" as const,
  description: e.degree,
  href: "/#education",
  keywords: `${e.institution} ${e.degree}`,
}));

export const SEARCH_INDEX: SearchEntry[] = [
  ...SECTIONS,
  ...PROJECTS,
  ...SKILLS,
  ...EXPERIENCE,
  ...EDUCATION,
];

export function searchSite(query: string, limit = 8): SearchEntry[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return SEARCH_INDEX.map((entry) => {
    const title = entry.title.toLowerCase();
    const keywords = entry.keywords.toLowerCase();
    const description = entry.description.toLowerCase();
    let score = 0;
    if (title.startsWith(q)) score += 5;
    else if (title.includes(q)) score += 3;
    else if (keywords.includes(q)) score += 2;
    else if (description.includes(q)) score += 1;
    return { entry, score };
  })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.entry);
}

/** Shown when the overlay opens with an empty query — the most-visited spots. */
export const QUICK_LINKS: SearchEntry[] = [
  PROJECTS[0],
  SECTIONS.find((s) => s.id === "projects")!,
  SECTIONS.find((s) => s.id === "skills")!,
  SECTIONS.find((s) => s.id === "experience")!,
  SECTIONS.find((s) => s.id === "contact")!,
];
