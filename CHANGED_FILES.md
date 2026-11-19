# v28 — Gallery research quick wins (cumulative: includes v14 + v15 + v16 + v17 + v18 + v19 + v20 + v21 + v22 + v23 + v24 + v25 + v26 + v27)

Apply over v13 (with the v12 patch files), v14, v15, v16, v17, v18, v19,
v20, v21, v22, v23, v24, v25, v26 or v27. This zip brings the project
to v28. After applying, run `npm install --legacy-peer-deps` and then
`npm run build` — it should pass (13 pages). DELETE these files from
your project — they are NOT in this zip:
- components/gallery-chapter/ (whole folder: chapter.tsx, closing.tsx,
  fonts.ts, pager.tsx, ring.tsx, stage.tsx)
- components/pen-draw.tsx
- lib/chapter-config.ts
(components/truck-vector.tsx was already deleted in v23 — keep it
deleted.)

## Changed in v28 (3 files)
- components/gallery-carousel.tsx — the research quick wins:
  * Autoplay is OFF by default. Slides only move when the visitor
    presses Play. Any interaction — arrow, thumbnail, grid, filter —
    stops autoplay permanently until Play is pressed again.
  * The Play button wears a progress ring: the 6s countdown filling
    around it (Pixel Buds pattern). The ring IS the timer — when its
    animation ends, the slide advances — so hovering/focusing freezes
    the ring and the slide together, never out of sync.
  * Arrows are now 48x48 (was 40x35) — the research minimum — still
    grouped at the bottom centre of the card, pen-style.
  * Category filter chips with counts: All (36), Featured (5),
    Digital Art (33), Illustration (27), Print Design (15),
    Photography (9), UI/UX (3), Branding (2), Web Design (1).
    Featured artworks (the 5 flagged featured in the data) also wear
    a small "Featured" pill in the caption.
  * "View all" grid: every work in the current filter as a grid;
    clicking one jumps the slider to it. Esc/backdrop closes, focus
    returns to the button, body scroll locks while open.
  * Counter aria-live is "off" while auto-advancing and "polite"
    when paused, per the W3C carousel pattern.
  * The fullscreen viewer now follows the same filtered list (the
    carousel reports it up via onVisibleChange).
  * Deliberately NOT changed: the caption stays overlaid on the
    image (the pen's design) instead of moving below the stage — the
    dark scrim behind it keeps contrast; the arrows stay at the
    bottom centre instead of moving above the stage, to keep the
    pen's look. The research's Next.js 16 `priority` deprecation does
    not apply here — the project is Next.js 13.5.1, so `priority`
    stays as it is.
- components/gallery.tsx — holds the visible (filtered) list and
  passes it to the viewer, so the viewer steps through the same
  filter the slider shows.
- app/globals.css — one addition: the `gallery-ring` keyframes for
  the autoplay progress ring.

## Kept
- The gallery is MDJAmin's "Animated image slider" (CodePen GgpdKPy):
  one rounded card, the active artwork over a blurred copy of itself
  with feathered edges, the next two as thumbnails peeking out right,
  slides gliding into slots over 0.5s, title/description/"See More"
  rising while un-blurring. "See More" opens the fullscreen viewer;
  thumbnails are clickable; keyboard arrows kept.
- All 36 artworks with their real titles, descriptions, categories,
  years and tools — nothing invented. Filter counts come straight
  from the data (artworks can carry several categories).
- The dormant v12 Three.js room files (components/gallery-3d/*,
  components/gallery-wall.tsx, lib/gallery-config.ts) are untouched —
  still on disk, still unrendered, as before.

## Verified
- Build passes (13 pages, home 238 kB); ESLint clean on touched
  files; no new type errors in touched files (one pre-existing error
  in the dormant gallery-wall.tsx remains, as before).
- Live production render: / → 200. Home HTML contains "Selected
  works.", the "1 / 36" counter, "View all", "Start automatic slide
  advance" (autoplay off by default), the Featured/Digital art/Print
  design/Photography filter chips, and "See More".

## Honest limits
- No visual/interactive browser check was possible here (same as every
  wave). Please try it on your phone and desktop after deploying —
  press Play and watch the ring fill, tap a filter, open "View all"
  and jump to a work. If the ring feels too subtle, say the word.

## Also in this zip: all v14 + v15 + v16 + v17 + v18 + v19 + v20 + v21 + v22 + v23 + v24 + v25 + v26 + v27 files (unchanged from those deliveries)
