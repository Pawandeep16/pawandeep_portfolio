// ---------------------------------------------------------------------------
// Gallery configuration — v11 (full left/right turn to face the walls;
// intro empty wall with a message first, portraits after). Single tuning
// file for the 3D gallery room. The scene reads everything from here;
// there are no hardcoded magic numbers in the meshes.
// ---------------------------------------------------------------------------

import * as THREE from "three";

export const GALLERY_CONFIG = {
  /** Tall scroll area; the sticky 100svh window inside it is the camera. */
  sectionHeight: "500vh",

  /** Corridor geometry (three.js world units, 1 unit ≈ 1 m).
   *  v11: first portrait segment moved 8 → 0 so the intro wall owns the
   *  entrance; the corridor was extended the same 8 units (end wall
   *  -62 → -70, floor 92 → 100 centred -26, camera end -56 → -64) so
   *  the last segment (centre -60, frames to -64.75) still clears the
   *  end wall. Floor spans z -76..+24. */
  corridor: {
    width: 10, // x: -5 .. +5
    height: 5.2, // floor y=0 .. ceiling y=5.2
    wallX: 5, // side walls sit at x = ±5
    frameX: 4.92, // frames hang just off the walls
    segmentSpacing: 12, // z distance between wall segments
    firstSegmentZ: 0, // centre z of wall segment 0 (was 8 in v10)
    endWallZ: -70, // far end wall (was -62 in v10)
    floorLength: 100,
    floorCentreZ: -26,
  },

  /** v11: the intro wall — a clean, empty wall panel on the LEFT wall at
   *  the entrance, message only, no frames. The visitor meets it first;
   *  the portraits begin after it (first segment centre z = 0, frames
   *  span z -4.75..+4.75, intro panel spans z 6.5..13.5 — a clear gap). */
  introWall: {
    z: 10, // panel centre z (camera starts at z 16, so ~6 ahead)
    width: 7,
    height: 3.2,
    y: 2.6, // panel centre height
  },

  /** Portraits per wall segment. 6 segments × 6 = all 36 artworks. */
  portraitsPerWall: 6,
  /** Only the current wall ± this many mount full-resolution textures. */
  activeWallRadius: 1,

  /** Camera. Scroll dollies z from start to end; mouse look adds yaw/pitch. */
  camera: {
    fov: 55,
    near: 0.1,
    far: 140,
    y: 1.7,
    startZ: 16,
    endZ: -64, // v11: shifted with the extended corridor (was -56)
    /** Damping lambdas used by THREE.MathUtils.damp each frame. */
    positionLambda: 3.2,
    rotationLambda: 5,
    /** Mouse-look limits (radians).
     *  v11: full turn — maxYaw 0.45 → 1.45 rad (~83°), so at full mouse
     *  travel the camera faces the left or right wall head-on and the
     *  frames fill the view. The camera stays on the centre line (x≈0)
     *  in a 10-wide corridor with frames at x≈±4.92, so ~83° of yaw
     *  genuinely faces a wall — no position change, no wall clipping.
     *  maxPitch 0.08 → 0.15 rad to look up/down at frames at different
     *  heights. */
    maxYaw: 1.45,
    maxPitch: 0.15,
    /**
     * v9: inverted mouse look — move the mouse right to look left, left
     * to look right, up to look down, down to look up. The rig reads
     * this flag; the sign is applied in exactly one place.
     */
    mouseInvert: true,
  },

  /** End-wall signage (CanvasTexture, drawn in code).
   *  v11: the old "THE GALLERY" entrance sign is gone — the intro wall
   *  below is now the single message at the start, so nothing duplicates. */
  signage: {
    /** v11: intro wall message — the first thing the visitor meets. */
    introTitle: "Welcome to the gallery.",
    introSub: "36 works · Scroll to walk through · Move your mouse to look around",
    endTitle: "Thanks for visiting.",
    endSub: "Pawandeep Singh Thandi · Mississauga, Ontario",
    endCta: "See you at the next exhibition →",
  },

  /** Procedural + downloaded textures (local files, never hotlinked). */
  textures: {
    wallPlaster: "/assets/textures/wall-plaster.png",
    wallPlasterCC0: "/assets/textures/plaster-cc0-tan.jpg",
    floorWood: "/assets/textures/floor-wood.png",
    frameWalnut: "/assets/textures/frame-walnut.png",
  },

  /** Framer Motion spring smoothing the raw scroll progress. */
  scrollSpring: { stiffness: 50, damping: 25, mass: 0.4 },

  /** Frame sizes (world units) — v12: each frame is sized to its
   *  artwork's ORIGINAL aspect ratio. `standardH` / `centrepieceH` are
   *  the ARTWORK heights; the width is height × aspect (clamped), and
   *  the mat + moulding wrap around it. `wallSpan` is the usable z-span
   *  of one wall: same-side segments are 24 apart (spacing 12 × 2), so
   *  14 leaves clear gaps, and opposite-wall segments never collide.
   *  A wall whose 6 frames would overflow it is scaled down as a whole
   *  (one scale factor per wall) so all frames fit — never overlapped. */
  frames: {
    standardH: 1.85, // artwork height, standard frame
    centrepieceH: 2.55, // artwork height, centrepiece
    centreY: 2.45,
    matBorder: 0.15, // cream mat visible around the artwork, each side
    moulding: 0.16, // royal moulding width, each side
    frameDepth: 0.14, // v12: deeper royal moulding (was 0.08)
    gap: 0.4, // z gap between frames on one wall
    wallSpan: 14, // usable z-span of one wall segment
    /** Artwork aspect (w/h) clamp — keeps extreme panoramas/portraits
     *  from breaking the wall. Falls back to 4:5 when no dimensions
     *  can be determined at all. */
    aspectClamp: { min: 0.55, max: 1.9 },
    fallbackAspect: 0.8,
    maxOuterWidth: 2.8, // widest a single frame may be, before scaling down
    hoverLift: 0.28, // how far a hovered frame lifts off its wall
  },

  /** v12 realistic dressing — carpet runner, wainscoting, crown
   *  moulding, chandelier. All in room.tsx; no magic numbers there. */
  decor: {
    carpetWidth: 3.2, // deep-red runner down the corridor centre
    wainscotHeight: 1.1, // darker-wood lower wall panel, both sides
    chairRailY: 1.14, // thin moulding on top of the wainscoting
    crownY: 5.02, // crown moulding where walls meet the ceiling
    chandelierZ: -26, // hangs at the corridor's middle
    chandelierIntensity: 10, // its one dim point light (in the v12 budget)
  },

  /** Lighting. Spot intensity is in candela (three r155+ physical lights).
   *  v10: cut to ~35–45% of v9 — a dim, premium modern gallery. Walls stay
   *  readable, frames sit in pools of warm light, the far corridor fades
   *  into soft darkness. Nothing flat or cartoon-bright.
   *  v12: cut another ~35% from v10 — noticeably dimmer and moodier.
   *  Track bars widened (7 → 9) because v12 frames span wider walls. */
  lighting: {
    ambient: 0.14,
    hemisphere: 0.12,
    spotIntensity: 35,
    spotAngle: 0.7,
    spotPenumbra: 0.7,
    spotDistance: 16,
    spotDecay: 1.2,
    cameraLightIntensity: 4,
    cameraLightDistance: 9,
    shadowMapSize: 1024,
    /** v9: track-head + sconce intensities, dust particle count. */
    trackIntensity: 14,
    trackBarLength: 9,
    sconceIntensity: 2,
    dustCount: 200,
    /** v10: emissive + glow opacities (all read by lighting.tsx / room.tsx). */
    trackEmissive: 0.8,
    sconceEmissive: 0.65,
    ceilingStripEmissive: 0.7,
    coneOpacity: 0.013,
    poolOpacity: 0.025,
    dustOpacity: 0.2,
    glassOpacity: 0.07,
    /** v10: the single dim spotlight on the end-wall panel. */
    endSpotIntensity: 18,
    /** v11: the single dim warm spotlight on the intro wall message. */
    introSpotIntensity: 13,
  },

  /** Colours — warm museum neutrals, never black. */
  colours: {
    background: "#100d0a",
    fog: "#100d0a",
    wall: "#e8ddc9",
    floor: "#8a6b4a",
    floorDark: "#6f543a",
    ceiling: "#efe6d4",
    skirting: "#6f543a",
    frame: "#4e3a24",
    mat: "#f8f3e8",
    plaque: "#e8c97a",
    spotlight: "#ffd9a0",
    /** v10: dark end-wall panel + title strip (dark bronze, cream text). */
    endPanel: "#1b1712",
    endPanelGold: "#c9a227",
    stripBg: "#241d13",
    stripText: "#f2e7cd",
    stripGold: "#c9a227",
    /** v12: royal frame golds (bright outer, aged inner), near-black rim,
     *  carpet red, wainscot wood, chandelier crystal. */
    royalGold: "#d4af37",
    royalGoldBright: "#e3c15a",
    royalGoldAged: "#a8842c",
    royalRim: "#171310",
    carpet: "#7a1f2b",
    carpetGold: "#c9a227",
    wainscot: "#4a3421",
    wainscotRail: "#6f543a",
  },
} as const;

