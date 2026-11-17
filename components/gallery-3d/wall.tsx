"use client";

import { GALLERY_CONFIG, segmentCentreZ } from "@/lib/gallery-config";
import { GalleryFrame, type OriginRect } from "@/components/gallery-3d/frame";
import type { GalleryWallData } from "@/components/gallery-wall";

/**
 * One exhibition wall segment in the corridor: 6 framed portraits hung
 * along one side wall, alternating left/right per segment so the visitor
 * passes them. The middle frame is the centrepiece (larger). Frames only
 * mount textures when this wall is in the active window; otherwise they
 * render as warm placeholders (no texture cost).
 */
export function WallSegment({
  wall,
  index,
  active,
  onSelect,
}: {
  wall: GalleryWallData;
  index: number;
  active: boolean;
  onSelect: (globalIndex: number, originRect: OriginRect | null) => void;
}) {
  const side: "left" | "right" = index % 2 === 0 ? "left" : "right";
  const normalX = side === "left" ? 1 : -1;
  const rotationY = side === "left" ? Math.PI / 2 : -Math.PI / 2;
  const x = (side === "left" ? -1 : 1) * GALLERY_CONFIG.corridor.frameX;
  const centreZ = segmentCentreZ(index);
  const F = GALLERY_CONFIG.frames;

  return (
    <group>
      {wall.items.map((art, i) => {
        const centrepiece = i === Math.floor(wall.items.length / 2);
        const size = centrepiece ? F.centrepiece : F.standard;
        const z = centreZ + (i - (wall.items.length - 1) / 2) * F.spacing;
        return (
          <GalleryFrame
            key={art._id}
            art={art}
            globalIndex={wall.startIndex + i}
            position={[x, F.centreY, z]}
            rotationY={rotationY}
            normalX={normalX}
            size={size}
            textured={active}
            onSelect={onSelect}
          />
        );
      })}
    </group>
  );
}
