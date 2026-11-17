PATCH — missing v12 files that v13 needs
==========================================
If you applied the v13 zip and got "aspectFromArtwork is not available",
it means v12 was never applied to your project. The v13 zip did not
include lib/gallery-config.ts (v13 did not change it), so your old
gallery-config.ts has no aspectFromArtwork / frameSizeForArtwork, and
your old lib/sanity.ts, lib/types.ts and lib/fallback-data.ts have no
imageWidth / imageHeight.

Fix: copy these 4 files over your project, then run `npm run build`.
They are the exact v12 versions (from the v12 changed-files zip).

  lib/gallery-config.ts   — exports aspectFromArtwork + frameSizeForArtwork
  lib/sanity.ts           — GALLERY_QUERY now fetches imageWidth/imageHeight
  lib/types.ts            — Artwork type gains imageWidth/imageHeight
  lib/fallback-data.ts    — all 36 artworks carry their real dimensions

After this patch, v13 (already applied) will build. No npm install needed.
