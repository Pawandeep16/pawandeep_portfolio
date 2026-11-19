# Portfolio v28 — Gallery research quick wins

Cumulative patch: includes v14, v15, v16, v17, v18, v19, v20, v21, v22,
v23, v24, v25, v26 and v27, so apply it over v13 (with the v12 patch
files), v14, v15, v16, v17, v18, v19, v20, v21, v22, v23, v24, v25, v26
or v27. It brings the project to v28.

Install: replace the files in your project with the ones in this zip
(keep the same paths), DELETE from your project (not in this zip):
components/gallery-chapter/ (the whole folder), components/pen-draw.tsx
and lib/chapter-config.ts — and keep components/truck-vector.tsx
deleted from v23. Then run `npm install --legacy-peer-deps` and
`npm run build` — it should pass with 13 pages.

What changed: the research quick wins are in. Autoplay is off until
you press Play, and a ring around the Play button shows the 6 seconds
ticking down. The arrows are bigger (48px). There are category
filters with counts — All, Featured, Digital Art, Illustration, Print
Design, Photography, UI/UX, Branding, Web Design — and a "View all"
button that opens every work as a grid; tap one and the slider jumps
straight to it. Featured works get a small pill in the caption.

One honest limit, as before: I couldn't check it in a real browser from
here, so please try it on your phone and desktop after deploying.
