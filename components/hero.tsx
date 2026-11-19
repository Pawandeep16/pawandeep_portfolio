"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence } from "framer-motion";
import { Magnetic } from "@/components/magnetic";
import { motion, useMotionValue, useScroll, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowRight, Github, Linkedin, Mail, MapPin, Truck } from "lucide-react";
import { anton } from "@/lib/fonts";
import { client, HERO_QUERY, SOCIAL_LINKS_QUERY } from "@/lib/sanity";
import { fallbackHero, fallbackSocialLinks } from "@/lib/fallback-data";
import type { Hero, SocialLink } from "@/lib/types";

const ICONS: Record<string, typeof Github> = { GitHub: Github, LinkedIn: Linkedin };

export function Hero() {
  const [hero, setHero] = useState<Hero>(fallbackHero);
  const [track, setTrack] = useState<"both" | "logistics" | "software">("both");
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 90);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const chooseTrack = (next: "both" | "logistics" | "software") => {
    setTrack(next);
    if (next !== "both") {
      window.dispatchEvent(new CustomEvent("portfolio:track", { detail: next }));
      document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
    }
  };
  const [socials, setSocials] = useState<SocialLink[]>(fallbackSocialLinks);
  // No loading gate: render the last-known snapshot immediately
  // (so the headline is in the server-rendered HTML) and let the CMS
  // update it in the background.
  const reduce = useReducedMotion();
  // Apple-style hero: as the visitor scrolls away, the hero content gently
  // shrinks and fades (scroll-linked, transform/opacity only). The
  // entrance animations above are untouched — this composes on top.
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(heroScroll, [0, 0.8], [1, 0]);
  const heroScale = useTransform(heroScroll, [0, 1], [1, 0.96]);
  const heroY = useTransform(heroScroll, [0, 1], [0, -60]);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });
  const blobX = useTransform(sx, [-0.5, 0.5], [-18, 18]);
  const blobY = useTransform(sy, [-0.5, 0.5], [-12, 12]);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const [h, s] = await Promise.all([client.fetch(HERO_QUERY), client.fetch(SOCIAL_LINKS_QUERY)]);
        if (!alive) return;
        if (h) setHero(h);
        if (Array.isArray(s) && s.length) setSocials(s);
      } catch {
        // Keep the last-known snapshot (lib/fallback-data.ts).
      }
    })();
    return () => { alive = false; };
  }, []);

  return (
    <section ref={heroRef} id="home" className="grid-bg relative overflow-hidden pb-16 pt-28 sm:pt-36 lg:pb-24" aria-label="Introduction"
      onMouseMove={(e) => { if (reduce) return; mx.set(e.clientX / window.innerWidth - 0.5); my.set(e.clientY / window.innerHeight - 0.5); }}>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <motion.div style={reduce ? undefined : { x: blobX, y: blobY }} className="absolute -top-32 right-[8%] h-72 w-72 rounded-full bg-amber-600/20 blur-3xl dark:bg-amber-600/25" />
        <div className="absolute bottom-0 left-[-5%] h-72 w-72 rounded-full bg-amber-600/10 blur-3xl" />
      </div>

      <motion.div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" style={reduce ? undefined : { opacity: heroOpacity, scale: heroScale, y: heroY }}>
        <div className="grid items-start gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
              className="inline-flex flex-wrap items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-400">
              <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" /><span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" /></span>
              Available immediately — Mississauga, ON
            </motion.p>

            <p className="mt-7 font-sans text-[clamp(0.85rem,2vw,1.15rem)] font-extrabold uppercase tracking-[0.28em] text-amber-700 dark:text-amber-500">Logistics <span className="text-stone-400 dark:text-stone-500">×</span> Web</p>
            {/* v14: the headline in Anton, uppercase, with the small-word
                device — same words as before, restyled to the gallery's
                display language. */}
            <h1 className={`mt-3 ${anton.className} text-[clamp(2.9rem,8.5vw,7rem)] uppercase leading-[0.98] text-stone-900 dark:text-stone-50`} aria-label="Building Digital Experiences. Improving Real-World Systems.">
              <span className="block">
                {["Building", "Digital"].map((w, i) => (
                  <motion.span key={w} className="mr-4 inline-block" initial={{ opacity: 0, y: 28, filter: "blur(6px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: 0.7, delay: 0.08 + i * 0.09, ease: [0.22, 1, 0.36, 1] }}>{w}</motion.span>
                ))}
                <motion.span className="mr-4 inline-block text-amber-700 dark:text-amber-500" initial={{ opacity: 0, y: 28, filter: "blur(6px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: 0.7, delay: 0.26, ease: [0.22, 1, 0.36, 1] }}>Experiences.</motion.span>
              </span>
              <span className="block">
                {["Improving"].map((w, i) => (
                  <motion.span key={w} className="mr-4 inline-block" initial={{ opacity: 0, y: 28, filter: "blur(6px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: 0.7, delay: 0.35 + i * 0.09, ease: [0.22, 1, 0.36, 1] }}>{w}</motion.span>
                ))}
                <motion.span className="mr-4 inline-block" initial={{ opacity: 0, y: 28, filter: "blur(6px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: 0.7, delay: 0.44, ease: [0.22, 1, 0.36, 1] }}>Real-World</motion.span>
                <motion.span className="mr-4 inline-block text-amber-700 dark:text-amber-500" initial={{ opacity: 0, y: 28, filter: "blur(6px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: 0.7, delay: 0.53, ease: [0.22, 1, 0.36, 1] }}>Systems.</motion.span>
              </span>
            </h1>

            <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.16 }}
              className="mt-6 max-w-xl text-lg leading-relaxed text-stone-600 dark:text-stone-400">
              Computer Science graduate with a passion for software development, intelligent systems, automation, and solving practical business problems through technology.
            </motion.p>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.24 }} className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs uppercase tracking-wide text-stone-600 dark:text-stone-400">
              <span className="font-semibold normal-case tracking-normal text-stone-900 dark:text-white">{hero.name}</span>
              <span aria-hidden="true">·</span>
              <span>{hero.roles.join(" · ")}</span>
              <span aria-hidden="true">·</span>
              <span className="inline-flex items-center gap-1"><MapPin className="h-4 w-4" /> {hero.location}</span>
            </motion.p>

            {/* Dual-track toggle — Logistics × Web. Choosing a track highlights the matching work. */}
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.28 }} className="mt-8" role="group" aria-label="Choose a track">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-stone-500 dark:text-stone-400">I work in two worlds — pick one</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {([
                  { id: "both", label: "Both worlds" },
                  { id: "logistics", label: "Logistics — dispatch, warehouse, routes" },
                  { id: "software", label: "Web — React, Next.js, Apps Script" },
                ] as const).map((o) => (
                  <button key={o.id} type="button" onClick={() => chooseTrack(o.id)} aria-pressed={track === o.id}
                    className={track === o.id
                      ? "rounded-full bg-amber-600 px-4 py-2 text-sm font-semibold text-white"
                      : "rounded-full border border-stone-300 px-4 py-2 text-sm font-medium text-stone-600 transition hover:border-amber-500 hover:text-stone-900 dark:border-white/15 dark:text-stone-300 dark:hover:text-white"}>
                    {o.label}
                  </button>
                ))}
              </div>
              <p className="mt-2 text-xs text-stone-500 dark:text-stone-400" aria-live="polite">
                {track === "logistics" ? "Showing logistics & operations work — the Driver Check-in System leads."
                  : track === "software" ? "Showing software & data work — full-stack apps and internal tools."
                  : "Logistics and web, together — the dispatch system is where they meet."}
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.32 }} className="mt-6 flex flex-wrap gap-3">
              <Magnetic><Link href="#projects" className="btn-primary">Explore My Work <ArrowRight className="h-4 w-4" /></Link></Magnetic>
              <Magnetic><Link href="#contact" className="btn-ghost">Contact Me <ArrowRight className="h-4 w-4" /></Link></Magnetic>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.42 }} className="mt-8 flex items-center gap-2">
              {socials.map((s) => {
                const Icon = ICONS[s.name] ?? Github;
                return (
                  <motion.a key={s._id} href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.name}
                    whileHover={{ scale: 1.12, rotate: 4, y: -2 }} whileTap={{ scale: 0.9 }} transition={{ type: "spring", stiffness: 400, damping: 18 }}
                    className="grid h-11 w-11 place-items-center rounded-full border border-stone-200 text-stone-600 transition hover:-translate-y-0.5 hover:border-amber-500 hover:text-amber-600 dark:border-white/10 dark:text-stone-300 dark:hover:border-amber-400 dark:hover:text-amber-400">
                    <Icon className="h-5 w-5" />
                  </motion.a>
                );
              })}
              <motion.a href={`mailto:${hero.email}`} aria-label="Email Pawandeep" whileHover={{ scale: 1.12, rotate: 4, y: -2 }} whileTap={{ scale: 0.9 }} transition={{ type: "spring", stiffness: 400, damping: 18 }} className="grid h-11 w-11 place-items-center rounded-full border border-stone-200 text-stone-600 transition hover:-translate-y-0.5 hover:border-amber-500 hover:text-amber-600 dark:border-white/10 dark:text-stone-300 dark:hover:border-amber-400 dark:hover:text-amber-400"><Mail className="h-5 w-5" /></motion.a>
              <span className="ml-2 hidden font-mono text-xs text-stone-500 dark:text-stone-400 sm:block">{hero.email}</span>
            </motion.div>
          </div>

          <motion.aside initial={{ opacity: 0, y: 32, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }} className="space-y-4 lg:pt-24">
            <div className="card-surface relative overflow-hidden p-6 sm:p-7">
              <div className="relative flex items-center gap-4">
                <Image src="/assets/portrait.jpg" alt="Portrait of Pawandeep Singh Thandi" width={150} height={150} className="h-16 w-16 shrink-0 rounded-full object-cover ring-2 ring-amber-600/30" />
                <div>
                  <p className="relative font-display text-2xl leading-tight tracking-tight text-stone-900 dark:text-white sm:text-3xl">Pawandeep Singh Thandi</p>
                  <p className="relative mt-1 font-mono text-[11px] uppercase tracking-[0.2em] text-stone-500 dark:text-stone-400">Full Stack · UI/UX · Graphics</p>
                </div>
              </div>
              <div className="relative mt-5 flex flex-wrap gap-2">
                {["React", "Next.js", "TypeScript", "Google Apps Script", "Figma", "SQL"].map((t, i) => (
                  <motion.span key={t} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + i * 0.08 }} className="chip">{t}</motion.span>
                ))}
              </div>
            </div>
            <div className="card-surface flex items-center justify-between gap-4 px-5 py-4">
              <Image src="/assets/truck-side.svg" alt="Delivery truck carrying a parcel" width={640} height={260} className="h-auto w-full rounded-lg bg-[#faf7f2] dark:bg-white/5" />
              <div className="mt-4 flex items-center gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-amber-600 text-white"><Truck className="h-5 w-5" /></span>
                <div>
                  <p className="text-sm font-semibold text-stone-900 dark:text-white">Driver Check-in System</p>
                  <p className="text-xs text-stone-500 dark:text-stone-400">Featured build · In production at GoBolt</p>
                </div>
              </div>
              <Link href="/projects/driver-check-in-dispatch-system" className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-amber-600 hover:underline dark:text-amber-400">Case study <ArrowRight className="h-4 w-4" /></Link>
            </div>
          </motion.aside>
        </div>

        <motion.a href="#about" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="mt-16 hidden w-fit items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-500 transition hover:text-stone-900 dark:text-stone-400 dark:hover:text-white sm:inline-flex">
          Scroll to explore <ArrowDown className="h-4 w-4 animate-bounce" />
        </motion.a>
        {/* Motion-guided onboarding hint — fades once the visitor starts scrolling. */}
        <AnimatePresence>
          {!scrolled && (
            <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ delay: 1.2 }}
              className="pointer-events-none fixed bottom-6 left-1/2 z-40 -translate-x-1/2 rounded-full bg-stone-900 px-4 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-white shadow-xl dark:bg-white dark:text-stone-900">
              Scroll — the dispatch journey drives itself <ArrowDown className="h-3.5 w-3.5" />
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
