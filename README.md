# Pawandeep Singh Thandi — Premium 2026 Portfolio

A dark-first, premium personal portfolio for Pawandeep Singh Thandi — Full Stack
Developer, UI/UX Designer and Graphic Designer from Mississauga, Ontario.
Live at https://pawandeep-portfolio.vercel.app/

**Stack (preserved from the original project):** Next.js 13.5.1, React 18,
TypeScript, Tailwind CSS 3.3.3, Framer Motion 11, lucide-react, next-themes.
Content is managed in **Sanity** — the UI was rebuilt, the data layer was not.

## Run it

```bash
npm install --legacy-peer-deps   # plain `npm install` fails on a Sanity/Next 13 peer conflict
npm run dev     # http://localhost:3000
npm run build
npm start
```

## What's new in v14 — Chapter type site-wide, horizontal gallery pages, Lucide icons + animated theme switch

- **Gallery typography applied to the whole site.** Anton (tall condensed, `lib/fonts.ts`) is now the site's DISPLAY face. A shared `<DisplayHeading>` (`components/display-heading.tsx`) renders every section heading in Anton, uppercase, with the small raised function-word device ("the", "of", "and", "my" … at half size, raised) and an optional giant faint section marker that wipes in on scroll. The shared `SectionHeading` (`components/ui.tsx`) uses it, so About, Skills, Work, Study, Projects, Certifications, Testimonials and Contact all get it at once. Headings are labelled as chapters in page order — Chapter I About, II Work, III Study, IV Projects, V Certifications, VI What People Say, VII Contact — with giant markers (ABOUT, WORK, STUDY, PROJECTS, CERTIFIED, VOICES, CONTACT). The hero headline keeps its exact words ("Building Digital Experiences. Improving Real-World Systems.") restyled in Anton, and the footer sign-off keeps its words ("Let's build something that works."). Sections are airier too (py-28 sm:py-40). No content, data or order changed.
- **Gallery chapters now slide horizontally.** The six chapters no longer stack vertically — they are pages in a horizontal pager (`components/gallery-chapter/pager.tsx`): a 600vh scroll area with one sticky 100svh window; scrolling down flips through the chapters left to right. Each chapter is exactly 100vw × 100svh (`components/gallery-chapter/chapter.tsx`, rewritten compact: giant marker, split 50/50, word-by-word reveal, collage strip) and its animations fire from an `active` prop when its page is on screen. Controls: Lucide Prev/Next arrows at the sides, chapter dots + a "Chapter II / VI · Works 7–12 of 36" counter at the bottom, and drag left/right with snap to the nearest chapter (a drag never opens an artwork — the following click is swallowed). The cover ring and closing carousel still jump to chapters via `goToChapter` in `components/gallery.tsx`. Reduced motion gets the chapters stacked vertically instead.
- **One icon library, animated everywhere.** lucide-react is the icon library — no new package was added. All ad-hoc text arrows (→, ↓, ↗) became Lucide icons (ArrowRight, ArrowDown, ArrowUpRight); a shared `IconButton`/`IconLink` (`components/animated-icon.tsx`) gives every interactive icon the same spring micro-animation (hover scale 1.12 + slight rotate, tap 0.88) — header menu, gallery Prev/Next + dots, viewer + certification viewer buttons, hero/footer/contact socials.
- **Animated sun / moon / star theme switch** (`components/theme-toggle.tsx`). Light mode shows a slowly rotating Lucide Sun; dark mode a Lucide Moon with two twinkling Stars; switching flips the icon 180° and fires a radial circle wipe out from the button in the new theme's paper colour, with a burst of amber stars. The whole page cross-fades (0.5s colour transitions in `globals.css`) because `disableTransitionOnChange` was removed from `app/providers.tsx` — that flag used to kill transitions on switch. next-themes still owns and remembers the choice; no flash of wrong theme on load.

## What's new in v13 — "Chapter" gallery (reference design system, adapted)

- **The 3D room is superseded, not deleted.** `components/gallery.tsx` no
  longer renders the v12 Three.js room (`components/gallery-3d/` stays on
  disk, untouched; the v12 changed-files zip still has it if the room ever
  needs to come back). The gallery is now a "Chapter" experience built from
  the reference site's **design system only — layout, typography, colours,
  spacing and motion**. None of their copy was reproduced anywhere: no
  headlines, film intros, chapter stories or brand names of theirs; every
  word on the page is original and drawn from Pawandeep's own data
  (artwork titles, categories, counts, years, tools).
- **Opening stage** (`components/gallery-chapter/stage.tsx`): flat cream
  paper ground `#f4f2ef` with a subtle SVG-noise grain (~0.03 opacity); a
  small header row (ABOUT → `#about`, PAWANDEEP THANDI / THE GALLERY
  centred, RESUME ↗ pill → `/resume.pdf`); a centred headline in Anton
  (tall condensed, via `next/font/google` — scoped to the gallery only,
  the rest of the site keeps its fonts) — "STEP INSIDE the GALLERY OF MY
  WORK", with the small function words ("the", "of") at half size, raised
  above the baseline, and "WORK" in the warm dispatch amber `#e8590c`,
  with a small ✦ star above it; two laurel badges drawn as inline SVG
  ("36 WORKS", "DIGITAL ART · 2026"); and a rotating 3D ring of six
  chapter covers in the lower two-thirds. The stage background
  cross-fades to the active chapter's accent as the ring turns; bottom
  chrome reads "MADE BY PAWANDEEP" / "SCROLL ↓ · 36 WORKS".
