import "./globals.css";
import type { Metadata } from "next";
import { Inter, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const display = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-display", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-mono", display: "swap" });
const site = "https://pawandeep-portfolio.vercel.app";
const description =
  "Computer Science graduate with a passion for software development, intelligent systems, automation, and solving practical business problems through technology.";

export const metadata: Metadata = {
  metadataBase: new URL(site),
  title: {
    default: "Pawandeep Singh Thandi — Full Stack Developer & Designer",
    template: "%s | Pawandeep Singh Thandi",
  },
  description,
  keywords: ["Pawandeep Singh Thandi", "Full Stack Developer", "UI/UX Designer", "Graphic Designer", "Next.js", "React", "Mississauga", "Google Apps Script"],
  authors: [{ name: "Pawandeep Singh Thandi" }],
  creator: "Pawandeep Singh Thandi",
  alternates: { canonical: site },
  openGraph: {
    type: "website",
    url: site,
    siteName: "Pawandeep Singh Thandi",
    title: "Pawandeep Singh Thandi — Full Stack Developer & Designer",
    description,
    locale: "en_CA",
  },
  twitter: { card: "summary_large_image", title: "Pawandeep Singh Thandi — Full Stack Developer & Designer", description },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body className={`${inter.variable} ${display.variable} ${mono.variable} font-sans`}>
        <div className="grain" aria-hidden="true" />
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-amber-600 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white">
          Skip to content
        </a>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
