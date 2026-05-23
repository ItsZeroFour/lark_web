"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";

interface KissingCTAsProps {
  primary: ReactNode;
  secondary: ReactNode;
}

interface Heart {
  id: number;
  startX: number;
  startY: number;
  driftX: number;
  rise: number;
  scale: number;
  hue: number;
  duration: number;
}

// Easter-egg: only fires when magnetic pull pinches the buttons into actual
// contact. Natural gap is 12px (gap-3); this threshold sits well below it.
const KISS_THRESHOLD = 4;
const HEART_SPAWN_MS = 240;
const LIPS_W = 28;
const LIPS_H = 20;
const HEART_SIZE = 14;

/**
 * Wraps two CTA buttons and reveals a hidden kissing animation when the
 * user's magnetic pull pinches them together. Each button has its own pair
 * of lips anchored to its inner edge (amber for primary, dark+outlined for
 * secondary), and hearts float up from the kiss point. The overlay is
 * pointer-events:none so both buttons stay independently clickable.
 */
export function KissingCTAs({ primary, secondary }: KissingCTAsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // Per-lips position, shared opacity/scale (both fade together).
  const leftX = useMotionValue(0);
  const leftY = useMotionValue(0);
  const rightX = useMotionValue(0);
  const rightY = useMotionValue(0);
  const lipsOpacity = useMotionValue(0);
  const lipsScale = useMotionValue(0.85);

  const [hearts, setHearts] = useState<Heart[]>([]);
  const heartIdRef = useRef(0);
  const lastHeartRef = useRef(0);

  useEffect(() => {
    if (reduce) return;

    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      const row = rowRef.current;
      const container = containerRef.current;
      if (!row || !container) return;
      const [a, b] = Array.from(row.children) as HTMLElement[];
      if (!a || !b) return;

      const ra = a.getBoundingClientRect();
      const rb = b.getBoundingClientRect();
      const cr = container.getBoundingClientRect();

      // Skip when stacked vertically (mobile).
      const horizontal =
        Math.abs(ra.top + ra.height / 2 - (rb.top + rb.height / 2)) <
        ra.height * 0.6;
      if (!horizontal) {
        lipsOpacity.set(0);
        return;
      }

      const isAFirst = ra.left < rb.left;
      const [leftRect, rightRect] = isAFirst ? [ra, rb] : [rb, ra];
      const leftIsPrimary = isAFirst; // primary is the first child (Hero order)

      const gap = rightRect.left - leftRect.right;
      const midY = (leftRect.top + leftRect.bottom) / 2 - cr.top;

      // Each set of lips sits on its OWN button's inner edge.
      const lAnchor = leftRect.right - LIPS_W / 2 - cr.left;
      const rAnchor = rightRect.left + LIPS_W / 2 - cr.left;
      // Amber on primary, outlined on secondary — swap if buttons swap order.
      const amberX = leftIsPrimary ? lAnchor : rAnchor;
      const outlinedX = leftIsPrimary ? rAnchor : lAnchor;

      leftX.set(amberX);
      leftY.set(midY - LIPS_H / 2);
      rightX.set(outlinedX);
      rightY.set(midY - LIPS_H / 2);

      if (gap < KISS_THRESHOLD) {
        const intensity = Math.min(
          1,
          (KISS_THRESHOLD - gap) / (KISS_THRESHOLD + 4),
        );
        lipsOpacity.set(0.55 + intensity * 0.45);
        lipsScale.set(0.85 + intensity * 0.35);

        const kissX = (leftRect.right + rightRect.left) / 2 - cr.left;
        const now = performance.now();
        const interval = HEART_SPAWN_MS / Math.max(0.5, intensity);
        if (now - lastHeartRef.current > interval) {
          lastHeartRef.current = now;
          setHearts((arr) => [
            ...arr,
            {
              id: heartIdRef.current++,
              startX: kissX + (Math.random() - 0.5) * 14,
              startY: midY + (Math.random() - 0.5) * 4,
              driftX: (Math.random() - 0.5) * 38,
              rise: 46 + Math.random() * 26,
              scale: 0.65 + Math.random() * 0.55,
              hue: 338 + Math.random() * 28,
              duration: 1.15 + Math.random() * 0.5,
            },
          ]);
        }
      } else {
        lipsOpacity.set(0);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduce, leftX, leftY, rightX, rightY, lipsOpacity, lipsScale]);

  const removeHeart = (id: number) =>
    setHearts((arr) => arr.filter((h) => h.id !== id));

  return (
    <div ref={containerRef} className="relative">
      <div
        ref={rowRef}
        className="flex w-full flex-col gap-3 xs:w-auto xs:flex-row xs:items-center"
      >
        {primary}
        {secondary}
      </div>

      <div className="pointer-events-none absolute inset-0 hidden xs:block">
        <motion.div
          aria-hidden="true"
          style={{
            x: leftX,
            y: leftY,
            opacity: lipsOpacity,
            scale: lipsScale,
          }}
          className="absolute left-0 top-0 origin-center"
        >
          <LipsAmber />
        </motion.div>
        <motion.div
          aria-hidden="true"
          style={{
            x: rightX,
            y: rightY,
            opacity: lipsOpacity,
            scale: lipsScale,
          }}
          className="absolute left-0 top-0 origin-center"
        >
          <LipsOutlined />
        </motion.div>

        <AnimatePresence>
          {hearts.map((h) => (
            <HeartParticle
              key={h.id}
              heart={h}
              onDone={() => removeHeart(h.id)}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

function HeartParticle({
  heart,
  onDone,
}: {
  heart: Heart;
  onDone: () => void;
}) {
  const baseX = heart.startX - HEART_SIZE / 2;
  const baseY = heart.startY - HEART_SIZE / 2;
  return (
    <motion.div
      aria-hidden="true"
      initial={{ opacity: 0, scale: 0.3, x: baseX, y: baseY }}
      animate={{
        opacity: [0, 1, 1, 0],
        scale: [0.3, heart.scale * 1.15, heart.scale, heart.scale * 0.9],
        x: baseX + heart.driftX,
        y: baseY - heart.rise,
      }}
      transition={{
        duration: heart.duration,
        ease: [0.22, 1, 0.36, 1],
        opacity: { times: [0, 0.18, 0.7, 1], duration: heart.duration },
      }}
      onAnimationComplete={onDone}
      className="absolute left-0 top-0 origin-center"
    >
      <HeartIcon hue={heart.hue} />
    </motion.div>
  );
}

/** Lips on the amber primary button — yellow gradient with a thin dark edge. */
function LipsAmber() {
  return (
    <svg
      width={LIPS_W}
      height={LIPS_H}
      viewBox="0 0 42 32"
      style={{ filter: "drop-shadow(0 1px 1.5px rgba(40,20,0,0.55))" }}
    >
      <defs>
        <linearGradient id="lipAmberTop" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#fde58a" />
          <stop offset="55%" stopColor="#e8b224" />
          <stop offset="100%" stopColor="#7a5604" />
        </linearGradient>
        <linearGradient id="lipAmberBot" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#8a6308" />
          <stop offset="50%" stopColor="#e8b224" />
          <stop offset="100%" stopColor="#fde58a" />
        </linearGradient>
      </defs>
      <path
        d="M 21 14 C 19 7, 14 4.5, 9 6.5 C 4 8, 3.5 13, 6.5 15.5
           C 11 14.5, 16 14.5, 21 15.5 C 26 14.5, 31 14.5, 35.5 15.5
           C 38.5 13, 38 8, 33 6.5 C 28 4.5, 23 7, 21 14 Z"
        fill="url(#lipAmberTop)"
        stroke="rgba(60,35,0,0.7)"
        strokeWidth="0.7"
        strokeLinejoin="round"
      />
      <path
        d="M 6.5 15.5 C 8 23, 14 27, 21 27 C 28 27, 34 23, 35.5 15.5
           C 30.5 17, 26 17, 21 17 C 16 17, 11.5 17, 6.5 15.5 Z"
        fill="url(#lipAmberBot)"
        stroke="rgba(60,35,0,0.7)"
        strokeWidth="0.7"
        strokeLinejoin="round"
      />
      <path
        d="M 13 9.5 Q 17 7.5, 20 9.5"
        stroke="rgba(255,250,220,0.7)"
        strokeWidth="0.7"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

/** Lips on the secondary outlined button — black fill with amber outline. */
function LipsOutlined() {
  return (
    <svg
      width={LIPS_W}
      height={LIPS_H}
      viewBox="0 0 42 32"
      style={{ filter: "drop-shadow(0 0 5px rgba(212, 160, 23, 0.55))" }}
    >
      <path
        d="M 21 14 C 19 7, 14 4.5, 9 6.5 C 4 8, 3.5 13, 6.5 15.5
           C 11 14.5, 16 14.5, 21 15.5 C 26 14.5, 31 14.5, 35.5 15.5
           C 38.5 13, 38 8, 33 6.5 C 28 4.5, 23 7, 21 14 Z"
        fill="#0b0b0c"
        stroke="#d4a017"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M 6.5 15.5 C 8 23, 14 27, 21 27 C 28 27, 34 23, 35.5 15.5
           C 30.5 17, 26 17, 21 17 C 16 17, 11.5 17, 6.5 15.5 Z"
        fill="#0b0b0c"
        stroke="#d4a017"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HeartIcon({ hue }: { hue: number }) {
  const fill = `hsl(${hue}, 82%, 64%)`;
  const glow = `hsla(${hue}, 90%, 70%, 0.7)`;
  return (
    <svg
      width={HEART_SIZE}
      height={HEART_SIZE}
      viewBox="0 0 24 24"
      style={{ filter: `drop-shadow(0 0 6px ${glow})` }}
    >
      <path
        d="M12 21s-7-4.5-7-11a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 6.5-7 11-7 11z"
        fill={fill}
      />
    </svg>
  );
}