- **Rotating cover ring** (`components/gallery-chapter/ring.tsx`): CSS 3D
  cylinder (preserve-3d, one cover every 60°), drag left/right to spin,
  mouse-wheel steps, slow auto-advance every 5s, pale backs on the rear
  covers. Each cover is a magazine-cover card in its chapter's colours
  with the chapter title in Anton, the wall's first real artwork image
  below it (via `imageUrl`, original aspect kept) and a one-line
  description at the foot. Clicking a cover spins it to the front, then
  scrolls to its chapter.
- **Six chapters** (`components/gallery-chapter/chapter.tsx`, palette +
  grouping in `lib/chapter-config.ts`): one per wall, in wall order, on
  flat paper grounds — rust/cream, navy/lavender-grey, mauve/pink,
  slate-green/sage, terracotta/cream, ochre/sand. Each opens with a GIANT
  marker word (~250–450px, Anton, accent colour) that wipes in letter by
  letter on scroll, then "Chapter I–VI" + the chapter name. Content in
  three patterns with very large negative space: (a) split 50/50 — first
  artwork full viewport height one side, text column the other; (b)
  centred factual text (max-width 1150px); (c) an offset collage of the
  wall's remaining artworks — staggered, overlapping, full-bleed, never a
  card grid, never a border or shadow. Body copy reveals **word by word**
  on scroll (pale tint of the accent → full colour, Framer Motion
  `useScroll` + per-word `useTransform`); images parallax subtly and
  scale slightly as they enter. All chapter copy is factual, computed from
  the wall's own data (counts, year span, categories, tools, titles) — no
  invented stories. Small white fully-rounded pill cards overlap the
  bottom edge of collage images (45×65px thumbnail + title + category +
  ↗); clicking a pill or any artwork opens the viewer.
- **Closing** (`components/gallery-chapter/closing.tsx`): "Discover more
  from the gallery", two large dark navy pill buttons (~225×85px, white
  text) — "ALL WORKS ↗" (scrolls back to the stage) and "CONTACT ↗"
  (`#contact`) — a low-contrast disclaimer band in tall condensed caps
  ("ALL WORKS © PAWANDEEP SINGH THANDI · DIGITAL ART, ILLUSTRATION AND
  PRINT DESIGN."), and the same six-cover ring again on a ground tinted
  to the last chapter's accent, navigating back to any chapter.
- **Kept:** PenDraw (v6 nib) first and untouched; the Sanity data layer
  (`GALLERY_QUERY`, fallback snapshot, real aspect ratios from v12);
  `/studio`, schemas, split Experience/Study, certification images, the
  dispatch scene, `public/resume.pdf`, and the **v10 borderless viewer +
  Apple-style wrap animation** (every artwork click passes its on-screen
  rect, so the image still warps open from the frame). No new
  dependencies (Framer Motion + next/font only). The gallery section is a
  light paper world in both themes — the site's dark theme is not forced
  onto it. Served homepage HTML greps "Sanity" 0 times in visible text
  (all occurrences are `cdn.sanity.io` image URLs); "Welcome to the
  gallery." is gone with the v11 intro wall.

## What's new in v12 — original-aspect frames, dimmer light, realistic room, royal frames

- **Frames sized to each image's ORIGINAL resolution** — every frame's
  height and width now follow the artwork's real aspect ratio (width ÷
  height), so no image is ever stretched or cropped. Dimensions come from
  Sanity itself: `GALLERY_QUERY` fetches
  `image.asset->metadata.dimensions.width/height` (verified live — all 36
  artworks return real dimensions), and the fallback snapshot in
  `lib/fallback-data.ts` carries the same `imageWidth`/`imageHeight` per
  artwork (taken from the live Sanity data; they match the dimensions
  encoded in each image's asset ref). If dimensions are ever missing, the
  aspect is parsed from the asset ref (`image-<hash>-<W>x<H>-<fmt>`), and
  the last resort is 4:5. Heights are fixed per frame kind (standard 1.85,
  centrepiece 2.55); width = height × aspect, clamped to 0.55–1.9, and a
  single frame never exceeds 2.8 wide. Walls lay frames out sequentially
  with a 0.4 gap, centred as a group; a wall whose six frames would
  overflow its 14-unit span scales down as a whole (one factor per wall,
  verified against the real ratios: scales run 0.78–0.88, so frames stay
  large). All of it lives in `lib/gallery-config.ts`
  (`frameSizeForArtwork`, `aspectFromArtwork`, `frames`), used by
  `components/gallery-3d/wall.tsx`. One note: a single artwork (Wedding
  Card Design) carries a small Sanity crop in its image field, which the
  image CDN may apply — its frame still uses the full asset's dimensions.
- **Lights reduced again — ~35% dimmer than v10** — ambient 0.22 → 0.14,
  hemisphere 0.18 → 0.12, spot 55 → 35, track 22 → 14, sconce 3 → 2,
  camera light 6 → 4, intro spot 20 → 13, end-wall spot 28 → 18;
  emissives (track 1.2 → 0.8, sconce 1.0 → 0.65, ceiling strips 1.1 →
  0.7) and glow opacities (cones 0.02 → 0.013, pools 0.04 → 0.025, dust
  0.3 → 0.2) down proportionally. The room is noticeably moodier than
  v10 — frames readable in their warm pools, everything else receding
  into dark. Track bars widened (7 → 9) because the wider v12 frames span
  wider walls. All values in the config's `lighting` section.
- **More realistic elements** (`components/gallery-3d/room.tsx`, config
  `decor`): a deep-red carpet runner down the corridor centre (gold
  border stripes + diamond pattern, canvas-drawn); darker-wood
  wainscoting along both walls (~1.1 high) with a chair rail and a thin
  gold line; crown moulding where the walls meet the ceiling; an ornate
  chandelier at the corridor's middle (stem, two tiers of warm crystal
  beads, one dim 10 cd point light — inside the v12 lighting budget);
  red velvet cushions on both benches; and fuller plant foliage (six
  spheres per plant, three greens, varied sizes).
