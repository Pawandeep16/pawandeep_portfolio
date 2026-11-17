"use client";

import { ThemeProvider } from "next-themes";

export function Providers({ children }: { children: React.ReactNode }) {
  // v14: disableTransitionOnChange REMOVED — it killed the colour
  // transitions that make the light/dark switch smooth. The theme
  // toggle's radial wipe + the global 0.5s colour transitions in
  // globals.css now animate the switch instead.
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      {children}
    </ThemeProvider>
  );
}
