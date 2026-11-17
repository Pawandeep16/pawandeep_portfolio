// ---------------------------------------------------------------------------
// Chapter configuration — v13 (Chapter design system, adapted from the
// reference site: layout, typography, colours, spacing and motion only —
// none of their copy). The 6 gallery walls become 6 chapters; each chapter gets a
// flat paper ground + accent from this palette. The 3D room config in
// lib/gallery-config.ts is kept on disk but no longer rendered.
// ---------------------------------------------------------------------------

import type { Artwork } from "@/lib/types";

export const CHAPTER_PAPER = "#f4f2ef";
export const CHAPTER_ACCENT = "#e8590c"; // warm dispatch amber — the site accent

export interface ChapterPalette {
  /** Accent ink (giant marker, labels, cover ground). */
  accent: string;
  /** Flat paper ground for the chapter section. */
  ground: string;
  /** Body ink on that ground. */
  ink: string;
}

export const CHAPTER_PALETTES: ChapterPalette[] = [
  { accent: "#b03a1c", ground: "#f5efe6", ink: "#2b2118" }, // 1 Digital Art — burnt orange/rust on warm cream
  { accent: "#3d435e", ground: "#d8dbe7", ink: "#23263a" }, // 2 Illustration & Print — dark navy on pale lavender-grey
  { accent: "#7d3b4a", ground: "#f1d3de", ink: "#33202a" }, // 3 Portraits & Photography — dusty mauve on pale pink
  { accent: "#39443f", ground: "#dbe2dc", ink: "#222b26" }, // 4 Illustration & Print Part 2 — dark slate-green on pale sage
  { accent: "#c05a2e", ground: "#f5efe6", ink: "#2b2118" }, // 5 Part 3 — terracotta on cream
  { accent: "#8a6d2f", ground: "#efe8d6", ink: "#2b2413" }, // 6 Part 4 — ochre/olive on pale sand
];

export const ROMAN = ["I", "II", "III", "IV", "V", "VI"] as const;

export interface ChapterWall {
  id: string;
  /** "chapter-1" … "chapter-6" — scroll targets. */
  anchorId: string;
  name: string;
  subtitle: string;
  /** Giant decorative marker word, e.g. "DIGITAL". */
  keyWord: string;
  items: Artwork[];
  startIndex: number;
  palette: ChapterPalette;
}

const WALL_SIZE = 6;
const GROUP_NAMES = ["Digital Art", "Illustration & Print", "Portraits & Photography"] as const;

function groupOf(a: Artwork): 0 | 1 | 2 {
  const cats = a.category ?? [];
  if (cats.includes("photography")) return 2;
  if (cats.includes("print-design") || cats.includes("illustration")) return 1;
  return 0;
}

/** Giant marker word: the chapter's key word; a repeat ("Part 2/3/4")
 *  uses the group's second word so every chapter's marker is distinct. */
function keyWordFor(group: 0 | 1 | 2, part: number): string {
  if (part <= 1) return group === 0 ? "DIGITAL" : group === 1 ? "ILLUSTRATION" : "PORTRAITS";
  return group === 0 ? "ART" : group === 1 ? "PRINT" : "PHOTOGRAPHY";
}

/** Order by category group, then chunk into walls of 6 — same grouping
 *  the v12 room used, so the 36 artworks keep their walls. */
export function buildChapterWalls(artworks: Artwork[]): ChapterWall[] {
  const ordered = [...artworks].sort(
    (a, b) => groupOf(a) - groupOf(b) || (a.order ?? 0) - (b.order ?? 0)
  );
  const seen = new Map<number, number>();
  const walls: ChapterWall[] = [];
  for (let i = 0; i < ordered.length; i += WALL_SIZE) {
    const items = ordered.slice(i, i + WALL_SIZE);
    const counts = [0, 0, 0];
    items.forEach((a) => counts[groupOf(a)]++);
    const group = counts.indexOf(Math.max(...counts)) as 0 | 1 | 2;
    const part = (seen.get(group) ?? 0) + 1;
    seen.set(group, part);
    const n = walls.length;
    walls.push({
      id: `wall-${n + 1}`,
      anchorId: `chapter-${n + 1}`,
      name: part > 1 ? `${GROUP_NAMES[group]} · Part ${part}` : GROUP_NAMES[group],
      subtitle:
        group === 0
          ? "Vectors, colour & light"
          : group === 1
            ? "Drawn lines, printed matter"
            : "Faces & frames",
      keyWord: keyWordFor(group, part),
      items,
      startIndex: i,
      palette: CHAPTER_PALETTES[n % CHAPTER_PALETTES.length],
    });
  }
  return walls;
}

// --- Factual chapter copy -------------------------------------------------
// Built only from the wall's own data (counts, years, categories, tools).
// No invented stories, no biographical claims.

const CATEGORY_LABELS: Record<string, string> = {
  "digital-art": "digital art",
  illustration: "illustration",
  "print-design": "print design",
  photography: "photography",
  branding: "branding",
  "ui-ux": "UI / UX",
  "web-design": "web design",
};

export function chapterFacts(wall: ChapterWall): {
  countLine: string;
  mediaLine: string;
  toolsLine: string;
} {
  const years = wall.items
    .map((a) => parseInt(String(a.year ?? "").slice(0, 4), 10))
    .filter((y) => Number.isFinite(y));
  const min = years.length ? Math.min(...years) : null;
  const max = years.length ? Math.max(...years) : null;
  const span = min && max ? (min === max ? `${min}` : `${min} – ${max}`) : "undated";
  const cats = Array.from(
    new Set(wall.items.flatMap((a) => (a.category ?? []).map((c) => CATEGORY_LABELS[c] ?? c.replace(/-/g, " "))))
  );
  const tools = Array.from(
    new Set(
      wall.items
        .flatMap((a) => (a.tools ?? []).map((t) => String(t).trim()))
        .filter(Boolean)
    )
  );
  return {
    countLine: `${wall.items.length} works, made between ${span}.`,
    mediaLine: cats.length ? `Digital art, illustration and print — ${cats.join(", ")}.` : "Digital art, illustration and print.",
    toolsLine: tools.length ? `Made with ${tools.join(" and ")}.` : "",
  };
}

/** Short factual paragraph for the chapter's centred-text block. */
export function chapterParagraph(wall: ChapterWall): string {
  const f = chapterFacts(wall);
  return [f.countLine, f.mediaLine, f.toolsLine].filter(Boolean).join(" ");
}