- **Royal vintage frames — kings and queens** (`frame.tsx`): a WIDER
  moulding (0.16 per side, frame depth 0.14) in antique gold — bright
  gold outer edge, deeper aged gold with a carved-look ridge, near-black
  outer rim so the gold pops; slim black inner liner; gold inner bevel at
  the mat; larger ornate corner rosettes (centre bead + six petals); and
  a small gold crown crest (three points, middle tallest, beaded tips) on
  centrepiece frames only. Mat, dimmed glass sheen (0.07), deep drop
  shadow, title strip and hover lift all kept.

## What's new in v11 — full turn to face the walls, intro wall first

- **Full left/right turn** — mouse-look yaw limit widened from ±0.45 rad
  (~26°) to **±1.45 rad (~83°)**, pitch from ±0.08 to **±0.15 rad**, so at
  full mouse travel the camera faces the left or right wall head-on and the
  frames fill the view. The camera stays on the centre line (x≈0) in a
  10-wide corridor with frames at x≈±4.92, so ~83° of yaw genuinely faces
  a wall — only the rotation changes, so the camera can never clip through
  one. Inversion is unchanged (`mouseInvert: true` — move right to look
  left). Limits live in `lib/gallery-config.ts` → `camera` (`maxYaw`,
  `maxPitch`); the HUD now says "turn fully to face the walls".
- **Intro empty wall first** — before any portrait, the visitor meets a
  clean, empty panel on the left wall at the entrance (z 6.5–13.5, camera
  starts at z 16) with a message only: "Welcome to the gallery." plus
  "36 works · Scroll to walk through · Move your mouse to look around",
  under one dim warm spotlight. The old "THE GALLERY" entrance sign was
  removed so this is the single message at the start. The strings live in
  `lib/gallery-config.ts` → `signage` (`introTitle` / `introSub`) and the
  panel geometry in `introWall`.
- **Portraits pushed deeper** — `corridor.firstSegmentZ` 8 → 0, so Wall 1
  frames now span z −4.75..+4.75, a clear gap after the intro panel. The
  corridor was extended the same 8 units to keep everything in range:
  end wall −62 → −70, camera end −56 → −64, floor 92 → 100 centred −26
  (spans z −76..+24), end bench/plants and the end spotlight shifted to
  −66.5/−66/−64. Ceiling strips and the rope barrier are now derived from
  `segmentCentreZ()`, so they follow `firstSegmentZ` automatically. The
  intro wall is a preamble, not a portrait wall — it is not in the 6 wall
  dots and does not change the "Showing X of 36" count.

## What's new in v10 — dimmer modern gallery, historical frames, title strips, Apple-style wrap

- **Lighting cut to ~40% of v9** — ambient 0.55 → 0.22, hemisphere 0.5 → 0.18,
  spot 140 → 55, track 60 → 22, sconce 8 → 3, camera light 18 → 6 (distance
  13 → 9), track emissive 3 → 1.2, sconce emissive 2.4 → 1.0, ceiling strips
  2.2 → 1.1, light cones 0.05 → 0.02, floor pools 0.10 → 0.04, dust 0.55 →
  0.30. Fog closes in sooner (14–48 instead of 20–58) and the background is
  a deeper warm near-black (`#100d0a`). The room now reads as a dim, premium
  modern gallery — frames in pools of warm light, corridor fading into soft
  darkness — instead of flat and cartoon-bright. All values live in
  `lib/gallery-config.ts` → `lighting`.
