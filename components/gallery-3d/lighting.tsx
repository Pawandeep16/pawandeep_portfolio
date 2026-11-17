"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { GALLERY_CONFIG, segmentCentreZ } from "@/lib/gallery-config";
import type { GalleryWallData } from "@/components/gallery-wall";

/** One warm spotlight above a wall segment, aimed at its frames. */
function SegmentSpot({ wall, side }: { wall: GalleryWallData; side: "left" | "right" }) {
  const target = useMemo(() => new THREE.Object3D(), []);
  const index = Number(wall.id.replace("wall-", "")) - 1;
  const centreZ = segmentCentreZ(index);
  const sideX = side === "left" ? -1 : 1;
  const L = GALLERY_CONFIG.lighting;

  return (
    <>
      <primitive object={target} position={[sideX * GALLERY_CONFIG.corridor.frameX, 2.4, centreZ]} />
      <spotLight
        position={[sideX * 3.1, 4.9, centreZ]}
        target={target}
        angle={L.spotAngle}
        penumbra={L.spotPenumbra}
        intensity={L.spotIntensity}
        distance={L.spotDistance}
        decay={L.spotDecay}
        color={GALLERY_CONFIG.colours.spotlight}
        castShadow
        shadow-mapSize-width={L.shadowMapSize}
        shadow-mapSize-height={L.shadowMapSize}
      />
      {/* Visible light cone under the spotlight (additive, faint — v10: barely there) */}
      <mesh position={[sideX * 3.9, 3.7, centreZ]} rotation={[0, 0, sideX * 0.35]}>
        <coneGeometry args={[1.5, 2.6, 20, 1, true]} />
        <meshBasicMaterial color="#ffd9a0" transparent opacity={L.coneOpacity} blending={THREE.AdditiveBlending} depthWrite={false} side={THREE.DoubleSide} />
      </mesh>
      {/* Warm light pool on the floor under the frames */}
      <mesh rotation-x={-Math.PI / 2} position={[sideX * 4.2, 0.02, centreZ]}>
        <circleGeometry args={[1.7, 24]} />
        <meshBasicMaterial color="#ffd9a0" transparent opacity={L.poolOpacity} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
    </>
  );
}

/** Ceiling track bar + 3 spot heads per active wall, aimed at the frames. */
function TrackLights({ wall, side }: { wall: GalleryWallData; side: "left" | "right" }) {
  const index = Number(wall.id.replace("wall-", "")) - 1;
  const centreZ = segmentCentreZ(index);
  const sideX = side === "left" ? -1 : 1;
  const L = GALLERY_CONFIG.lighting;
  return (
    <group>
      {/* Black track bar along the ceiling */}
      <mesh position={[sideX * 3.4, 5.05, centreZ]}>
        <boxGeometry args={[0.12, 0.08, 7]} />
        <meshStandardMaterial color="#1c1a18" roughness={0.5} metalness={0.4} />
      </mesh>
      {[-2.2, 0, 2.2].map((dz) => (
        <group key={dz} position={[sideX * 3.4, 4.95, centreZ + dz]}>
          <mesh rotation={[0.5 * sideX, 0, 0]}>
            <cylinderGeometry args={[0.09, 0.12, 0.28, 12]} />
            <meshStandardMaterial color="#1c1a18" roughness={0.4} metalness={0.5} />
          </mesh>
          <mesh position={[0, -0.16, 0]}>
            <circleGeometry args={[0.08, 12]} />
            <meshStandardMaterial color="#fff2cf" emissive="#ffd9a0" emissiveIntensity={L.trackEmissive} />
          </mesh>
          <pointLight intensity={L.trackIntensity} distance={9} decay={1.4} color="#ffd9a0" position={[0, -0.3, 0]} />
        </group>
      ))}
    </group>
  );
}

