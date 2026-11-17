"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { DisplayHeading } from "@/components/display-heading";

export function Reveal({ children, delay = 0, className, y = 28, as = "div" }: { children: ReactNode; delay?: number; className?: string; y?: number; as?: "div" | "li" }) {
  const reduce = useReducedMotion();
  const Tag = as === "li" ? motion.li : motion.div;
  if (reduce) return as === "li" ? <li className={className}>{children}</li> : <div className={className}>{children}</div>;
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Tag>
  );
}

export function SectionHeading({ eyebrow, title, accent, intro, align = "left", marker, star }: { eyebrow: string; title: string; accent?: string; intro?: string; align?: "left" | "center"; marker?: string; star?: boolean }) {
  return (
    <Reveal className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
      <DisplayHeading text={title} accent={accent} chapter={eyebrow} marker={marker} star={star} align={align} />
      {intro ? <p className="mt-5 max-w-xl text-base leading-relaxed text-stone-600 dark:text-stone-400 sm:text-lg">{intro}</p> : null}
    </Reveal>
  );
}

export function CursorGlow() {
  return <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 hidden [@media(pointer:fine)]:block" />;
}