- **End wall redesigned** — the giant bright "Thanks for visiting." sign is
  gone. The end wall now has a tall dark charcoal panel (`#1b1712`, 4.4 ×
  4.53) with an arched gold border and a thin gold frame box behind it, small
  elegant text ("Thanks for visiting." in large serif with letter-spacing, a
  gold rule, name in small mono, "See you at the next exhibition →" in small
  italic serif), one dim spotlight (28 cd), a wooden bench in front of it,
  and the two potted plants flanking it. Strings stay editable in
  `lib/gallery-config.ts` → `signage`.
- **Modern-classic historical frames** — dark walnut moulding, stepped gold
  bevel at the outer edge, slim black inner liner, second gold bevel at the
  mat edge, small gold corner rosettes (sphere in a flat ring), bevelled mat,
  deeper drop shadow, glass sheen dimmed to 0.07.
- **Title strip under every frame** — a slim dark-bronze strip, same width
  as the frame, with the title drawn on it from the Sanity artwork `title`
  field (string, required in `schemas/artwork.ts`, fetched by
  `GALLERY_QUERY`), small caps, plus `year` (date, YYYY) and the first
  `category` in tiny mono underneath. No title in Sanity → "Untitled".
  Nothing is invented. The strip lifts with the frame on hover and is
  clickable. The viewer also shows the title + year + categories.
- **Apple-style wrap animation** — clicking a portrait now opens the viewer
  the way macOS minimises/restores a window: the frame's on-screen rect is
  projected through the camera (`frame.tsx` → `computeOriginRect`, using the
  camera + canvas rect) and passed up as `originRect` (`scene.tsx` →
  `gallery.tsx` → `viewer.tsx`). The image starts at that exact position and
  size and warps into the centred view on a spring (stiffness 300, damping
  30) with a genie-style dip toward the bottom mid-flight, and wraps back
  into the frame on close. Prev/Next crossfade/slide gently. No rect (flat
  fallback / HUD) → centred fade/scale fallback; reduced motion → plain fade.

## What's new in v9 — gallery enhancements (inverted look, clicks, richer room)

- **Inverted mouse look.** `lib/gallery-config.ts` now has `camera.mouseInvert: true`, read in `components/gallery-3d/camera-rig.tsx` (the sign is applied in that one place only). Move the mouse right to look left, left to look right, up to look down, down to look up. Same limits (±0.45 rad yaw, ±0.08 rad pitch) and damping. The HUD says so: "Mouse: inverted look — move right to look left".
- **Clicking portraits actually works.** `frame.tsx` no longer opens the viewer on raw `onClick` — it fires only if the pointer moved < 6 px between pointer-down and pointer-up, so dragging to look around never opens a portrait. Cursor becomes a pointer on hover (and is restored on unmount). The HUD root is `pointer-events-none` with only real buttons getting `pointer-events-auto`, so no overlay swallows frame clicks. A "Click a portrait to view it" hint shows on the first wall and fades after the first portrait is opened. Clicks/mouse inversion were verified in code only — no live-browser click test is possible in this environment.
- **More headings + elements.** An entrance sign ("THE GALLERY / Pawandeep Singh Thandi · 36 works") hangs on the left wall near the entrance, and the HUD now shows a big serif wall heading (name + tagline) that changes per wall. Set dressing in `room.tsx`: a wooden bench midway, two potted plants near the end wall, a pedestal with a small 3D parcel near the entrance, and a rope barrier (gold posts + sagging red rope) in front of the Wall 1 centrepiece.
- **Richer frames.** Gold inner trim, bevelled mat with a darker inner rim, a diagonal glass sheen (canvas-drawn gradient, opacity 0.10), four gold corner spheres, walnut-grain texture on the frame box, and a deeper drop shadow on the wall.
- **Richer lights.** Ceiling track bars with 3 spot heads per active wall, wall sconces between frames, visible additive light cones under the spotlights, warm light pools on the floor, and ~200 drifting dust motes in the active wall's light (one `Points` object).
- **Wall/floor/frame textures — generated in-house + one CC0 download.** Generated with a Python/PIL script (no image files were copied from anywhere): `public/assets/textures/wall-plaster.png` (warm cream plaster, noise + streaks), `floor-wood.png` (warm planks + grain), `frame-walnut.png` (dark walnut grain). Downloaded: `plaster-cc0-tan.jpg` — "Tan rough cast finish plaster vertical stripes divided building wall texture", by Sisters.seamless, Wikimedia Commons, **CC0** (public domain), downscaled to 1024×1024 — used on the end wall. Nothing is hotlinked; every texture is a local file.
- **End wall — "Thanks for visiting."** The end wall now carries a large canvas-drawn sign: "Thanks for visiting." + "Pawandeep Singh Thandi · Mississauga, Ontario" + "See you at the next exhibition →". The text lives in `lib/gallery-config.ts` under `signage` (edit it there), and the camera's final stop frames the end wall centred. The "Exit gallery ↓" HUD button still scrolls to Certifications.
- No new dependencies. No other sections changed.

## What's new in v7

- **The CSS 3D gallery room is deleted** (`components/gallery-3d/` and
  `lib/gallery-config.ts` are gone). On a real screen it rendered badly: the
  wall was a huge dark slab, frames were cut off at the bottom edge, the
  floor was a black void, the ceiling was black, and the perspective was
  broken. No `translateZ` / `rotateX` perspective room remains anywhere in
  the gallery.
