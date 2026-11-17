import { Anton } from "next/font/google";

/**
 * Shared display face — v14: Anton (tall condensed) is now the site's
 * DISPLAY face, not just the gallery's. Every section heading uses it
 * through <DisplayHeading> (components/display-heading.tsx). Body stays
 * Inter, labels stay JetBrains Mono.
 */
export const anton = Anton({ subsets: ["latin"], weight: "400", display: "swap" });