/** v12: the artwork's ORIGINAL aspect ratio (w/h). Prefers the real
 *  asset dimensions (Sanity metadata.dimensions, also in the fallback
 *  snapshot); falls back to parsing the Sanity asset ref, which encodes
 *  dimensions (`image-<hash>-<W>x<H>-<fmt>`); last resort 4:5. */
export function aspectFromArtwork(art: {
  imageWidth?: number;
  imageHeight?: number;
  image?: { asset?: { _ref?: string } };
}): number {
  const F = GALLERY_CONFIG.frames;
  const w = art.imageWidth;
  const h = art.imageHeight;
  if (w && h && w > 0 && h > 0) return w / h;
  const ref = art.image?.asset?._ref ?? "";
  const m = /-(\d+)x(\d+)-/.exec(ref);
  if (m) {
    const rw = Number(m[1]);
    const rh = Number(m[2]);
    if (rw > 0 && rh > 0) return rw / rh;
  }
  return F.fallbackAspect;
}

export interface FrameSize {
  /** Outer frame size (moulding edge to moulding edge). */
  w: number;
  h: number;
  /** The artwork itself — same aspect as the original image, unstretched. */
  artW: number;
  artH: number;
}

/** v12: frame sized to the image's original resolution. Height is fixed
 *  per frame kind (standard / centrepiece); width = height × aspect,
 *  clamped, then the mat + royal moulding wrap around it. The widest a
 *  single frame may be is maxOuterWidth — beyond that the whole frame
 *  scales down proportionally (aspect never changes). */