- **2D walls instead.** Each wall is a flat, light 2D asset —
  `public/assets/gallery-wall.svg` (warm cream wall, panel moulding,
  picture rail, skirting) with `public/assets/spotlight-cone.svg` above
  every frame, plus CSS radial-gradient light pools and soft shadows.
  Walls stay light in both themes (the wall asset is dimmed in dark mode
  to a warm charcoal-brown) and the floor is a simple warm wood-tone strip
  under each wall. Every wall fits in the viewport — nothing is clipped.
- **6 portraits per wall, 6 walls, all 36 works.** Artworks are grouped by
  their real Sanity categories (Digital Art, Illustration & Print,
  Portraits & Photography, with "Part 2/3/4" continuations) and chunked
  into walls of 6: a large centrepiece + smaller supporting frames at
  varied heights, each with a spotlight cone, a title plaque, and a hover
  lift. A slim sticky HUD shows the progress bar, wall dots (click to jump
  to a wall) and "Showing X of 36 works"; images mount as their wall
  approaches (next wall preloads). The last wall ends with "End of the
  exhibition — continue" into Certifications.
- **Borderless viewer.** The macOS window is gone — no traffic-light dots,
  no title bar, no border, no minimise/fullscreen. A clicked portrait
  springs from its frame (shared-element `layoutId`) into a large
  borderless image on a darkened backdrop. The ONLY visible buttons are
  Previous (←) and Next (→) at the edges. Close with Esc or by clicking
  the backdrop. Counter and title/year/category sit small under the image,
  with no box around them. Scroll position never changes on close.
- Pen-draw (v6 nib fix), Sanity data layer, split Experience/Study,
  certification images, dispatch scene and the warm amber look are
  untouched.

## What's new in v6

- **Pen-draw bug, fixed for real.** The old sticky box was `h-screen` with a
  huge clamp heading + subline + counter stacked above the frame, so the
  frame scrolled out of view before the animation finished — and the pen
  travelled inside a 64px bordered card, so the whole block went out of
  frame. Now: the sticky box is exactly `100svh`, the heading is one
  compact line (clamp 2rem–3.25rem) with the % inline, and the frame is
  capped at `62vh`, so heading + frame + caption all fit in the viewport.
  The pen is ONLY the nib image itself — `public/assets/pen-nib.svg`
  (48px, transparent, the nib extracted from `pen-tool.svg`, which is a
  320×260 illustrated card with a solid background) — no card, no wrapper
  block, positioned absolutely in the frame with `translate(-50%, -92%)`
  so the nib tip sits on the draw point, travel clamped to x 4–92% /
  y 20–88%, and the frame has `overflow: hidden`. Same three states
  (Sketch → Flat colour → Complete), same spring (60/30), same artwork.
- **Gallery rebuilt as an immersive 3D virtual art gallery** — superseded
  in v7 (the 3D room was removed; see "What's new in v7" above).
  (`components/gallery-3d/`, config in `lib/gallery-config.ts`). CSS 3D
  perspective + Framer Motion — NOT WebGL/Three.js: the same walkthrough
  is achieved with perspective transforms + springs, which keeps the
  Next 13 build and mobile performance reliable, and the scene is split
  into swappable components (`GalleryScene` / `GalleryRoom` / `GalleryWall`
  / `GalleryFrame` / `GalleryCamera` / `GalleryLighting` / `GalleryNavigation`
  / `GalleryProgress` / `PortraitViewer`) so a WebGL renderer could replace
  `GalleryScene` later without touching the data, config, or viewer.
  A ~500vh scroll section drives a spring-smoothed camera (dolly + pan +
  sway) through three walls — Wall 1 "Digital Art", Wall 2 "Illustration &
  Print", Wall 3 "Portraits & Photography" (artworks grouped by their real
  Sanity categories) — with floor, ceiling, side walls, spotlights and
  framed portraits with mats and plaques. Each wall shows one batch of 4
  frames at a time and mounts images only as the camera approaches
  (max 2 walls at full resolution, next wall preloads); when all 36 works
  have been shown the camera glides out and the section hands over to
  Certifications. HUD: "SCROLL TO EXPLORE" hint, wall name + shown count,
  progress bar + working wall dots (scroll to that wall), "Exit gallery"
  control. The portrait viewer is the macOS window from v5 (traffic-light
  title bar, minimise to dock pill, fullscreen, counter, prev/next,
  Esc/arrows, focus management, scroll lock) and closing it leaves the
  camera/scroll exactly where it was. Load More and filter chips are gone
  — the walls ARE the categories, and the walk loads progressively.
  Reduced motion gets a simple vertical list of framed artworks with the
  same viewer; mobile gets a gentler camera and no floor reflection.
  Tune everything in `lib/gallery-config.ts` (section height, camera,
  batches, frame sizes, lighting, colours, wall windows).

## What's new in v5

