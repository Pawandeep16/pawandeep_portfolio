"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { client, GALLERY_QUERY } from "@/lib/sanity";
import { fallbackGallery } from "@/lib/fallback-data";
import type { Artwork } from "@/lib/types";
import { PenDraw } from "@/components/pen-draw";
import { BorderlessViewer } from "@/components/gallery-3d/viewer";
import type { OriginRect } from "@/components/gallery-3d/frame";
import { buildChapterWalls, CHAPTER_PAPER } from "@/lib/chapter-config";
import { Stage } from "@/components/gallery-chapter/stage";
import { ChapterPager } from "@/components/gallery-chapter/pager";
import { Closing } from "@/components/gallery-chapter/closing";

/**
 * Gallery — v13 "Chapter" experience (layout/typography/colours/spacing/
 * motion adapted from the reference's design system; all copy is original
 * and drawn from Pawandeep's own data).
 *
 * PenDraw first (v6 nib, untouched), then the 100vh opening stage with the
 * rotating ring of six chapter covers, then the six chapters in a HORIZONTAL
 * pager (v14 — a 600vh scroll area with one sticky 100svh window; scrolling
 * down flips through the chapters left to right like turning pages), then
 * the closing with its pill buttons and second ring.
 *
 * The v12 Three.js room (components/gallery-3d/) is NOT deleted — it is
 * simply no longer rendered by this file. The v12 changed-files zip still
 * has it if the room ever needs to come back. The borderless viewer with
 * the v10 Apple-style wrap animation is kept and reused for every artwork
 * click. Data still comes from Sanity (GALLERY_QUERY) with the fallback
 * snapshot; the 36 artworks and their real aspect ratios drive the images.
 *
 * The section is a light paper world (#f4f2ef cream) in both themes — like
 * the reference — and does not force the site's dark theme onto itself.
 */
export function Gallery() {
  const [artworks, setArtworks] = useState<Artwork[]>(fallbackGallery);
  const [selected, setSelected] = useState<number | null>(null);
  const [originRect, setOriginRect] = useState<OriginRect | null>(null);
  const reduce = useReducedMotion();
  const pagerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const data = await client.fetch(GALLERY_QUERY);
        if (alive && Array.isArray(data) && data.length) setArtworks(data);
      } catch {
        /* snapshot stays */
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  const walls = useMemo(() => buildChapterWalls(artworks), [artworks]);
  const total = artworks.length;

  const scrollToId = useCallback(
    (id: string) => {
      document.getElementById(id)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    },
    [reduce]
  );

  /** Scroll the page to chapter i inside the horizontal pager — this is
   *  what the cover ring's click-to-chapter and the closing carousel use.
   *  The pager section is N×100vh tall; chapter i sits at i/(N-1) of its
   *  scrollable length. */
  const goToChapter = useCallback(
    (i: number) => {
      const el = pagerRef.current;
      if (!el) return;
      const idx = Math.min(walls.length - 1, Math.max(0, i));
      const top = el.getBoundingClientRect().top + window.scrollY;
      const total = el.offsetHeight - window.innerHeight;
      window.scrollTo({
        top: top + (idx / Math.max(walls.length - 1, 1)) * total,
        behavior: reduce ? "auto" : "smooth",
      });
    },
    [walls.length, reduce]
  );

  const openArtwork = useCallback((index: number, rect: OriginRect | null) => {
    setOriginRect(rect);
    setSelected(index);
  }, []);
  const close = useCallback(() => setSelected(null), []);
  const step = useCallback(
    (dir: 1 | -1) => {
      setSelected((cur) => (cur === null ? cur : (cur + dir + total) % total));
    },
    [total]
  );

  return (
    <section
      id="gallery"
      className="scroll-mt-24"
      aria-label="Design gallery"
      style={{ backgroundColor: CHAPTER_PAPER }}
    >
      {/* Pen-draw hero: the attached artwork, finished live on scroll */}
      <PenDraw />

      <div id="gallery-stage">
        <Stage walls={walls} total={total} onSelectChapter={goToChapter} />
      </div>

      <ChapterPager walls={walls} total={total} onOpen={openArtwork} sectionRef={pagerRef} goToChapter={goToChapter} />

      <Closing walls={walls} onGoStage={() => scrollToId("gallery-stage")} onGoChapter={goToChapter} />

      {/* Borderless viewer — only Previous / Next visible; Esc or backdrop closes */}
      <BorderlessViewer artworks={artworks} selected={selected} originRect={originRect} onClose={close} onStep={step} />
    </section>
  );
}
