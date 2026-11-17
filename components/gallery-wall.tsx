"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { imageUrl } from "@/lib/sanity";
import type { Artwork } from "@/lib/types";
import { cn } from "@/lib/utils";

export interface GalleryWallData {
  id: string;
  name: string;
  subtitle: string;
  items: Artwork[];
  /** Global index of the first artwork on this wall. */
  startIndex: number;
}

const OFFSETS = ["lg:-mt-3", "lg:mt-4", "lg:-mt-7", "lg:mt-2", "lg:-mt-2", "lg:mt-5"];

function label(cat: string) {
  return cat.replace(/-/g, " ");
}

function WallFrame({
  art,
  globalIndex,
  centrepiece,
  offsetClass,
  mounted,
  priority,
  coneY,
  onOpen,
}: {
  art: Artwork;
  globalIndex: number;
  centrepiece: boolean;
  offsetClass: string;
  mounted: boolean;
  priority: boolean;
  coneY?: MotionValue<number>;
  onOpen: (globalIndex: number) => void;
}) {
  const src = imageUrl(art.image, 900);
  const cats = (art.category ?? []).map(label).join(" · ");
  return (
    <button
      type="button"
      onClick={() => onOpen(globalIndex)}
      aria-label={`View ${art.title}${art.year ? `, ${art.year}` : ""} enlarged`}
      className={cn(
        "group relative shrink-0 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600",
        centrepiece ? "w-full max-w-[320px] sm:w-[280px] lg:w-[248px]" : "w-[calc(50%-0.5rem)] sm:w-[190px] lg:w-[158px]",
        offsetClass
      )}
    >
      {/* Light pool behind the frame */}
      <span
        aria-hidden="true"
        className="absolute -inset-x-8 -top-16 bottom-0 bg-[radial-gradient(ellipse_at_top,rgba(255,233,180,0.55),transparent_65%)] opacity-60 transition-opacity duration-500 group-hover:opacity-100"
      />
      {/* Spotlight cone above the frame — drifts a little slower than the frames */}
      <motion.span
        aria-hidden="true"
        style={coneY ? { x: "-50%", y: coneY } : { x: "-50%" }}
        className="pointer-events-none absolute -top-[74px] left-1/2 z-10 w-[170%] opacity-80 transition-opacity duration-500 group-hover:opacity-100"
      >
        <Image src="/assets/spotlight-cone.svg" alt="" width={200} height={190} className="h-auto w-full" />
      </motion.span>

      {/* Physical frame: warm wood border, cream mat, soft shadow */}
      <span className="relative z-10 block rounded-[4px] bg-gradient-to-b from-[#7a5c3e] to-[#4e3a24] p-[7px] shadow-[0_18px_30px_-12px_rgba(43,32,18,0.55)] transition-all duration-500 group-hover:-translate-y-1.5 group-hover:shadow-[0_28px_40px_-12px_rgba(43,32,18,0.65)]">
        <span className="block bg-[#f8f3e8] p-[10px]">
          <motion.span layoutId={`art-${art._id}`} className={cn("relative block overflow-hidden bg-[#e9e2d2]", centrepiece ? "aspect-[4/5]" : "aspect-[3/4]")}>
            {mounted && src ? (
              <Image
                src={src}
                alt={art.title}
                width={centrepiece ? 600 : 450}
                height={centrepiece ? 750 : 600}
                loading={priority ? "eager" : "lazy"}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            ) : (
              <span className="flex h-full w-full items-center justify-center px-3 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-stone-500">
                {art.title}
              </span>
            )}
          </motion.span>
        </span>
      </span>

      {/* Title plaque */}
      <span className="relative z-10 mx-auto mt-3 block w-fit max-w-[190px] truncate rounded-sm bg-gradient-to-b from-[#e8c97a] to-[#c9a24a] px-3 py-1 text-center font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#3a2c14] shadow">
        {art.title}
        {art.year ? ` · ${art.year}` : ""}
      </span>
      <span className="sr-only">{cats}</span>
    </button>
  );
}

