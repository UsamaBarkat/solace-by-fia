/**
 * Ambient sakura petals that drift behind all content.
 * - z-0, pointer-events-none — never blocks taps or reads
 * - First 6 petals always visible; petals 7–14 desktop-only (.petal-desktop)
 * - Entire container hidden by CSS under prefers-reduced-motion (.petal-container)
 * - Pure server component: no JS needed for the CSS media-query logic
 */

type PetalCfg = {
  id: number;
  left: string;
  size: number;
  delay: string;
  duration: string;
  color: string;
};

const PETALS: PetalCfg[] = [
  // ── always visible (mobile + desktop) ───────────────────────
  { id: 1,  left: "4%",  size: 13, delay: "0s",    duration: "14s", color: "#F4B3C5" },
  { id: 2,  left: "18%", size: 11, delay: "2.5s",  duration: "17s", color: "#FCE8EE" },
  { id: 3,  left: "44%", size: 15, delay: "5s",    duration: "11s", color: "#F4B3C5" },
  { id: 4,  left: "64%", size: 12, delay: "7.5s",  duration: "15s", color: "#FCE8EE" },
  { id: 5,  left: "81%", size: 10, delay: "1.5s",  duration: "13s", color: "#F4B3C5" },
  { id: 6,  left: "93%", size: 14, delay: "10s",   duration: "16s", color: "#FCE8EE" },
  // ── desktop-only (hidden on mobile via .petal-desktop) ──────
  { id: 7,  left: "11%", size: 12, delay: "3.5s",  duration: "12s", color: "#F4B3C5" },
  { id: 8,  left: "29%", size: 10, delay: "6.5s",  duration: "18s", color: "#FCE8EE" },
  { id: 9,  left: "54%", size: 13, delay: "12s",   duration: "14s", color: "#F4B3C5" },
  { id: 10, left: "71%", size: 11, delay: "4.5s",  duration: "16s", color: "#FCE8EE" },
  { id: 11, left: "87%", size: 15, delay: "8.5s",  duration: "11s", color: "#F4B3C5" },
  { id: 12, left: "37%", size:  9, delay: "14s",   duration: "19s", color: "#FCE8EE" },
  { id: 13, left: "76%", size: 14, delay: "2s",    duration: "15s", color: "#F4B3C5" },
  { id: 14, left: "23%", size: 11, delay: "11s",   duration: "17s", color: "#FCE8EE" },
];

function PetalSVG({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 20 30" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <path d="M10,0 C18,0 20,12 10,28 C0,12 2,0 10,0 Z" fill={color} opacity="0.72" />
    </svg>
  );
}

export default function FloatingPetals() {
  return (
    <div
      aria-hidden="true"
      className="petal-container fixed inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 0 }}
    >
      {PETALS.map((p) => (
        <div
          key={p.id}
          className={p.id > 6 ? "petal-desktop absolute top-0" : "absolute top-0"}
          style={{
            left: p.left,
            width: p.size,
            height: Math.round(p.size * 1.6),
            animationName: "petal-fall",
            animationDuration: p.duration,
            animationDelay: p.delay,
            animationTimingFunction: "linear",
            animationIterationCount: "infinite",
          }}
        >
          <PetalSVG color={p.color} />
        </div>
      ))}
    </div>
  );
}
