"use client";

import { motion, type MotionValue } from "framer-motion";

/**
 * The dispatch truck as inline vector art (same artwork as
 * public/assets/truck-side.svg, inlined so the wheels can rotate).
 * `wheelRotation` is a MotionValue in degrees, driven by scroll progress
 * in the dispatch scene — the wheels spin as the truck travels.
 */
function Wheel({ cx, rotation }: { cx: number; rotation: MotionValue<number> }) {
  return (
    <g transform={`translate(${cx} 210)`}>
      <motion.g style={{ rotate: rotation }}>
        <g transform="translate(0 0)">
          <circle r="30" fill="#1C1917" />
          <circle r="17" fill="#D6D3D1" />
          <g stroke="#1C1917" strokeWidth="3">
            <line x1="0" y1="-14" x2="0" y2="14" />
            <line x1="-14" y1="0" x2="14" y2="0" />
          </g>
          <circle r="7" fill="#E8590C" />
        </g>
      </motion.g>
    </g>
  );
}

export function TruckVector({ wheelRotation, className }: { wheelRotation: MotionValue<number>; className?: string }) {
  return (
    <svg viewBox="0 0 640 260" className={className} role="img" aria-label="Delivery truck carrying a parcel">
      <defs>
        <linearGradient id="tv-cargo" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F59E0B" /><stop offset="1" stopColor="#E8590C" />
        </linearGradient>
        <linearGradient id="tv-cab" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFF7ED" /><stop offset="1" stopColor="#E7E0D2" />
        </linearGradient>
      </defs>
      <ellipse cx="320" cy="232" rx="280" ry="12" fill="#171410" opacity="0.14" />
      <rect x="30" y="52" width="360" height="148" rx="10" fill="url(#tv-cargo)" />
      <rect x="30" y="52" width="360" height="148" rx="10" fill="none" stroke="#9A3412" strokeWidth="3" opacity="0.35" />
      <line x1="30" y1="86" x2="390" y2="86" stroke="#fff" strokeWidth="3" opacity="0.45" />
      <line x1="30" y1="164" x2="390" y2="164" stroke="#9A3412" strokeWidth="3" opacity="0.3" />
      <g>
        <rect x="140" y="102" width="140" height="48" rx="6" fill="#FFF7ED" />
        <rect x="140" y="102" width="140" height="48" rx="6" fill="none" stroke="#9A3412" strokeWidth="2" />
        <circle cx="162" cy="126" r="10" fill="#E8590C" />
        <path d="M157 126h10M162 121v10" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
        <rect x="180" y="114" width="84" height="6" rx="3" fill="#171410" />
        <rect x="180" y="128" width="60" height="6" rx="3" fill="#78716C" />
      </g>
      <text x="210" y="80" textAnchor="middle" fontFamily="monospace" fontSize="15" fontWeight="700" letterSpacing="3" fill="#FFF7ED">PT DISPATCH</text>
      <rect x="30" y="196" width="560" height="14" rx="6" fill="#292524" />
      <g>
        <path d="M410 200 V96 Q410 72 436 72 H500 Q540 72 560 104 L590 152 Q604 172 604 200 Z" fill="url(#tv-cab)" stroke="#78716C" strokeWidth="3" />
        <path d="M452 88 H500 Q528 88 544 112 L556 138 H452 Z" fill="#BAE6FD" stroke="#0C4A6E" strokeWidth="2.5" />
        <path d="M566 142 H596 Q600 158 600 176 V200 H566 Z" fill="#BAE6FD" stroke="#0C4A6E" strokeWidth="2.5" />
        <rect x="452" y="152" width="96" height="8" rx="4" fill="#E8590C" />
        <circle cx="470" cy="182" r="7" fill="#FDE68A" />
        <path d="M410 200 V96 Q410 72 436 72 H452 V200 Z" fill="#E8590C" opacity="0.9" />
      </g>
      <rect x="596" y="196" width="18" height="22" rx="4" fill="#44403C" />
      <Wheel cx={110} rotation={wheelRotation} />
      <Wheel cx={320} rotation={wheelRotation} />
      <Wheel cx={520} rotation={wheelRotation} />
      <g stroke="#E8590C" strokeWidth="4" strokeLinecap="round" opacity="0.55">
        <line x1="8" y1="96" x2="26" y2="96" /><line x1="2" y1="124" x2="24" y2="124" /><line x1="10" y1="152" x2="26" y2="152" />
      </g>
    </svg>
  );
}
