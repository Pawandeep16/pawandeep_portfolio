"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { ChapterWall } from "@/lib/chapter-config";
import { CoverRing } from "./ring";

/**
 * Closing — the end of the gallery. "Discover more from the gallery",
 * two large dark pill buttons (navy, ~225×85px, white text): "ALL WORKS ↗"
 * scrolls back to the stage, "CONTACT ↗" anchors to the portfolio's
 * Contact section (#contact). Then a disclaimer-style band in tall narrow
 * condensed caps, low-contrast, centred. Then the closing carousel: the
 * same rotating ring of six covers on a ground tinted to the last
 * chapter's accent, navigating back to any chapter.
 */

const NAVY = "#3d435e";

export function Closing({
  walls,
  onGoStage,
  onGoChapter,
}: {
  walls: ChapterWall[];
  onGoStage: () => void;
  onGoChapter: (i: number) => void;
}) {
  const [active, setActive] = useState(0);
  const last = walls[walls.length - 1];

  return (
    <div
      className="relative overflow-hidden"
      style={{ backgroundColor: last ? last.palette.ground : "#f4f2ef" }}
    >
      <div className="mx-auto max-w-7xl px-4 pt-[10vh] text-center sm:px-6 lg:px-8">
        <h3 className="text-[30px] font-medium leading-tight text-stone-800">
          Discover more from the gallery
        </h3>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          <motion.button
            type="button"
            onClick={onGoStage}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="grid h-[85px] w-[225px] place-items-center rounded-full text-base font-bold uppercase tracking-[0.14em] text-white transition hover:opacity-90"
            style={{ backgroundColor: NAVY }}
          >
            All works <ArrowUpRight className="ml-1 inline h-5 w-5" aria-hidden="true" />
          </motion.button>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="grid h-[85px] w-[225px] place-items-center rounded-full text-base font-bold uppercase tracking-[0.14em] text-white transition hover:opacity-90"
            style={{ backgroundColor: NAVY }}
          >
            Contact <ArrowUpRight className="ml-1 inline h-5 w-5" aria-hidden="true" />
          </motion.a>
        </div>
      </div>

      {/* Disclaimer-style band */}
      <p className="mx-auto max-w-4xl px-4 pt-[8vh] text-center text-[30px] uppercase leading-snug tracking-[0.06em] text-stone-400">
        All works © Pawandeep Singh Thandi · Digital art, illustration and print design.
      </p>

      {/* Closing carousel — same ring, navigating back to any chapter */}
      <div className="relative mt-[6vh] pb-[8vh]">
        <CoverRing walls={walls} active={active} onActiveChange={setActive} onSelect={onGoChapter} compact />
      </div>
    </div>
  );
}
