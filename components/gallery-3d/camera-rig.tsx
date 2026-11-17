"use client";

import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { GALLERY_CONFIG, cameraZForProgress } from "@/lib/gallery-config";

export interface CameraRigShared {
  /** Smoothed scroll progress 0..1, written by the parent (Framer Motion spring). */
  progress: number;
  /** Normalised pointer position -1..1, written by the parent's pointermove. */
  mouse: { x: number; y: number };
}

/**
 * Camera rig — the core of the walk. Every frame it reads the shared
 * scroll progress + mouse position (mutable refs, so React never re-renders)
 * and damps the camera toward its target: dolly forward along -Z as the
 * visitor scrolls inwards, plus mouse look left/right (v11: ±1.45 rad yaw,
 * ~83° — a full turn to face the walls head-on) and pitch. The camera
 * stays on the centre line (x≈0); only its rotation changes, so it can
 * never clip through a wall. Everything is clamped.
 */
export function CameraRig({ shared }: { shared: React.MutableRefObject<CameraRigShared> }) {
  const camera = useThree((s) => s.camera);
  const lookTarget = useRef<{ yaw: number; pitch: number; z: number }>({ yaw: 0, pitch: 0, z: GALLERY_CONFIG.camera.startZ });

  useEffect(() => {
    camera.rotation.order = "YXZ";
    camera.position.set(0, GALLERY_CONFIG.camera.y, GALLERY_CONFIG.camera.startZ);
  }, [camera]);

  useFrame((_, delta) => {
    const cfg = GALLERY_CONFIG.camera;
    const p = THREE.MathUtils.clamp(shared.current.progress, 0, 1);
    const mx = THREE.MathUtils.clamp(shared.current.mouse.x, -1, 1);
    const my = THREE.MathUtils.clamp(shared.current.mouse.y, -1, 1);

    lookTarget.current.z = cameraZForProgress(p);
    // v9 inverted mouse look: the sign comes from config (mouseInvert),
    // applied here and nowhere else. Mouse right → look left, mouse
    // up → look down.
    const inv = cfg.mouseInvert ? -1 : 1;
    lookTarget.current.yaw = inv * mx * cfg.maxYaw;
    lookTarget.current.pitch = inv * -my * cfg.maxPitch;

    const dt = Math.min(delta, 0.05);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, lookTarget.current.z, cfg.positionLambda, dt);
    camera.position.x = THREE.MathUtils.damp(camera.position.x, 0, cfg.positionLambda, dt);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, cfg.y, cfg.positionLambda, dt);
    camera.rotation.y = THREE.MathUtils.damp(camera.rotation.y, lookTarget.current.yaw, cfg.rotationLambda, dt);
    camera.rotation.x = THREE.MathUtils.damp(camera.rotation.x, lookTarget.current.pitch, cfg.rotationLambda, dt);
    camera.rotation.z = 0;
  });

  return null;
}
