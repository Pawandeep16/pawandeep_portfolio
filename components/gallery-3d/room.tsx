"use client";

import { useEffect, useMemo, useState } from "react";
import * as THREE from "three";
import { GALLERY_CONFIG, segmentCentreZ } from "@/lib/gallery-config";

/**
 * The room — real 3D meshes only: textured floor/walls, ceiling, skirting,
 * set dressing (bench, plants, pedestal + parcel, rope barrier), a v11
 * intro wall with a message on the empty left wall at the entrance, and a
 * dark arched "Thanks for visiting." end-wall panel.
 * Warm museum neutrals; the floor is wood-toned, never a black void.
 *
 * Textures are loaded imperatively (TextureLoader + state) so nothing here
 * suspends — a missing texture just falls back to its flat colour.
 * Signage is drawn on a canvas in code (CanvasTexture, offline-safe).
 */

function useLocalTexture(path: string, repeatX = 1, repeatY = 1) {
  const [tex, setTex] = useState<THREE.Texture | null>(null);
  useEffect(() => {
    let alive = true;
    new THREE.TextureLoader().load(
      path,
      (t) => {
        if (!alive) return;
        t.colorSpace = THREE.SRGBColorSpace;
        t.wrapS = t.wrapT = THREE.RepeatWrapping;
        t.repeat.set(repeatX, repeatY);
        t.anisotropy = 4;
        setTex(t);
      },
      undefined,
      () => {
        /* missing texture — flat colour fallback stays */
      }
    );
    return () => {
      alive = false;
    };
  }, [path, repeatX, repeatY]);
  return tex;
}

/**
 * v10 end-wall panel: a tall dark charcoal panel with an arched gold border,
 * drawn on a canvas — small, elegant text, nothing oversized, nothing
 * glowing. Strings come from lib/gallery-config.ts signage so they stay
 * editable. Canvas 700×720 → panel 4.4 × 4.53 world units.
 */