/** Wall sconces between frames — small emissive boxes with a warm glow. */
function Sconces({ wall, side }: { wall: GalleryWallData; side: "left" | "right" }) {
  const index = Number(wall.id.replace("wall-", "")) - 1;
  const centreZ = segmentCentreZ(index);
  const sideX = side === "left" ? -1 : 1;
  const x = sideX * (GALLERY_CONFIG.corridor.frameX + 0.05);
  return (
    <group>
      {[-3.8, 3.8].map((dz) => (
        <group key={dz} position={[x, 3.3, centreZ + dz]} rotation={[0, side === "left" ? Math.PI / 2 : -Math.PI / 2, 0]}>
          <mesh position={[0, 0, 0.06]}>
            <boxGeometry args={[0.34, 0.5, 0.1]} />
            <meshStandardMaterial color="#3a2f22" roughness={0.6} />
          </mesh>
          <mesh position={[0, 0, 0.12]}>
            <planeGeometry args={[0.24, 0.38]} />
            <meshStandardMaterial color="#fff2cf" emissive="#ffd9a0" emissiveIntensity={GALLERY_CONFIG.lighting.sconceEmissive} />
          </mesh>
          <pointLight intensity={GALLERY_CONFIG.lighting.sconceIntensity} distance={5} decay={1.5} color="#ffd9a0" position={[0, 0, 0.4]} />
        </group>
      ))}
    </group>
  );
}

/** Dust motes drifting in the light — one Points object, no per-frame allocation. */
function Dust({ centreZ }: { centreZ: number }) {
  const ref = useRef<THREE.Points>(null);
  const { positions, seeds } = useMemo(() => {
    const n = GALLERY_CONFIG.lighting.dustCount;
    const positions = new Float32Array(n * 3);
    const seeds = new Float32Array(n);
    for (let i = 0; i < n; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 1] = Math.random() * 4.5 + 0.3;
      positions[i * 3 + 2] = centreZ + (Math.random() - 0.5) * 10;
      seeds[i] = Math.random() * Math.PI * 2;
    }
    return { positions, seeds };
  }, [centreZ]);
  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return g;
  }, [positions]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    const pos = (ref.current.geometry.getAttribute("position") as THREE.BufferAttribute).array as Float32Array;
    for (let i = 0; i < seeds.length; i++) {
      pos[i * 3 + 1] += Math.sin(t * 0.25 + seeds[i]) * 0.0006;
    }
    ref.current.geometry.getAttribute("position").needsUpdate = true;
  });

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial size={0.035} color="#ffe9c4" transparent opacity={GALLERY_CONFIG.lighting.dustOpacity} sizeAttenuation depthWrite={false} />
    </points>
  );
}

/** A point light that follows the camera so the near wall is always readable. */
function CameraLight() {
  const ref = useRef<THREE.PointLight>(null);
  useFrame(({ camera }) => {
    if (ref.current) {
      ref.current.position.set(camera.position.x, camera.position.y + 0.6, camera.position.z + 0.5);
    }
  });
  return (
    <pointLight
      ref={ref}
      intensity={GALLERY_CONFIG.lighting.cameraLightIntensity}
      distance={GALLERY_CONFIG.lighting.cameraLightDistance}
      decay={1.2}
      color="#ffe9c4"
    />
  );
}

/**
 * Gallery lighting (v10: dimmed to ~40% of v9 — a dim, premium modern
 * gallery): low ambient + hemisphere for base readability, one warm
 * spotlight + track lights + sconces + faint light cones + floor pools per
 * active wall segment, dust in the active wall's light, and a
 * camera-following point light. Only active walls (±1) get the full rig —
 * the rest stay lit by ambient/hemisphere so the corridor fades into soft
 * darkness instead of going black.
 */
export function Lighting({ walls, activeWalls }: { walls: GalleryWallData[]; activeWalls: Set<number> }) {
  const L = GALLERY_CONFIG.lighting;
  const activeCentreZ = walls.length ? segmentCentreZ(Math.min(...activeWalls)) : segmentCentreZ(0);
  return (
    <group>
      <ambientLight intensity={L.ambient} color="#fff2dd" />
      <hemisphereLight args={["#fff2dd", "#6f543a", L.hemisphere]} />
      {walls.map((wall, i) => {
        if (!activeWalls.has(i)) return null;
        const side = i % 2 === 0 ? "left" : "right";
        return (
          <group key={wall.id}>
            <SegmentSpot wall={wall} side={side} />
            <TrackLights wall={wall} side={side} />
            <Sconces wall={wall} side={side} />
          </group>
        );
      })}
      <Dust centreZ={activeCentreZ} />
      <CameraLight />
    </group>
  );
}
