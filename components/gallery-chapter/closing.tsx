"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { ArrowUpRight } from "lucide-react";
import { darkPalette, type ChapterWall } from "@/lib/chapter-config";
import { CoverRing } from "./ring";

/**
 * Closing — "Discover more" pill buttons (back to the stage / Contact),
 * a disclaimer band, then the same cover ring navigating back to chapters.
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
  const { resolvedTheme } = useTheme();
  const last = walls[walls.length - 1];
  const ground = last
    ? resolvedTheme === "dark"
      ? darkPalette(last.palette).ground
      : last.palette.ground
    : resolvedTheme === "dark"
      ? "#0c0c0d"
      : "#f4f2ef";

  return (
    <div
      className="relative overflow-hidden"
      style={{ backgroundColor: ground }}
    >
      <div className="mx-auto max-w-7xl px-4 pt-[10vh] text-center sm:px-6 lg:px-8">
        <h3 className="text-[30px] font-medium leading-tight text-stone-800 dark:text-stone-100">
          Discover more from the gallery
        </h3>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          <motion.button
            type="button"
            onClick={onGoStage}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="grid h-[72px] w-[min(225px,78vw)] place-items-center rounded-full text-base font-bold uppercase tracking-[0.14em] text-white transition hover:opacity-90 sm:h-[85px] sm:w-[225px]"
            style={{ backgroundColor: NAVY }}
          >
            All works <ArrowUpRight className="ml-1 inline h-5 w-5" aria-hidden="true" />
          </motion.button>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="grid h-[72px] w-[min(225px,78vw)] place-items-center rounded-full text-base font-bold uppercase tracking-[0.14em] text-white transition hover:opacity-90 sm:h-[85px] sm:w-[225px]"
            style={{ backgroundColor: NAVY }}
          >
            Contact <ArrowUpRight className="ml-1 inline h-5 w-5" aria-hidden="true" />
          </motion.a>
        </div>
      </div>

      {/* Disclaimer-style band */}
      <p className="mx-auto max-w-4xl px-4 pt-[8vh] text-center text-[clamp(1.25rem,5.5vw,1.875rem)] uppercase leading-snug tracking-[0.06em] text-stone-400">
        All works © Pawandeep Singh Thandi · Digital art, illustration and print design.
      </p>

      {/* Closing carousel — same ring, navigating back to any chapter */}
      <div className="relative mt-[6vh] pb-[8vh]">
        <CoverRing walls={walls} active={active} onActiveChange={setActive} onSelect={onGoChapter} compact />
      </div>
    </div>
  );
}
