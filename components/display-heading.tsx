"use client";

import { motion, useReducedMotion } from "framer-motion";
import { anton } from "@/lib/fonts";
import { cn } from "@/lib/utils";

/**
 * DisplayHeading — v14: the Milla Nova headline treatment, site-wide.
 *
 * Tall condensed Anton, uppercase, tight leading. Small function words
 * ("the", "of", "and", "my", "to" …) render at roughly half size, raised
 * above the baseline — the reference's signature device. One word may be
 * named as `accent` and renders in dispatch amber. An optional giant faint
 * section marker (the section's key word, ~200–300px, very low opacity)
 * wipes in behind the heading, and an optional ✦ star sits above it.
 */

const SMALL_WORDS = new Set([
  "a",
  "an",
  "the",
  "of",
  "and",
  "my",
  "to",
  "in",
  "on",
  "for",
  "with",
  "that",
  "by",
  "from",
  "as",
]);

function clean(word: string): string {
  return word.replace(/[^a-zA-Z']/g, "").toLowerCase();
}

/** The heading text, with the small-word device + accent applied. */
export function DisplayWords({
  text,
  accent,
  className,
}: {
  text: string;
  accent?: string;
  className?: string;
}) {
  const words = text.split(/\s+/).filter(Boolean);
  const accentClean = accent ? clean(accent) : "";
  return (
    <span className={className}>
      {words.map((w, i) => {
        const small = SMALL_WORDS.has(clean(w));
        const isAccent = !!accentClean && clean(w) === accentClean;
        return (
          <span
            key={`${w}-${i}`}
            className={cn(isAccent && "text-amber-700 dark:text-amber-500")}
            style={
              small
                ? { fontSize: "0.5em", verticalAlign: "super", margin: "0 0.1em" }
                : undefined
            }
          >
            {w}
            {i < words.length - 1 ? " " : ""}
          </span>
        );
      })}
    </span>
  );
}

export function DisplayHeading({
  text,
  accent,
  chapter,
  marker,
  star = false,
  align = "left",
  level = "h2",
  size,
  className,
}: {
  text: string;
  accent?: string;
  /** Small-caps label above the heading, e.g. "Chapter I — About". */
  chapter?: string;
  /** Giant faint key word behind the heading, e.g. "ABOUT". */
  marker?: string;
  star?: boolean;
  align?: "left" | "center";
  level?: "h1" | "h2";
  /** CSS font-size for the heading; defaults to the section scale. */
  size?: string;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const Tag = level === "h1" ? motion.h1 : motion.h2;
  return (
    <div className={cn("relative", align === "center" && "text-center", className)}>
      {marker ? (
        <span
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute -top-[0.5em] left-0 right-0 select-none overflow-hidden text-center",
            anton.className
          )}
          style={{
            fontSize: "clamp(7rem, 22vw, 17rem)",
            lineHeight: 1,
            color: "currentColor",
            opacity: 0.05,
          }}
        >
          <motion.span
            className="inline-block"
            initial={reduce ? false : { clipPath: "inset(0 100% 0 0)" }}
            whileInView={{ clipPath: "inset(0 0% 0 0)" }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            {marker}
          </motion.span>
        </span>
      ) : null}
      <div className="relative">
        {star ? (
          <p aria-hidden="true" className="text-lg leading-none text-amber-600 dark:text-amber-500">
            ✦
          </p>
        ) : null}
        {chapter ? <p className="eyebrow">{chapter}</p> : null}
        <Tag
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className={`${anton.className} mt-4 uppercase leading-[0.98] text-stone-900 dark:text-stone-50`}
          style={{ fontSize: size ?? "clamp(2.4rem, 6vw, 4.5rem)" }}
        >
          <DisplayWords text={text} accent={accent} />
        </Tag>
      </div>
    </div>
  );
}
