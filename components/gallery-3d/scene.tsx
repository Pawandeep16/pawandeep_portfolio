"use client";

import { Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { GALLERY_CONFIG } from "@/lib/gallery-config";
import { imageUrl } from "@/lib/sanity";
import type { GalleryWallData } from "@/components/gallery-wall";
import { CameraRig, type CameraRigShared } from "@/components/gallery-3d/camera-rig";
import { Room } from "@/components/gallery-3d/room";
import { Lighting } from "@/components/gallery-3d/lighting";
import { WallSegment } from "@/components/gallery-3d/wall";
import type { OriginRect } from "@/components/gallery-3d/frame";

export interface GallerySceneProps {
  walls: GalleryWallData[];
  /** Indices of walls allowed to mount full-resolution textures (current ±1). */
  activeWalls: Set<number>;
  shared: React.MutableRefObject<CameraRigShared>;
  /** (globalIndex, originRect) — originRect is the frame's on-screen rect,
   *  used by the viewer for the Apple-style wrap animation. */
  onSelect: (globalIndex: number, originRect: OriginRect | null) => void;
}

/**
 * The real WebGL gallery room. This file is ONLY ever imported via
 * next/dynamic with ssr:false (see components/gallery.tsx), so no
 * @react-three/* code ever runs during SSR or the server build.
 */
export function GalleryScene({ walls, activeWalls, shared, onSelect }: GallerySceneProps) {
  // Preload the next wall's textures as the camera approaches it.
  useEffect(() => {
    const next = [...activeWalls].map((i) => i + 1).filter((i) => i >= 0 && i < walls.length);
    next.forEach((i) => {
      walls[i].items.forEach((art) => {
        const url = imageUrl(art.image, 900);
        if (url) {
          try {
            useTexture.preload(url);
          } catch {
            /* preload is best-effort */
          }
        }
      });
    });
  }, [activeWalls, walls]);

  return (
    <Canvas
      shadows
      dpr={[1, 1.75]}
      camera={{
        fov: GALLERY_CONFIG.camera.fov,
        near: GALLERY_CONFIG.camera.near,
        far: GALLERY_CONFIG.camera.far,
        position: [0, GALLERY_CONFIG.camera.y, GALLERY_CONFIG.camera.startZ],
      }}
      gl={{ antialias: true }}
      className="!absolute !inset-0"
      aria-label="3D art gallery room — scroll to walk through it, move your mouse to look around"
    >
      <color attach="background" args={[GALLERY_CONFIG.colours.background]} />
      {/* v10: fog closes in sooner — the far corridor fades into soft darkness */}
      <fog attach="fog" args={[GALLERY_CONFIG.colours.fog, 14, 48]} />
      <CameraRig shared={shared} />
      <Lighting walls={walls} activeWalls={activeWalls} />
      <Room />
      <Suspense fallback={null}>
        {walls.map((wall, i) => (
          <WallSegment key={wall.id} wall={wall} index={i} active={activeWalls.has(i)} onSelect={onSelect} />
        ))}
      </Suspense>
    </Canvas>
  );
}
