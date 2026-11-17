"use client";

import { Component, Suspense, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { GALLERY_CONFIG } from "@/lib/gallery-config";
import { imageUrl } from "@/lib/sanity";
import type { Artwork } from "@/lib/types";

/**
 * The frame's on-screen rect (viewport / client pixels), computed at click
 * time by projecting the frame through the camera. The viewer uses it for
 * the Apple-style wrap animation (image grows out of its frame, and wraps
 * back into it on close). Null when it cannot be computed — the viewer
 * then falls back to a centred fade/scale.
 */
export interface OriginRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

/** Catches a failed texture load so one bad image can never crash the canvas. */
class TextureErrorBoundary extends Component<{ fallback: ReactNode; children: ReactNode }, { failed: boolean }> {
  constructor(props: { fallback: ReactNode; children: ReactNode }) {
    super(props);
    this.state = { failed: false };
  }
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    /* texture failed — fallback mesh renders instead */
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

function TexturedArt({ url, w, h }: { url: string; w: number; h: number }) {
  const tex = useTexture(url) as THREE.Texture;
  useMemo(() => {
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 4;
  }, [tex]);
  return (
    <mesh position={[0, 0, 0.065]}>
      <planeGeometry args={[w - 0.18, h - 0.18]} />
      <meshStandardMaterial map={tex} roughness={0.85} />
    </mesh>
  );
}

function PlaceholderArt({ w, h }: { w: number; h: number }) {
  return (
    <mesh position={[0, 0, 0.065]}>
      <planeGeometry args={[w - 0.18, h - 0.18]} />
      {/* Warm placeholder — never a broken-image icon. Title is on the strip below. */}
      <meshStandardMaterial color="#c9b896" roughness={0.9} />
    </mesh>
  );
}

/** Diagonal glass sheen, drawn on a canvas — no image file needed. */
function useGlassTexture() {
  return useMemo(() => {
    const c = document.createElement("canvas");
    c.width = 256;
    c.height = 256;
    const ctx = c.getContext("2d");
    if (!ctx) return null;
    const g = ctx.createLinearGradient(0, 256, 256, 0);
    g.addColorStop(0, "rgba(255,255,255,0)");
    g.addColorStop(0.42, "rgba(255,255,255,0)");
    g.addColorStop(0.5, "rgba(255,255,255,0.55)");
    g.addColorStop(0.58, "rgba(255,255,255,0)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 256, 256);
    const tex = new THREE.CanvasTexture(c);
    return tex;
  }, []);
}

/** Walnut frame box with the generated walnut-grain texture; plain colour if it fails. */
function WalnutFrameBox({ w, h }: { w: number; h: number }) {
  const tex = useTexture(GALLERY_CONFIG.textures.frameWalnut) as THREE.Texture;
  useMemo(() => {
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(2, 2);
  }, [tex]);
  return (
    <mesh castShadow position={[0, 0, 0]}>
      <boxGeometry args={[w + 0.22, h + 0.22, GALLERY_CONFIG.frames.frameDepth]} />
      <meshStandardMaterial map={tex} color="#8a6f4d" roughness={0.55} />
    </mesh>
  );
}

function PlainFrameBox({ w, h }: { w: number; h: number }) {
  return (
    <mesh castShadow position={[0, 0, 0]}>
      <boxGeometry args={[w + 0.22, h + 0.22, GALLERY_CONFIG.frames.frameDepth]} />
      <meshStandardMaterial color={GALLERY_CONFIG.colours.frame} roughness={0.6} />
    </mesh>
  );
}

/**
 * Title strip texture, drawn on a canvas from the Sanity artwork fields:
 * `title` (string, required in schemas/artwork.ts) in small caps, with
 * `year` (date, YYYY) + first `category` in tiny mono underneath. No title
 * in Sanity → "Untitled". Nothing is invented.
 */
function useTitleStripTexture(art: Artwork) {
  return useMemo(() => {
    const title = (art.title ?? "").trim() || "Untitled";
    const yearMatch = String(art.year ?? "").match(/^\d{4}/);
    const year = yearMatch ? yearMatch[0] : "";
    const cat = (art.category ?? [])[0]?.replace(/-/g, " ") ?? "";
    const sub = [year, cat].filter(Boolean).join("  ·  ");
    const c = document.createElement("canvas");
    c.width = 512;
    c.height = 112;
    const ctx = c.getContext("2d");
    if (!ctx) return null;
    const col = GALLERY_CONFIG.colours;
    ctx.fillStyle = col.stripBg;
    ctx.fillRect(0, 0, 512, 112);
    ctx.fillStyle = col.stripGold;
    ctx.fillRect(0, 0, 512, 4);
    ctx.textAlign = "center";
    ctx.fillStyle = col.stripText;
    let size = 40;
    ctx.font = `600 ${size}px Georgia, 'Times New Roman', serif`;
    while (ctx.measureText(title.toUpperCase()).width > 472 && size > 18) {
      size -= 2;
      ctx.font = `600 ${size}px Georgia, 'Times New Roman', serif`;
    }
    ctx.fillText(title.toUpperCase(), 256, sub ? 58 : 72);
    if (sub) {
      ctx.font = `500 24px ui-monospace, 'SF Mono', Menlo, monospace`;
      ctx.fillStyle = "#cbb98f";
      ctx.fillText(sub, 256, 94);
    }
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 4;
    return tex;
  }, [art]);
}

/**
 * Slim dark-bronze title strip hanging just below the frame, same width as
 * the frame. Part of the frame group, so it lifts on hover and is clickable
 * to open the viewer — same as the frame itself.
 */
function TitleStrip({ art, w, h }: { art: Artwork; w: number; h: number }) {
  const tex = useTitleStripTexture(art);
  return (
    <group position={[0, -h / 2 - 0.24, 0.01]}>
      <mesh>
        <boxGeometry args={[w, 0.3, 0.025]} />
        <meshStandardMaterial color={GALLERY_CONFIG.colours.stripBg} roughness={0.7} />
      </mesh>
      {tex && (
        <mesh position={[0, 0, 0.016]}>
          <planeGeometry args={[w - 0.02, 0.28]} />
          <meshStandardMaterial map={tex} roughness={0.7} />
        </mesh>
      )}
      {/* Thin gold top edge — a real glint, not just paint */}
      <mesh position={[0, 0.15, 0.014]}>
        <boxGeometry args={[w, 0.02, 0.028]} />
        <meshStandardMaterial color={GALLERY_CONFIG.colours.stripGold} metalness={0.8} roughness={0.3} />
      </mesh>
    </group>
  );
}

export interface GalleryFrameProps {
  art: Artwork;
  globalIndex: number;
  /** World position of the frame centre (on the wall). */
  position: [number, number, number];
  /** Facing into the corridor: +PI/2 for the left wall, -PI/2 for the right. */
  rotationY: number;
  /** +1 if the frame is on the left wall (normal +x), -1 for the right. */
  normalX: number;
  size: { w: number; h: number };
  /** False for walls outside the active window — renders a placeholder, no texture. */
  textured: boolean;
  /** Called on a real click (drag-guarded) with the frame's on-screen rect. */
  onSelect: (globalIndex: number, originRect: OriginRect | null) => void;
}

/**
 * One physical framed portrait in 3D — v10 modern-classic historical
 * profile: dark walnut outer moulding, stepped gold bevel at the outer edge,
 * slim black inner liner, second gold bevel at the mat edge, gold corner
 * rosettes, bevelled cream mat, artwork plane, faint glass sheen, deep drop
 * shadow, and a dark-bronze title strip below (title + year · category
 * from the Sanity artwork fields). Hover lifts it off the wall toward the
 * viewer with a damped spring.
 *
 * Clicks: v9 drag-distance check — a click only fires if the pointer moved
 * < 6px between down and up, so dragging to look around never opens the
 * viewer. The raw onClick handler was removed for exactly that reason.
 * v10: on click, the frame's on-screen rect is projected through the
 * camera and passed up, so the viewer can wrap open from the frame.
 */
export function GalleryFrame({ art, globalIndex, position, rotationY, normalX, size, textured, onSelect }: GalleryFrameProps) {
  const group = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const downPos = useRef<{ x: number; y: number } | null>(null);
  const glassTex = useGlassTexture();
  const camera = useThree((s) => s.camera);
  const gl = useThree((s) => s.gl);
  const src = imageUrl(art.image, 900);
  const { w, h } = size;
  const lift = GALLERY_CONFIG.frames.hoverLift;

  useFrame((_, delta) => {
    if (!group.current) return;
    const target = hovered ? lift : 0;
    const dt = Math.min(delta, 0.05);
    group.current.position.x = THREE.MathUtils.damp(group.current.position.x, position[0] + normalX * target, 8, dt);
  });

  // Restore the cursor if this frame unmounts while hovered.
  useEffect(() => {
    return () => {
      document.body.style.cursor = "auto";
    };
  }, []);

  /** Project the frame through the camera to its on-screen rect (client px). */
  const computeOriginRect = (): OriginRect | null => {
    const g = group.current;
    if (!g) return null;
    const dom = gl.domElement.getBoundingClientRect();
    if (!dom.width || !dom.height) return null;
    const toScreen = (p: THREE.Vector3) => {
      const v = p.clone().project(camera);
      return {
        x: (v.x * 0.5 + 0.5) * dom.width + dom.left,
        y: (-v.y * 0.5 + 0.5) * dom.height + dom.top,
      };
    };
    const centre = toScreen(g.localToWorld(new THREE.Vector3(0, 0, 0.06)));
    const left = toScreen(g.localToWorld(new THREE.Vector3(-w / 2, 0, 0.06)));
    const right = toScreen(g.localToWorld(new THREE.Vector3(w / 2, 0, 0.06)));
    const top = toScreen(g.localToWorld(new THREE.Vector3(0, h / 2, 0.06)));
    const bottom = toScreen(g.localToWorld(new THREE.Vector3(0, -h / 2, 0.06)));
    const width = Math.hypot(right.x - left.x, right.y - left.y);
    const height = Math.hypot(bottom.x - top.x, bottom.y - top.y);
    if (!width || !height || !Number.isFinite(width) || !Number.isFinite(height)) return null;
    return { x: centre.x - width / 2, y: centre.y - height / 2, width, height };
  };

  const corners: [number, number][] = [
    [-w / 2 - 0.11, h / 2 + 0.11],
    [w / 2 + 0.11, h / 2 + 0.11],
    [-w / 2 - 0.11, -h / 2 - 0.11],
    [w / 2 + 0.11, -h / 2 - 0.11],
  ];

  return (
    <group
      ref={group}
      position={position}
      rotation={[0, rotationY, 0]}
      onPointerDown={(e) => {
        e.stopPropagation();
        downPos.current = { x: e.clientX, y: e.clientY };
      }}
      onPointerUp={(e) => {
        e.stopPropagation();
        const down = downPos.current;
        downPos.current = null;
        if (!down) return;
        const moved = Math.hypot(e.clientX - down.x, e.clientY - down.y);
        if (moved < 6) onSelect(globalIndex, computeOriginRect());
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = "auto";
      }}
    >
      {/* Walnut outer moulding (grain texture; plain colour if it fails) */}
      <Suspense fallback={<PlainFrameBox w={w} h={h} />}>
        <TextureErrorBoundary fallback={<PlainFrameBox w={w} h={h} />}>
          <WalnutFrameBox w={w} h={h} />
        </TextureErrorBoundary>
      </Suspense>
      {/* Stepped gold bevel at the outer edge of the moulding */}
      {[
        { p: [0, h / 2 + 0.085, 0.045] as const, a: [w + 0.17, 0.025] as const },
        { p: [0, -h / 2 - 0.085, 0.045] as const, a: [w + 0.17, 0.025] as const },
        { p: [-w / 2 - 0.085, 0, 0.045] as const, a: [0.025, h + 0.17] as const },
        { p: [w / 2 + 0.085, 0, 0.045] as const, a: [0.025, h + 0.17] as const },
      ].map((t, i) => (
        <mesh key={i} position={[t.p[0], t.p[1], t.p[2]]}>
          <planeGeometry args={[t.a[0], t.a[1]]} />
          <meshStandardMaterial color="#c9a227" metalness={0.85} roughness={0.3} />
        </mesh>
      ))}
      {/* Slim black inner liner between the gold bevel and the mat */}
      {[
        { p: [0, h / 2 + 0.045, 0.045] as const, a: [w + 0.09, 0.02] as const },
        { p: [0, -h / 2 - 0.045, 0.045] as const, a: [w + 0.09, 0.02] as const },
        { p: [-w / 2 - 0.045, 0, 0.045] as const, a: [0.02, h + 0.09] as const },
        { p: [w / 2 + 0.045, 0, 0.045] as const, a: [0.02, h + 0.09] as const },
      ].map((t, i) => (
        <mesh key={i} position={[t.p[0], t.p[1], t.p[2]]}>
          <planeGeometry args={[t.a[0], t.a[1]]} />
          <meshStandardMaterial color="#14100c" roughness={0.4} />
        </mesh>
      ))}
      {/* Second gold bevel at the mat edge */}
      {[
        { p: [0, h / 2 - 0.01, 0.045] as const, a: [w - 0.02, 0.025] as const },
        { p: [0, -h / 2 + 0.01, 0.045] as const, a: [w - 0.02, 0.025] as const },
        { p: [-w / 2 + 0.01, 0, 0.045] as const, a: [0.025, h - 0.02] as const },
        { p: [w / 2 - 0.01, 0, 0.045] as const, a: [0.025, h - 0.02] as const },
      ].map((t, i) => (
        <mesh key={i} position={[t.p[0], t.p[1], t.p[2]]}>
          <planeGeometry args={[t.a[0], t.a[1]]} />
          <meshStandardMaterial color="#c9a227" metalness={0.85} roughness={0.3} />
        </mesh>
      ))}
      {/* Gold corner rosettes — small sphere in a flat gold ring, subtle */}
      {corners.map(([cx, cy], i) => (
        <group key={i} position={[cx, cy, 0.05]}>
          <mesh>
            <torusGeometry args={[0.05, 0.012, 8, 20]} />
            <meshStandardMaterial color="#c9a227" metalness={0.9} roughness={0.25} />
          </mesh>
          <mesh position={[0, 0, 0.01]}>
            <sphereGeometry args={[0.028, 12, 12]} />
            <meshStandardMaterial color="#c9a227" metalness={0.9} roughness={0.25} />
          </mesh>
        </group>
      ))}
      {/* Cream mat */}
      <mesh position={[0, 0, 0.045]}>
        <planeGeometry args={[w, h]} />
        <meshStandardMaterial color={GALLERY_CONFIG.colours.mat} roughness={0.9} />
      </mesh>
      {/* Bevelled mat inner edge — darker cream rim around the artwork opening */}
      {[
        { p: [0, (h - 0.18) / 2 + 0.045, 0.055] as const, a: [w - 0.09, 0.045] as const },
        { p: [0, -(h - 0.18) / 2 - 0.045, 0.055] as const, a: [w - 0.09, 0.045] as const },
        { p: [-(w - 0.18) / 2 - 0.045, 0, 0.055] as const, a: [0.045, h - 0.09] as const },
        { p: [(w - 0.18) / 2 + 0.045, 0, 0.055] as const, a: [0.045, h - 0.09] as const },
      ].map((t, i) => (
        <mesh key={i} position={[t.p[0], t.p[1], t.p[2]]}>
          <planeGeometry args={[t.a[0], t.a[1]]} />
          <meshStandardMaterial color="#ddd2b8" roughness={0.95} />
        </mesh>
      ))}
      {/* Artwork (or warm placeholder when this wall is not active / has no image) */}
      {textured && src ? (
        <Suspense
          fallback={
            <mesh position={[0, 0, 0.065]}>
              <planeGeometry args={[w - 0.18, h - 0.18]} />
              <meshStandardMaterial color="#c9b896" roughness={0.9} />
            </mesh>
          }
        >
          <TextureErrorBoundary
            fallback={
              <mesh position={[0, 0, 0.065]}>
                <planeGeometry args={[w - 0.18, h - 0.18]} />
                <meshStandardMaterial color="#c9b896" roughness={0.9} />
              </mesh>
            }
          >
            <TexturedArt url={src} w={w} h={h} />
          </TextureErrorBoundary>
        </Suspense>
      ) : (
        <PlaceholderArt w={w} h={h} />
      )}
      {/* Glass sheen — faint diagonal reflection over the artwork (v10: dimmer) */}
      {glassTex && (
        <mesh position={[0, 0, 0.075]}>
          <planeGeometry args={[w - 0.18, h - 0.18]} />
          <meshBasicMaterial map={glassTex} transparent opacity={GALLERY_CONFIG.lighting.glassOpacity} depthWrite={false} />
        </mesh>
      )}
      {/* Deeper drop shadow behind the frame, on the wall (frame back is at z -0.04) */}
      <mesh position={[0, -0.06, -0.055]}>
        <planeGeometry args={[w + 0.34, h + 0.34]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.35} depthWrite={false} />
      </mesh>
      {/* Title strip under the frame — title + year · category from Sanity */}
      <TitleStrip art={art} w={w} h={h} />
    </group>
  );
}