- **Pen-draw, rebuilt around a real artwork.** `components/pen-draw.tsx` now
  finishes Pawandeep's own vector illustration
  (`public/assets/artwork-forest-saree.webp` — woman in a pink polka-dot
  saree in an autumn forest, copied from his media library, WebP kept as-is)
  live on scroll: Sketch (0–35%) → flat colour (35–70%, clip reveal sweeps
  left → right behind the pen) → Complete (70–100%, scale settles, "Complete"
  pill). One spring (stiffness 60, damping 30) drives the pen cursor along
  an S-curve, its dashed bezier trail, and the anchor points. Reduced motion
  shows the finished artwork statically. The old abstract-parcel pen-draw
  is deleted. The pen-draw sits at the top of the Gallery section; the
  gallery grid pops up with a staggered spring reveal after it completes.
- **Gallery, fully redesigned.** Vertical editorial masonry only — the
  horizontal-scroll strip is removed entirely. Mixed feature/tall/wide/arch
  tiles, per-column parallax, filter chips with counts, "Showing X of 36
  works", Load More (first 8, +8 per click, Show less reset, filtering
  resets to 8). Lightbox rebuilt as a macOS window: shared-element spring
  from the clicked thumbnail (`layoutId`, stiffness 260, damping 26),
  traffic-light title bar (red = close, yellow = minimise to a dock pill,
  green = fullscreen), title in the title bar, Esc/arrows/counter/caption/
  fullscreen, body scroll lock, focus return.
- **Alignment.** Testimonials ("What people say.") and Contact headings are
  now left-aligned like the rest of the page — no `align="center"` remains
  in either component.

## What's new in v4

- **Real vector assets — not icons only.** Hand-drawn SVGs in `public/assets/`:
  `truck-side.svg` (detailed side-view delivery truck), `parcel-box.svg`
  (isometric parcel), `warehouse.svg` (dock scene), `route-map.svg`
  (warehouse → destination route), `pen-tool.svg` (pen-tool cursor with
  bezier handles). Plus two downloaded, permissively licensed SVGs, stored
  locally (never hotlinked):
  - `web-delivery-truck.svg` — "613-delivery-truck.svg", Wikimedia Commons,
    CC BY 4.0. Used in the Experience dual strip.
  - `web-closed-box.svg` — "Closed box juliane krug.svg" by Juliane Krug,
    Wikimedia Commons, CC0 (public domain). Used in the Contact Hire-me card.
  The truck art is also inlined as `components/truck-vector.tsx` so its
  wheels can spin with scroll.
- **Dispatch scroll scene, rebuilt with the vector truck.** The truck now
  carries the isometric parcel, its wheels rotate with scroll progress
  (~3 turns across the journey), with speed lines, a dust trail, the
  warehouse SVG at the start and a destination pin at the end. Same 4 real
  R24 stages, same scroll % and "Scroll to drive the route" label.
- **Experience and Study are split.** `components/experience.tsx` is work
  only (03 — Experience, with a Logistics × Web dual strip and the warehouse
  art); new `components/education.tsx` is study only (04 — Study, degree
  cards with big serif degree names and large mono GPA numerals — not a
  timeline). Nav (header + footer) and the page order now list both.
- **Certification images shown.** `components/certifications.tsx` now renders
  each certificate's real Sanity image (`imageUrl(c.image)`) with a
  click-to-enlarge lightbox (Esc/arrows/counter). Missing image → a clean
  "Certificate image not available" panel, never a broken image. The
  fallback snapshot already carried all four image asset refs (verified).
- **Gallery, real 2026 UI.** Sticky oversized "Artwork." intro + a
  scroll-driven pen-tool animation (`components/pen-draw.tsx`: the vector
  parcel draws itself stroke by stroke, anchor points and bezier handles
  appearing as you scroll; static finished shape under reduced motion),
  a horizontal-scroll featured strip on desktop (vertical on mobile/reduced
  motion), then an editorial flow with mixed shapes. **Load More:** only the
  first 8 works show; each click reveals 8 more, with "Showing X of N" and
  a Show less reset; filtering resets the count to 8. Lightbox unchanged.
- **Logistics × Web, everywhere.** Dual-track toggle in the hero
  (Both / Logistics / Web) that filters the Projects section, a
  "Logistics × Web — where they meet" crossover strip in About (Driver
  Check-in, internal GoBolt tools, ERP Next), and the warehouse art in
  Experience. Magnetic spring hover on the hero CTAs, a first-visit scroll
  hint pill that fades once you scroll, and the scroll-progress bar.
- **Fluid, bold typography.** Display type now uses `clamp()` everywhere
  (hero `clamp(2.9rem, 8.5vw, 7rem)`, section titles `clamp(2rem, 5vw, 4rem)`,
  gallery `clamp(3.5rem, 9vw, 7.5rem)`), plus a heavy uppercase
  "LOGISTICS × WEB" line in the hero and a slim sticky side index on desktop
  (section numbers 01–10, active section highlighted) — typography as
  navigation. `scroll-behavior: smooth` (auto under reduced motion); no new
  dependencies were added for smoothness.

## What's new in v3