function useEndPanelTexture() {
  return useMemo(() => {
    const s = GALLERY_CONFIG.signage;
    const col = GALLERY_CONFIG.colours;
    const W = 700;
    const H = 720;
    const c = document.createElement("canvas");
    c.width = W;
    c.height = H;
    const ctx = c.getContext("2d");
    if (!ctx) return null;
    ctx.fillStyle = col.endPanel;
    ctx.fillRect(0, 0, W, H);
    // Arched gold border (outer + finer inner line).
    const arch = (inset: number, width: number, alpha: number) => {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = col.endPanelGold;
      ctx.lineWidth = width;
      ctx.beginPath();
      ctx.moveTo(inset, H - inset);
      ctx.lineTo(inset, 180);
      ctx.arc(W / 2, 180, W / 2 - inset, Math.PI, 0);
      ctx.lineTo(W - inset, H - inset);
      ctx.closePath();
      ctx.stroke();
      ctx.restore();
    };
    arch(44, 5, 1);
    arch(60, 2, 0.55);
    ctx.textAlign = "center";
    // Title — large serif, generous letter-spacing, shrunk to fit.
    try {
      (ctx as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing = "4px";
    } catch {
      /* letterSpacing unsupported — plain text still draws fine */
    }
    let size = 58;
    ctx.font = `500 ${size}px Georgia, 'Times New Roman', serif`;
    while (ctx.measureText(s.endTitle).width > W - 140 && size > 30) {
      size -= 2;
      ctx.font = `500 ${size}px Georgia, 'Times New Roman', serif`;
    }
    ctx.fillStyle = col.stripText;
    ctx.fillText(s.endTitle, W / 2, 360);
    try {
      (ctx as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing = "0px";
    } catch {
      /* ignore */
    }
    // Thin gold rule.
    ctx.fillStyle = col.endPanelGold;
    ctx.fillRect(W / 2 - 75, 400, 150, 3);
    // Sub + CTA — small mono / small italic serif.
    ctx.font = `500 25px ui-monospace, 'SF Mono', Menlo, monospace`;
    ctx.fillStyle = "#cbb98f";
    ctx.fillText(s.endSub, W / 2, 462);
    ctx.font = `italic 500 30px Georgia, 'Times New Roman', serif`;
    ctx.fillStyle = col.endPanelGold;
    ctx.fillText(s.endCta, W / 2, 524);
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 4;
    return tex;
  }, []);
}

/**
 * v11 intro wall: a clean, empty panel with a message only — big serif
 * title, a thin gold rule, small mono sub. Light cream panel on the
 * cream wall, dark text, nothing else competing with it. Strings come
 * from lib/gallery-config.ts signage. Canvas 1024×480.
 */
function useIntroTexture() {
  return useMemo(() => {
    const s = GALLERY_CONFIG.signage;
    const W = 1024;
    const H = 480;
    const c = document.createElement("canvas");
    c.width = W;
    c.height = H;
    const ctx = c.getContext("2d");
    if (!ctx) return null;
    ctx.fillStyle = "#efe6d4";
    ctx.fillRect(0, 0, W, H);
    // Hairline gold border — the panel is a quiet plaque, not a poster.
    ctx.strokeStyle = "#c9a227";
    ctx.lineWidth = 3;
    ctx.strokeRect(20, 20, W - 40, H - 40);
    ctx.textAlign = "center";
    // Title — large serif, shrunk to fit.
    let size = 74;
    ctx.font = `500 ${size}px Georgia, 'Times New Roman', serif`;
    while (ctx.measureText(s.introTitle).width > W - 120 && size > 36) {
      size -= 2;
      ctx.font = `500 ${size}px Georgia, 'Times New Roman', serif`;
    }
    ctx.fillStyle = "#2b2118";
    ctx.fillText(s.introTitle, W / 2, 205);
    // Thin gold rule.
    ctx.fillStyle = "#c9a227";
    ctx.fillRect(W / 2 - 60, 248, 120, 3);
    // Sub — small mono.
    ctx.font = `500 26px ui-monospace, 'SF Mono', Menlo, monospace`;
    ctx.fillStyle = "#6f543a";
    ctx.fillText(s.introSub, W / 2, 316);
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 4;
    return tex;
  }, []);
}

function RopeBarrier({ centreZ }: { centreZ: number }) {
  const curve = useMemo(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(-4.35, 0.95, centreZ - 1.6),
        new THREE.Vector3(-4.15, 0.72, centreZ),
        new THREE.Vector3(-4.35, 0.95, centreZ + 1.6),
      ]),
    [centreZ]
  );
  const geo = useMemo(() => new THREE.TubeGeometry(curve, 24, 0.03, 8, false), [curve]);
  return (
    <group>
      {[centreZ - 1.6, centreZ + 1.6].map((z) => (
        <group key={z} position={[-4.35, 0, z]}>
          <mesh position={[0, 0.45, 0]} castShadow>
            <cylinderGeometry args={[0.03, 0.03, 0.9, 10]} />
            <meshStandardMaterial color="#c9a227" metalness={0.8} roughness={0.3} />
          </mesh>
          <mesh position={[0, 0.93, 0]}>
            <sphereGeometry args={[0.05, 12, 12]} />
            <meshStandardMaterial color="#c9a227" metalness={0.85} roughness={0.25} />
          </mesh>
          <mesh position={[0, 0.03, 0]}>
            <cylinderGeometry args={[0.16, 0.18, 0.06, 16]} />
            <meshStandardMaterial color="#3a2f22" roughness={0.6} />
          </mesh>
        </group>
      ))}
      <mesh geometry={geo}>
        <meshStandardMaterial color="#8a1f2d" roughness={0.8} />
      </mesh>
    </group>
  );
}

