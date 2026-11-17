"use client";

import { motion } from "framer-motion";
import type { MouseEvent as ReactMouseEvent, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Animated icons — v14: lucide-react is THE icon library, used
 * consistently everywhere, with the same Framer Motion micro-animation on
 * every interactive icon: hover scale 1.12 + slight rotate, tap scale 0.88,
 * spring transition. No new icon package was needed — lucide covers all of
 * it (Sun, Moon, Star, ChevronLeft/Right, ArrowUpRight, Download, Mail…).
 *
 * Props are spelled out explicitly (rather than extending the native HTML
 * attribute types) because Framer Motion redefines handlers like onDrag,
 * which clash with the native ones in TypeScript.
 */

const SPRING = { type: "spring" as const, stiffness: 400, damping: 18 };

type IconButtonProps = {
  children: ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: (e: ReactMouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  "aria-label"?: string;
  "aria-expanded"?: boolean;
};

export function IconButton({
  children,
  className,
  type = "button",
  onClick,
  disabled,
  ...aria
}: IconButtonProps) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? undefined : { scale: 1.12, rotate: 5 }}
      whileTap={disabled ? undefined : { scale: 0.88 }}
      transition={SPRING}
      className={cn("grid place-items-center", className)}
      {...aria}
    >
      {children}
    </motion.button>
  );
}

type IconLinkProps = {
  children: ReactNode;
  className?: string;
  href?: string;
  target?: string;
  rel?: string;
  "aria-label"?: string;
  onClick?: (e: ReactMouseEvent<HTMLAnchorElement>) => void;
};

export function IconLink({ children, className, href, target, rel, onClick, ...aria }: IconLinkProps) {
  return (
    <motion.a
      href={href}
      target={target}
      rel={rel}
      onClick={onClick}
      whileHover={{ scale: 1.12, rotate: 4, y: -2 }}
      whileTap={{ scale: 0.9 }}
      transition={SPRING}
      className={className}
      {...aria}
    >
      {children}
    </motion.a>
  );
}
