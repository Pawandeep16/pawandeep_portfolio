import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 80);
}

export function formatDate(value?: string | null): string {
  if (!value) return "Present";
  const d = new Date(value.length === 4 ? `${value}-01-01` : value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString("en-CA", { month: "short", year: "numeric", timeZone: "UTC" });
}

/** Only treat a GitHub URL as a repo link when it points at a specific repo, not the profile. */
export function isSpecificGithubRepo(url?: string | null): boolean {
  if (!url) return false;
  try {
    const u = new URL(url);
    return u.hostname === "github.com" && u.pathname.split("/").filter(Boolean).length >= 2;
  } catch {
    return false;
  }
}

/** Hide CMS housekeeping tags from the visitor UI (e.g. a "Sanity Studio" tag
 *  that arrived with the CMS data). The data layer is unchanged. */
const HIDDEN_TAGS = new Set(["sanity studio"]);
export function visibleTags(tags?: string[] | null): string[] {
  return (tags ?? []).map((t) => t.trim()).filter((t) => t && !HIDDEN_TAGS.has(t.toLowerCase()));
}