export function Room() {
  const c = GALLERY_CONFIG.corridor;
  const col = GALLERY_CONFIG.colours;
  const plankXs = [-4, -2.4, -0.8, 0.8, 2.4, 4];
  const wallTex = useLocalTexture(GALLERY_CONFIG.textures.wallPlaster, 6, 2);
  const endWallTex = useLocalTexture(GALLERY_CONFIG.textures.wallPlasterCC0, 2, 2);
  const floorTex = useLocalTexture(GALLERY_CONFIG.textures.floorWood, 3, 18);

  const endPanelTex = useEndPanelTexture();
  const introTex = useIntroTexture();
  const endTarget = useMemo(() => new THREE.Object3D(), []);
  const introTarget = useMemo(() => new THREE.Object3D(), []);
  const intro = GALLERY_CONFIG.introWall;
  const segmentCentres = useMemo(() => Array.from({ length: 6 }, (_, i) => segmentCentreZ(i)), []);

  return (
    <group>
      {/* Floor — wood texture, fallback flat colour */}
      <mesh rotation-x={-Math.PI / 2} position={[0, 0, c.floorCentreZ]} receiveShadow>
        <planeGeometry args={[c.width + 2, c.floorLength]} />
        <meshStandardMaterial map={floorTex ?? undefined} color={floorTex ? "#ffffff" : col.floor} roughness={0.85} metalness={0.05} />
      </mesh>
      {/* Plank lines along the floor */}
      {plankXs.map((x) => (
        <mesh key={x} rotation-x={-Math.PI / 2} position={[x, 0.01, c.floorCentreZ]}>
          <planeGeometry args={[0.05, c.floorLength]} />
          <meshStandardMaterial color={col.floorDark} roughness={0.9} />
        </mesh>
      ))}

      {/* Ceiling */}
      <mesh rotation-x={Math.PI / 2} position={[0, c.height, c.floorCentreZ]}>
        <planeGeometry args={[c.width + 2, c.floorLength]} />
        <meshStandardMaterial color={col.ceiling} roughness={0.95} />
      </mesh>
      {/* Recessed ceiling light strips, one per wall segment — derived
          from the segment centres, so they follow firstSegmentZ (v11) */}
      {segmentCentres.map((z) => (
        <mesh key={z} position={[0, c.height - 0.03, z]}>
          <boxGeometry args={[2.4, 0.06, 0.35]} />
          <meshStandardMaterial color="#fff2cf" emissive="#ffd9a0" emissiveIntensity={GALLERY_CONFIG.lighting.ceilingStripEmissive} />
        </mesh>
      ))}

      {/* Left wall (faces +x) and right wall (faces -x) — plaster texture */}
      <mesh rotation-y={Math.PI / 2} position={[-c.wallX, c.height / 2, c.floorCentreZ]} receiveShadow>
        <planeGeometry args={[c.floorLength, c.height]} />
        <meshStandardMaterial map={wallTex ?? undefined} color={wallTex ? "#ffffff" : col.wall} roughness={0.95} />
      </mesh>
      <mesh rotation-y={-Math.PI / 2} position={[c.wallX, c.height / 2, c.floorCentreZ]} receiveShadow>
        <planeGeometry args={[c.floorLength, c.height]} />
        <meshStandardMaterial map={wallTex ?? undefined} color={wallTex ? "#ffffff" : col.wall} roughness={0.95} />
      </mesh>

      {/* End wall — CC0 tan plaster texture, with the dark arched Thanks panel */}
      <mesh position={[0, c.height / 2, c.endWallZ]}>
        <planeGeometry args={[c.width + 2, c.height]} />
        <meshStandardMaterial map={endWallTex ?? undefined} color={endWallTex ? "#ffffff" : col.wall} roughness={0.95} />
      </mesh>
      {/* Thin gold frame behind the panel — a real rim, not just paint */}
      <mesh position={[0, 2.55, c.endWallZ + 0.03]}>
        <boxGeometry args={[4.6, 4.73, 0.05]} />
        <meshStandardMaterial color={col.endPanelGold} metalness={0.7} roughness={0.35} />
      </mesh>
      {endPanelTex && (
        <mesh position={[0, 2.55, c.endWallZ + 0.07]}>
          <planeGeometry args={[4.4, 4.53]} />
          <meshStandardMaterial map={endPanelTex} roughness={0.9} />
        </mesh>
      )}
      {/* One dim warm spotlight on the end panel */}
      <primitive object={endTarget} position={[0, 2.5, c.endWallZ]} />
      <spotLight
        position={[0, 4.9, -64]}
        target={endTarget}
        angle={0.5}
        penumbra={0.8}
        intensity={GALLERY_CONFIG.lighting.endSpotIntensity}
        distance={14}
        decay={1.2}
        color="#ffd9a0"
      />

      {/* v11 intro wall — empty wall, message only, on the LEFT wall at
          the entrance (panel spans z 6.5..13.5, camera starts at z 16).
          The old "THE GALLERY" entrance sign was removed so this is the
          single message at the start. The portraits begin after it:
          first segment centre z = 0, frames span z -4.75..+4.75. */}
      <mesh position={[-c.wallX + 0.03, intro.y, intro.z]}>
        <boxGeometry args={[0.05, intro.height + 0.2, intro.width + 0.2]} />
        <meshStandardMaterial color="#ddd0b4" roughness={0.95} />
      </mesh>
      {introTex && (
        <mesh rotation-y={Math.PI / 2} position={[-c.wallX + 0.06, intro.y, intro.z]}>
          <planeGeometry args={[intro.width, intro.height]} />
          <meshStandardMaterial map={introTex} roughness={0.9} />
        </mesh>
      )}
      {/* One dim warm spotlight on the intro message */}
      <primitive object={introTarget} position={[-c.wallX, intro.y, intro.z]} />
      <spotLight
        position={[-3.2, 4.9, intro.z]}
        target={introTarget}
        angle={0.55}
        penumbra={0.9}
        intensity={GALLERY_CONFIG.lighting.introSpotIntensity}
        distance={12}
        decay={1.2}
        color="#ffd9a0"
      />

      {/* Skirting boards along both wall bases */}
      <mesh position={[-c.wallX + 0.06, 0.13, c.floorCentreZ]}>
        <boxGeometry args={[0.12, 0.26, c.floorLength]} />
        <meshStandardMaterial color={col.skirting} roughness={0.8} />
      </mesh>
      <mesh position={[c.wallX - 0.06, 0.13, c.floorCentreZ]}>
        <boxGeometry args={[0.12, 0.26, c.floorLength]} />
        <meshStandardMaterial color={col.skirting} roughness={0.8} />
      </mesh>

      {/* Wooden bench against the right wall, midway */}
      <group position={[3.9, 0, -24]}>
        <mesh position={[0, 0.42, 0]} castShadow>
          <boxGeometry args={[0.9, 0.09, 2.4]} />
          <meshStandardMaterial color="#6f543a" roughness={0.7} />
        </mesh>
        {[-1, 1].map((z) => (
          <mesh key={z} position={[0, 0.19, z]}>
            <boxGeometry args={[0.8, 0.38, 0.09]} />
            <meshStandardMaterial color="#3a2f22" roughness={0.7} />
          </mesh>
        ))}
      </group>

      {/* Wooden bench in front of the end-wall panel, facing it (v11: -66.5, shifted with the longer corridor) */}
      <group position={[0, 0, -66.5]} rotation={[0, Math.PI / 2, 0]}>
        <mesh position={[0, 0.42, 0]} castShadow>
          <boxGeometry args={[0.9, 0.09, 2.4]} />
          <meshStandardMaterial color="#6f543a" roughness={0.7} />
        </mesh>
        {[-1, 1].map((z) => (
          <mesh key={z} position={[0, 0.19, z]}>
            <boxGeometry args={[0.8, 0.38, 0.09]} />
            <meshStandardMaterial color="#3a2f22" roughness={0.7} />
          </mesh>
        ))}
      </group>

      {/* Potted plants near the end wall (v11: shifted with the longer corridor) */}
      {[
        { x: -4.1, z: -66, s: 1 },
        { x: 4.1, z: -66.5, s: 0.85 },
      ].map((p, i) => (
        <group key={i} position={[p.x, 0, p.z]} scale={p.s}>
          <mesh position={[0, 0.3, 0]} castShadow>
            <cylinderGeometry args={[0.32, 0.24, 0.6, 16]} />
            <meshStandardMaterial color="#a4552e" roughness={0.8} />
          </mesh>
          {[
            [0, 1.05, 0, 0.42],
            [-0.28, 0.85, 0.1, 0.3],
            [0.26, 0.9, -0.08, 0.32],
          ].map(([x, y, z, r], j) => (
            <mesh key={j} position={[x, y, z]} castShadow>
              <sphereGeometry args={[r, 12, 12]} />
              <meshStandardMaterial color="#3f6b34" roughness={0.9} />
            </mesh>
          ))}
        </group>
      ))}

      {/* Pedestal with a small 3D parcel near the entrance */}
      <group position={[-3.9, 0, 6]}>
        <mesh position={[0, 0.55, 0]} castShadow>
          <boxGeometry args={[0.6, 1.1, 0.6]} />
          <meshStandardMaterial color="#e8ddc9" roughness={0.9} />
        </mesh>
        <mesh position={[0, 1.32, 0]} castShadow rotation={[0, 0.4, 0]}>
          <boxGeometry args={[0.46, 0.36, 0.46]} />
          <meshStandardMaterial color="#d9a441" roughness={0.8} />
        </mesh>
        <mesh position={[0, 1.32, 0]} rotation={[0, 0.4, 0]}>
          <boxGeometry args={[0.48, 0.1, 0.12]} />
          <meshStandardMaterial color="#8a5a1d" roughness={0.8} />
        </mesh>
      </group>

      {/* Rope barrier in front of the Wall 1 centrepiece — follows
          segment 0, so it moves with firstSegmentZ (v11: centre z = 0) */}
      <RopeBarrier centreZ={segmentCentreZ(0)} />
    </group>
  );
}
