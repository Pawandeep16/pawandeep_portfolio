"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Apple-style scroll reveal: content fades in and scales 0.96 → 1 as it
 * enters the viewport, driven by scroll position. With reduced motion
 * preferred, content renders statically — no animation at all.
 */
export function ScrollReveal({
  children,
  className,
  y = 40,
}: {
  children: ReactNode;
  className?: string;
  y?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.92", "start 0.45"],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 });
  const opacity = useTransform(smooth, [0, 1], [0, 1]);
  const scale = useTransform(smooth, [0, 1], [0.96, 1]);
  const translateY = useTransform(smooth, [0, 1], [y, 0]);

  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div ref={ref} className={className} style={{ opacity, scale, y: translateY }}>
      {children}
    </motion.div>
  );
}

/** Gentle parallax for imagery: moves slightly slower than the scroll. */
export function Parallax({
  children,
  className,
  amount = 36,
}: {
  children: ReactNode;
  className?: string;
  amount?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [amount, -amount]);

  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div ref={ref} className={className} style={{ y }}>
      {children}
    </motion.div>
  );
}