- **Last CMS tag removed — for real.** The "Sanity Studio" tag that still
  showed on the Portfolio Website project card (it came from the CMS data
  itself) is gone: removed from `lib/fallback-data.ts`, and
  `lib/utils.ts:visibleTags()` filters it out of every project tag list at
  render time, so it can never reappear from live Sanity either. The four
  quoted lines from the v2 feedback ("Content managed in Sanity…",
  "Word for word from Sanity…", "Four certifications from Sanity…",
  "36 pieces from Sanity…") were already absent from the site in v2 and
  remain absent — verified by grepping the served homepage HTML.
- **Whole look rebuilt — less "AI template".** New typography:
  Instrument Serif (display headlines, italic accent words), Inter (body),
  JetBrains Mono (section numbers like "01 — About", status pills).
  New palette: warm near-black `#0F0E0C`, warm off-white `#F5F1EA`,
  warm paper `#FAF7F2`, dispatch amber/orange `#E8590C` as the only accent
  — the blue/violet gradient is gone everywhere. Film-grain overlay,
  hairline borders instead of glass cards, sharper corners, editorial
  left-aligned serif headlines, numbered sections, and a big serif footer
  sign-off ("Let's build something that works.").
- **Gallery rebuilt.** Editorial masonry with varied shapes (feature,
  tall, wide, arch-shaped tiles), per-column parallax, filter chips with
  counts, "36 works" count, and a full lightbox: Esc/←/→, prev/next,
  counter, caption + year + tools + client, fullscreen toggle,
  backdrop-click close, focus management, body scroll lock, empty-filter
  state with reset.
- **Dispatch journey is now a real 3D scroll scene.** A perspective road
  (`rotateX` ~55° → 8°, scale 0.85 → 1) flattens and zooms toward the
  viewer as you scroll; the truck travels it with a growing shadow,
  skyline and road markings parallax at different speeds, and the active
  stage card lifts toward the viewer with a large crossfading serif
  title. Same 4 real stages (Check-in → Loading → Serving → Complete).
  Reduced motion renders a static list. No three.js — Framer Motion +
  CSS 3D only.

## What's new in v2 (enrichment)

- **No CMS wording in the visitor UI.** Nothing on the site mentions Sanity
  or where the content comes from — the footer is just
  "© 2026 Pawandeep Singh Thandi · Mississauga, Ontario". Sanity is still the
  data layer; only the wording is gone from what visitors see.
- **Less text, more visual.** Every section intro is one short line.
  Experience items collapse to a 2-line summary + top 2 bullets with a
  "Read more" expand. Project cards show title + one line + tags only.
- **Apple-style scroll animations.** Sections scale 0.96 → 1 and fade as
  they enter, the hero headline reveals word by word, and a thin amber
  scroll-progress bar runs under the header. All of it is disabled when the
  visitor prefers reduced motion.
- **Dispatch journey.** A tall sticky scroll section between Projects and
  Gallery: a truck travels the route Check-in → Loading → Serving →
  Complete as you scroll, with a status pill and scroll % (labelled
  "Scroll to drive the route" — an illustration, not live data). A compact
  version sits on the Driver Check-in case-study page. Reduced motion shows
  a plain static list instead.
- **By the numbers + tools marquee.** Real counts only (8 projects incl.
  Driver Check-in, 36 artworks, 4 certifications, 3 roles, 2 degrees) and a
  scrolling strip of tools actually used.

## Edit the content — in Sanity, not in code

- Sanity Studio is built into the site at **`/studio`** (sign in with the
  Sanity account for project `0yo7qjoj`, dataset `production`).
- Content types in `schemas/`: `hero`, `skillCategory`, `skill`, `education`,
  `experience`, `project`, `certification`, `artwork`, `testimonial`,
  `socialLink`, plus the `journeyStage` object type (see below). The original
  10 document types are unchanged; the `project` type only gained optional
  fields.

## New in the project schema (fill these in Studio)

