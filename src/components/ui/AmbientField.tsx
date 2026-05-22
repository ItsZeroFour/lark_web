"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Blob {
  size: number;
  top: string;
  left: string;
  drift: [number, number];
  duration: number;
}

/** Three slow-drifting warmth pools — cinematic depth without a glow stack. */
const BLOBS: Blob[] = [
  { size: 520, top: "-8%", left: "8%", drift: [40, 30], duration: 26 },
  { size: 440, top: "38%", left: "72%", drift: [-50, 36], duration: 32 },
  { size: 360, top: "78%", left: "26%", drift: [34, -28], duration: 30 },
];

interface AmbientFieldProps {
  className?: string;
}

/**
 * Ambient background motion — a few amber pools drifting very slowly.
 * Atmospheric, never distracting; collapses to a static field under
 * reduced-motion preferences.
 */
export function AmbientField({ className }: AmbientFieldProps) {
  const reduce = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 overflow-hidden",
        className,
      )}
    >
      {BLOBS.map((b, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-[120px]"
          style={{
            width: b.size,
            height: b.size,
            top: b.top,
            left: b.left,
            background:
              "radial-gradient(circle, var(--glow) 0%, transparent 70%)",
          }}
          animate={
            reduce
              ? undefined
              : {
                  x: [0, b.drift[0], 0],
                  y: [0, b.drift[1], 0],
                  opacity: [0.55, 0.85, 0.55],
                }
          }
          transition={{
            duration: b.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
