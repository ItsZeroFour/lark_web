"use client";

import type { Variants } from "framer-motion";

/**
 * Reveal motion presets — slow, cinematic, intentional.
 * Shared by the <Reveal /> component and any section that staggers children.
 */

export type RevealDirection = "up" | "down" | "left" | "right" | "fade";

const offsets: Record<RevealDirection, { x: number; y: number }> = {
  up: { x: 0, y: 34 },
  down: { x: 0, y: -34 },
  left: { x: 40, y: 0 },
  right: { x: -40, y: 0 },
  fade: { x: 0, y: 0 },
};

/** Variants for a single revealed element. */
export function revealVariants(
  direction: RevealDirection = "up",
  distanceScale = 1,
): Variants {
  const o = offsets[direction];
  return {
    hidden: {
      opacity: 0,
      x: o.x * distanceScale,
      y: o.y * distanceScale,
      filter: "blur(6px)",
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
    },
  };
}

/** Container variants that stagger their children on reveal. */
export function staggerContainer(stagger = 0.12, delay = 0): Variants {
  return {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  };
}

/** Sensible shared viewport config for `whileInView`. */
export const revealViewport = { once: true, amount: 0.25 } as const;
