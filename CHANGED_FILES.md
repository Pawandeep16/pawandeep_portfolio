# v14 — Changed files (Chapter type site-wide, horizontal gallery pages, Lucide icons + animated theme switch)

Apply by copying these files over the v13 project folder, then run:
`npm run build` — no `npm install`, no new dependencies.

| File | Change |
|---|---|
| lib/fonts.ts | NEW — shared Anton export (site display face) |
| components/display-heading.tsx | NEW — DisplayHeading: Anton, small raised function words, accent word, Chapter label, giant faint marker, ✦ star |
| components/animated-icon.tsx | NEW — IconButton / IconLink: Lucide icons with spring hover (scale 1.12 + rotate) / tap (0.88) |
| components/gallery-chapter/pager.tsx | NEW — horizontal chapter pager: 600vh scroll area, sticky 100svh window, drag + snap, Prev/Next, dots, counter |
| components/gallery-chapter/chapter.tsx | REWRITTEN — chapter as a compact 100vw × 100svh slide; marker + word reveal driven by `active` |
| components/gallery.tsx | Pager wiring: pagerRef + goToChapter (ring/closing jump to chapters) |
| components/gallery-chapter/fonts.ts | Re-export shim — Anton now lives in lib/fonts.ts |
| components/gallery-chapter/stage.tsx | Lucide ArrowUpRight / ArrowDown replace text arrows; anton from lib/fonts |
| components/gallery-chapter/ring.tsx | anton import from lib/fonts |
| components/gallery-chapter/closing.tsx | Lucide ArrowUpRight icons; spring hover/tap on the pill buttons |
| components/gallery-3d/viewer.tsx | Prev/Next are now motion buttons (hover 1.12 / tap 0.88) |
| components/theme-toggle.tsx | REWRITTEN — animated Sun (rotating rays) / Moon + twinkling Stars, radial wipe + star burst on switch |
| components/ui.tsx | SectionHeading rewritten on DisplayHeading (Anton, Chapter label, marker, accent) |
| components/hero.tsx | Headline in Anton uppercase (same words); Lucide arrows; animated social buttons |
| components/footer.tsx | Sign-off via DisplayHeading (same words); socials via IconLink |
| components/header.tsx | Mobile menu button is now an IconButton |
| components/about.tsx | Chapter I heading + marker ABOUT; airier padding |
| components/skills.tsx | Anton heading + marker SKILLS; airier padding |
| components/experience.tsx | Chapter II heading + marker WORK; airier padding |
| components/education.tsx | Chapter III heading + marker STUDY; airier padding |
| components/projects.tsx | Chapter IV heading + marker PROJECTS; airier padding |
| components/certifications.tsx | Chapter V heading + marker CERTIFIED; viewer buttons are motion buttons; airier padding |
| components/testimonials.tsx | Chapter VI heading + marker VOICES; airier padding |
| components/contact.tsx | Chapter VII heading + marker CONTACT; animated socials; airier padding |
| components/numbers-strip.tsx | Numerals in Anton; airier padding |
| app/providers.tsx | disableTransitionOnChange REMOVED so theme transitions can animate |
| app/globals.css | 0.5s colour transitions on body/header/footer/surfaces for smooth theme switching |
| app/page.tsx | Root div gains transition-colors duration-500 |
| README.md | Added "What's new in v14" note |
| CHANGED_FILES.md | This file (zip root only, not part of the project) |

NOT changed in v14: PenDraw, Sanity data layer, /studio, schemas, dispatch
scene, public/resume.pdf, the v10 borderless viewer behaviour, the v13 stage
+ ring + closing, the v12 3D room files (still on disk, unrendered).
