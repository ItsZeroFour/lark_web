"use client";

import { cn } from "@/lib/utils";

interface GlowProps {
  className?: string;
  /** Diameter in pixels. */
  size?: number;
  /** Slow pulsing glow vs. static halo. */
  pulse?: boolean;
  /** Tailwind color stop or raw color; defaults to the amber halo. */
  color?: string;
}

/**
 * A soft procedural light source. Drop behind content for cinematic depth.
 * Purely decorative — hidden from assistive tech.
 */
export function Glow({
  className,
  size = 420,
  pulse = false,
  color = "var(--halo)",
}: GlowProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute rounded-full blur-[100px]",
        pulse && "anim-glow",
        className,
      )}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
      }}
    />
  );
}