The `project` document now has optional fields — all empty until you fill
them in, and the site handles missing detail gracefully ("Full write-up
coming soon"):

- `category` — Logistics & Operations / Software & Data / Design (drives the
  homepage project filters).
- `internal` — tick for systems with no public demo or public repo.
- `problem`, `solution`, `contribution` — text fields for a full case study.
- `features`, `challenges` — lists of strings.
- `journey` — a list of `journeyStage` objects (`title` max 3 words,
  `line` max 10 words, `status` short uppercase pill). This powers the
  scroll journey on the case-study page; the Driver Check-in journey
  (Check-in → Loading → Serving → Complete) is the example to copy.

The Driver Check-in project's real values for all of these fields live in
`lib/featured-projects.ts` — copy them into a new `project` document in
Studio, then delete the local entry (see the note below). The other 7
projects have these fields empty in the snapshot (`lib/fallback-data.ts`)
on purpose — fill them in Studio when you want a deeper case study for one,
and the case-study page will render the full Problem / Solution / Features /
Contribution / Challenges sections automatically.
- Every section on the homepage fetches its content from Sanity in the
  browser (`lib/sanity.ts` — same GROQ queries as the original). Edit in
  Studio, refresh the site, and the new content appears.
- Config: `sanity.config.ts` (projectId `0yo7qjoj`, dataset `production`),
  `.env.local` (`NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`).

## Fallback data — last-known snapshot only

`lib/fallback-data.ts` is a copy of the real Sanity content as of **5 Nov 2026**.
It is used **only** if a Sanity fetch fails or returns empty, so the site
never shows invented content again. The original code's fake fallbacks
(AWS Solutions Architect certificate, "Full Stack Developer at GoBolt",
"Sarah Johnson, CEO of TechStart", generic "Fallback Project") were removed.
If Sanity changes, refresh this snapshot from Sanity — don't make things up.

## Driver Check-in project — local entry for now

The Driver Check-in & Dispatch Management System is **not in Sanity yet**.
It lives as one clearly-marked local entry in `lib/featured-projects.ts`,
shown first in Projects with its case-study page at
`/projects/driver-check-in-dispatch-system`.

> **When you add it as a `project` document in Sanity, delete the local
> entry** (remove it from `lib/featured-projects.ts` and the import in
> `components/projects.tsx` / `components/case-study-client.tsx`).

It is an internal production system at GoBolt — there is no public demo or
public repo, and no spreadsheet ID or Apps Script URL is published anywhere
in this project.

## Resume

`public/resume.pdf` is the **Nov 3 dev ATS resume**
(`pawandeep-resume-dev-ats.pdf`). To swap it, replace that file — the
Download Resume buttons link to `/resume.pdf`.

## Contact form

- With `NEXT_PUBLIC_EMAILJS_SERVICE_ID`, `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`
  and `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` set in `.env.local`, the form sends
  via EmailJS (see `.env.local.example`). No keys are hardcoded anywhere.
- Without them, the form opens the visitor's email client with a pre-filled
  message to thandipawandeep@gmail.com. The direct email link is always shown.

## Notes / things to update in Sanity

- **GoBolt dates:** Sanity still shows Team Lead, Parcel from Aug 2024 as
  current. Pawandeep's Nov 3 resume says **May 2024 – November 2026** and he
  resigned on 3 Nov 2026. Update the GoBolt `experience` document in Sanity
  when ready — the timeline section already flags this on the site.
- **Catalyst dates:** the site uses the Sanity dates (May 2023 – Jul 2024);
  his old resume PDF said Jun 2023 – May 2024. Sanity is the source used here.
- **Case-study detail:** Sanity projects only store a short description,
  tags and links, so their case-study pages say that honestly instead of
  inventing problem/solution detail. Add detail to a Sanity project document
  if you want a deeper case study for it.

## Structure

```
app/                  layout, homepage, /projects/[slug], /studio, sitemap, 404
components/           header, footer, hero, about, skills, experience,
                      projects, project-visual, gallery, certifications,
                      testimonials, contact, contact-form, theme-toggle, ui
lib/                  sanity.ts (client + GROQ), types.ts,
                      fallback-data.ts (5 Nov 2026 snapshot),
                      featured-projects.ts (Driver Check-in, local only),
                      email.ts (env-based EmailJS), utils.ts
sanity/ schemas/      Sanity Studio config + unchanged schemas
public/resume.pdf     Nov 3 dev ATS resume
```

## What's new in v8 — real 3D gallery room

The flat 2D walls (v7) and the CSS-3D room (v6) are gone. The gallery is now
a real WebGL room built with **Three.js 0.160.0 + React Three Fiber 8.15.19 +
drei 9.99.0** (install: `npm install --legacy-peer-deps three@0.160.0
@react-three/fiber@8.15.19 @react-three/drei@9.99.0`, plus
`@types/three@0.160.0` as a devDependency).

- One sticky `100svh` view window inside a `500vh` scroll area. Page scroll
  dollies the camera inwards through a corridor (entrance z +16 → end z −56);
  moving the mouse looks left/right (±0.45 rad yaw). Scroll progress is
  smoothed by a Framer Motion spring and read by the camera rig through a
  mutable ref, so React never re-renders per frame.
- The room is real geometry: floor, ceiling, two long walls, end wall,
  skirting, ceiling light strips, warm spotlights above each wall, fog for
  depth. 36 real artworks from Sanity, grouped into 6 wall segments × 6
  portraits, alternating left/right walls. Frames are walnut boxes with a
  cream mat; hover lifts a frame off its wall, click opens the borderless
  viewer (Prev/Next only, Esc/backdrop to close).
- Only the current wall ±1 mounts full-resolution textures; the next wall's
  textures preload as the camera approaches. If WebGL is unavailable or the
  visitor prefers reduced motion, the v7 flat 2D walls render instead
  (`components/gallery-wall.tsx`, kept as the fallback) with the same viewer.
- All tuning lives in `lib/gallery-config.ts` (corridor size, camera,
  spring, frame sizes, lighting, colours). The scene is split into
  `components/gallery-3d/` (scene, room, wall, frame, lighting, camera-rig,
  navigation, viewer, config) so a different renderer could replace the
  scene without touching data, config, or the viewer.
- The R3F scene is loaded with `next/dynamic` + `ssr: false`, so no
  Three.js code runs during SSR or the server build.