export function frameSizeForArtwork(
  art: { imageWidth?: number; imageHeight?: number; image?: { asset?: { _ref?: string } } },
  centrepiece: boolean
): FrameSize {
  const F = GALLERY_CONFIG.frames;
  const aspect = THREE.MathUtils.clamp(
    aspectFromArtwork(art),
    F.aspectClamp.min,
    F.aspectClamp.max
  );
  let artH = centrepiece ? F.centrepieceH : F.standardH;
  let artW = artH * aspect;
  const border = 2 * (F.matBorder + F.moulding);
  let w = artW + border;
  let h = artH + border;
  if (w > F.maxOuterWidth) {
    const s = F.maxOuterWidth / w;
    w *= s;
    h *= s;
    artW *= s;
    artH *= s;
  }
  return { w, h, artW, artH };
}

export type GalleryConfig = typeof GALLERY_CONFIG;

/** Wall segment centre z for segment index i. */
export function segmentCentreZ(i: number): number {
  return (
    GALLERY_CONFIG.corridor.firstSegmentZ - i * GALLERY_CONFIG.corridor.segmentSpacing
  );
}

/** Camera z for scroll progress p (0 = entrance, 1 = end of corridor). */
export function cameraZForProgress(p: number): number {
  const { startZ, endZ } = GALLERY_CONFIG.camera;
  return startZ + (endZ - startZ) * p;
}

/** True if this browser can create a WebGL context. Client-only: call
 *  inside useEffect / an event handler, never during SSR. */
export function isWebGLAvailable(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      canvas.getContext("webgl2") ||
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl")
    );
  } catch {
    return false;
  }
}
