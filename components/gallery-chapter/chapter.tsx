"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { ArrowUpRight } from "lucide-react";
import { imageUrl } from "@/lib/sanity";
import { aspectFromArtwork } from "@/lib/gallery-config";
import { ROMAN, chapterFacts, chapterParagraph, darkPalette, type ChapterWall } from "@/lib/chapter-config";
import { anton } from "@/lib/fonts";
import type { OriginRect } from "@/components/gallery-3d/frame";

/**
 * Chapter slide — one 100vw × 100svh page inside the horizontal pager.
 * Giant marker (wipes in letter by letter), chapter label, split 50/50
 * (first artwork + word-by-word text column), and an offset collage of
 * the remaining artworks. The word reveal and marker wipe fire from the
 * `active` prop (true when this slide is on screen). Clicking an artwork
 * opens the borderless viewer. On mobile the slide compresses to fit one
 * screen and the collage becomes a swipeable strip, so no artwork is
 * clipped off the edge.
 */

function hexToRgba(hex: string, alpha: number): string {
  const m = hex.replace("#", "");
  const r = parseInt(m.slice(0, 2), 16);
  const g = parseInt(m.slice(2, 4), 16);
  const b = parseInt(m.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/** Signature animation: words fade from a pale tint of the accent to full
 *  colour, one by one, when this slide becomes active. */
function WordReveal({
  text,
  accent,
  active,
  className,
}: {
  text: string;
  accent: string;
  active: boolean;
  className?: string;
}) {
  const words = text.split(/\s+/).filter(Boolean);
  return (
    <motion.p
      className={className}
      initial="hidden"
      animate={active ? "shown" : "hidden"}
      variants={{ hidden: {}, shown: { transition: { staggerChildren: 0.035, delayChildren: 0.2 } } }}
    >
      {words.map((w, i) => (
        <motion.span
          key={`${w}-${i}`}
          className="mr-[0.28em] inline-block"
          variants={{
            hidden: { color: hexToRgba(accent, 0.22), opacity: 0.35 },
            shown: { color: accent, opacity: 1 },
          }}
          transition={{ duration: 0.4 }}
        >
          {w}
        </motion.span>
      ))}
    </motion.p>
  );
}

function catLabel(a: { category?: string[] }): string {
  return (a.category ?? []).map((c) => c.replace(/-/g, " ")).join(" · ") || "Artwork";
}

export function Chapter({
  wall,
  index,
  active,
  onOpen,
}: {
  wall: ChapterWall;
  index: number;
  /** True when this slide is the one currently on screen. */
  active: boolean;
  onOpen: (globalIndex: number, rect: OriginRect | null) => void;
}) {
  const { resolvedTheme } = useTheme();
  const palette = resolvedTheme === "dark" ? darkPalette(wall.palette) : wall.palette;
  const { accent, ground, ink } = palette;
  const facts = chapterFacts(wall);
  const first = wall.items[0];
  const rest = wall.items.slice(1);
  const titlesLine = `In this chapter — ${wall.items.map((a) => a.title || "Untitled").join(" · ")}.`;

  const open = (localIndex: number) => (e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    onOpen(wall.startIndex + localIndex, { x: r.x, y: r.y, width: r.width, height: r.height });
  };

  // Giant marker sized for one screen: ~10vw, always one line.
  const markerVw = Math.max(8, Math.min(11, 92 / (wall.keyWord.length * 0.5)));

  return (
    <section
      id={wall.anchorId}
      aria-label={`Chapter ${ROMAN[index]} — ${wall.name}`}
      className="relative flex h-[100svh] w-screen shrink-0 flex-col overflow-hidden px-4 sm:px-8 lg:px-12"
      style={{ backgroundColor: ground, color: ink }}
    >
      {/* Giant decorative marker — wipes in letter by letter when the page turns here */}
      <div className="pointer-events-none mx-auto w-full max-w-7xl select-none pt-3 text-center md:pt-[4vh]" aria-hidden="true">
        <p
          className={`${anton.className} whitespace-nowrap uppercase leading-none`}
          style={{ fontSize: `${markerVw}vw`, color: accent }}
        >
          {wall.keyWord.split("").map((ch, i) => (
            <motion.span
              key={i}
              className="inline-block"
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              animate={active ? { clipPath: "inset(0 0% 0 0)" } : { clipPath: "inset(0 100% 0 0)" }}
              transition={{ duration: 0.5, delay: 0.05 + i * 0.05, ease: "easeOut" }}
            >
              {ch}
            </motion.span>
          ))}
        </p>
      </div>

      {/* Chapter label */}
      <div className="relative z-10 mx-auto w-full max-w-7xl pt-2 text-center md:pt-[2.5vh]">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-[11px] font-bold uppercase tracking-[0.34em]"
          style={{ color: accent }}
        >
          Chapter {ROMAN[index]}
        </motion.p>
        <motion.h3
          initial={{ opacity: 0, y: 12 }}
          animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.5, delay: 0.18 }}
          className={`${anton.className} mt-2 uppercase leading-none`}
          style={{ fontSize: "clamp(1.7rem, 3.6vw, 2.6rem)", color: ink }}
        >
          {wall.name}
        </motion.h3>
        <p className="mt-1.5 text-[11px] font-semibold uppercase tracking-[0.28em] opacity-60">
          {wall.items.length} works · {wall.subtitle}
        </p>
      </div>

      {/* Split 50/50 — first artwork one side, word-by-word text the other */}
      {first && (
        <div className="mx-auto grid w-full max-w-7xl min-h-0 flex-1 grid-cols-1 items-center gap-4 py-2 md:grid-cols-2 md:gap-10 md:py-[2vh]">
          <motion.div
            initial={{ opacity: 0, scale: 1.04 }}
            animate={active ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.04 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="relative flex items-center justify-center"
          >
            <button
              type="button"
              onClick={open(0)}
              aria-label={`Open ${first.title || "artwork"} in the viewer`}
              className="block max-h-[30vh] cursor-pointer overflow-hidden md:max-h-[46vh]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imageUrl(first.image, 1200) ?? ""}
                alt={first.title || "Artwork"}
                loading="lazy"
                draggable={false}
                className="h-auto max-h-[30vh] w-auto max-w-full object-contain md:max-h-[46vh]"
                style={{ aspectRatio: `${aspectFromArtwork(first)}` }}
              />
            </button>
            {/* White pill card overlapping the split image's bottom edge */}
            <button
              type="button"
              onClick={open(0)}
              aria-label={`Open ${first.title || "artwork"} in the viewer`}
              className="absolute -bottom-3 left-2 z-10 flex max-w-[86vw] items-center gap-3 rounded-full bg-white py-1.5 pl-1.5 pr-4 text-left shadow-[0_10px_30px_-8px_rgba(43,33,24,0.35)] transition hover:shadow-[0_16px_40px_-8px_rgba(43,33,24,0.45)] dark:bg-zinc-900 dark:shadow-black/40"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imageUrl(first.image, 200) ?? ""}
                alt=""
                className="h-[52px] w-[36px] shrink-0 rounded-full object-cover"
              />
              <span className="min-w-0 leading-tight">
                <span className="block truncate text-[13px] font-semibold text-stone-900 dark:text-white">
                  {first.title || "Untitled"}
                </span>
                <span className="mt-0.5 block text-[10px] font-semibold uppercase tracking-[0.18em] text-stone-500 dark:text-stone-400">
                  {catLabel(first)}
                </span>
              </span>
              <ArrowUpRight className="h-4 w-4 text-stone-400" aria-hidden="true" />
            </button>
          </motion.div>
          <div className="px-1 md:px-8">
            <p className="text-[11px] font-bold uppercase tracking-[0.3em]" style={{ color: accent }}>
              {wall.name} — {facts.countLine}
            </p>
            <WordReveal
              text={chapterParagraph(wall)}
              accent={accent}
              active={active}
              className="mt-4 text-[clamp(1.05rem,2vw,1.6rem)] font-medium leading-snug"
            />
            <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.2em] opacity-60">
              {first.title || "Untitled"}
              {first.year ? ` · ${String(first.year).slice(0, 4)}` : ""} · {catLabel(first)}
            </p>
            <p className="mt-3 hidden text-[13px] leading-relaxed opacity-70 md:block">{titlesLine}</p>
          </div>
        </div>
      )}

      {/* Collage strip — the remaining artworks in one horizontal row */}
      <div className="mx-auto w-full max-w-7xl pb-4 md:pb-[6vh]">
        <div className="flex snap-x items-end gap-3 overflow-x-auto px-1 pb-1 [scrollbar-width:none] sm:justify-center sm:gap-4 sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden">
          {rest.map((art, i) => {
            const src = imageUrl(art.image, 600);
            return (
              <motion.figure
                key={art._id}
                className="relative shrink-0 snap-start"
                initial={{ opacity: 0, y: 16 }}
                animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                transition={{ duration: 0.5, delay: 0.25 + i * 0.07 }}
              >
                <button
                  type="button"
                  onClick={open(i + 1)}
                  aria-label={`Open ${art.title || "artwork"} in the viewer`}
                  className="block cursor-pointer"
                >
                  {src && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={src}
                      alt={art.title || "Artwork"}
                      loading="lazy"
                      draggable={false}
                      className="h-[16vh] w-auto max-w-[38vw] object-contain sm:max-w-[22vw]"
                      style={{ aspectRatio: `${aspectFromArtwork(art)}` }}
                    />
                  )}
                </button>
                <figcaption className="mt-1.5 max-w-[38vw] truncate text-[9px] font-semibold uppercase tracking-[0.2em] opacity-60 sm:max-w-[22vw]">
                  {art.title || "Untitled"}
                </figcaption>
              </motion.figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
