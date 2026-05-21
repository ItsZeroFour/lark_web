"use client";

import { motion } from "framer-motion";

interface AmbientMotionProps {
  /** Number of drifting particles. */
  count?: number;
  className?: string;
}

/**
 * Ambient floating particles — slow, sparse, atmospheric.
 * Deterministic positions so server and client render identically.
 */
export function AmbientMotion({ count = 14, className }: AmbientMotionProps) {
  const particles = Array.from({ length: count }, (_, i) => {
    // Deterministic pseudo-random spread from the index.
    const seed = (i * 9301 + 49297) % 233280;
    const rand = seed / 233280;
    const seed2 = (i * 4099 + 1571) % 233280;
    const rand2 = seed2 / 233280;
    return {
      id: i,
      left: `${(rand * 100).toFixed(2)}%`,
      top: `${(rand2 * 100).toFixed(2)}%`,
      size: 1.5 + rand * 2.5,
      duration: 14 + rand2 * 16,
      delay: rand * -20,
      opacity: 0.12 + rand * 0.28,
    };
  });

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ""}`}
    >
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-accent"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
          }}
          animate={{ y: [0, -28, 0], opacity: [p.opacity, p.opacity * 1.8, p.opacity] }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