export function GalleryWall({
  wall,
  index,
  totalWalls,
  totalWorks,
  isLast,
  nextTarget,
  onOpen,
  onMount,
  onActive,
}: {
  wall: GalleryWallData;
  index: number;
  totalWalls: number;
  totalWorks: number;
  isLast: boolean;
  /** Element id to scroll to when the visitor continues past this wall. */
  nextTarget: string;
  onOpen: (globalIndex: number) => void;
  onMount: (index: number) => void;
  onActive: (index: number) => void;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { margin: "400px 0px", once: true });
  const active = useInView(ref, { margin: "-40% 0px -40% 0px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  // Spotlight cones drift a little slower than the frames — gentle parallax.
  const coneY = useTransform(scrollYProgress, [0, 1], [10, -14]);

  useEffect(() => {
    if (inView) onMount(index);
  }, [inView, index, onMount]);
  useEffect(() => {
    if (active) onActive(index);
  }, [active, index, onActive]);

  const start = wall.startIndex + 1;
  const end = wall.startIndex + wall.items.length;
  const centrepiece = Math.floor(wall.items.length / 2);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  };

  const inner = (
    <>
      {/* The wall itself: flat 2D asset, light in both themes */}
      <div className="relative overflow-hidden rounded-[24px] border border-stone-300/60 shadow-[0_24px_50px_-24px_rgba(43,32,18,0.45)] dark:border-white/10">
        <Image
          src="/assets/gallery-wall.svg"
          alt=""
          fill
          aria-hidden="true"
          className="object-cover dark:brightness-[0.42] dark:saturate-[0.75]"
        />
        {/* Warm wash so the header stays legible on the cream wall */}
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-[#faf6ec]/70 via-transparent to-transparent dark:from-black/30" />

        <div className="relative z-10">
          {/* Wall header */}
          <div className="flex flex-wrap items-end justify-between gap-3 px-6 pt-7 sm:px-10 sm:pt-9">
            <div>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-amber-800 dark:text-amber-400">
                Wall {index + 1} of {totalWalls} — {wall.name}
              </p>
              <h3 className="mt-2 font-display text-3xl leading-none text-[#2b2419] dark:text-[#f3ead7] sm:text-[2.6rem]">
                {wall.name}
              </h3>
              <p className="mt-2 text-sm text-stone-600 dark:text-stone-300">{wall.subtitle}</p>
            </div>
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-stone-600 dark:text-stone-300">
              {wall.items.length} works · Showing {start}–{end} of {totalWorks}
            </p>
          </div>

          {/* Frames band — one row, all fully visible, varied heights */}
          <div className="flex flex-wrap items-start justify-center gap-x-4 gap-y-9 px-5 pb-12 pt-16 sm:px-8 lg:flex-nowrap lg:gap-x-5 lg:pt-20">
            {wall.items.map((art, i) => (
              <WallFrame
                key={art._id}
                art={art}
                globalIndex={wall.startIndex + i}
                centrepiece={i === centrepiece}
                offsetClass={OFFSETS[i % OFFSETS.length]}
                mounted={inView || reduce}
                priority={index === 0}
                coneY={reduce ? undefined : coneY}
                onOpen={onOpen}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Wood floor strip under the wall */}
      <div aria-hidden="true" className="mx-auto h-3.5 w-[94%] rounded-b-2xl bg-gradient-to-r from-[#6f543a] via-[#8a6b4a] to-[#6f543a] shadow-md" />

      {/* Continue cue */}
      <div className="mt-6 flex justify-center">
        <button
          type="button"
          onClick={() => scrollTo(nextTarget)}
          className="inline-flex items-center gap-2 rounded-full border border-stone-300 bg-white/70 px-5 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-stone-700 backdrop-blur transition hover:border-amber-600 hover:text-amber-700 dark:border-white/15 dark:bg-white/5 dark:text-stone-200 dark:hover:border-amber-400 dark:hover:text-amber-400"
        >
          {isLast ? "End of the exhibition — continue" : "Continue the exhibition"}
          <ChevronDown className="h-4 w-4" />
        </button>
      </div>
    </>
  );

  return (
    <section
      id={wall.id}
      ref={ref}
      aria-label={`${wall.name} — wall ${index + 1} of ${totalWalls}`}
      className="relative scroll-mt-28 px-4 py-8 sm:px-6 sm:py-10 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        {reduce ? (
          inner
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {inner}
          </motion.div>
        )}
      </div>
    </section>
  );
}
