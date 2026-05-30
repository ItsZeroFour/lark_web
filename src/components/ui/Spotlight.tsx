"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface SpotlightProps {
  className?: string;
  /** Diameter of the highlight in pixels. */
  size?: number;
}

/**
 * Cursor-tracked radial highlight. Drop it as the first child of any
 * `position: relative` card — it listens on its parent element and paints
 * a soft amber glow that follows the pointer, fading in on hover.
 *
 * Pointer-events-none and purely decorative; degrades to nothing on
 * touch devices (no pointermove) and respects reduced-motion.
 */
export function Spotlight({ className, size = 280 }: SpotlightProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const parent = el?.parentElement;
    if (!el || !parent) return;
    // Skip entirely on touch / coarse pointers — there is no hover to track.
    if (!window.matchMedia("(pointer: fine)").matches) return;

    // rAF-throttle: at most one style write per animation frame.
    let frame = 0;
    let lastX = 0;
    let lastY = 0;

    const flush = () => {
      frame = 0;
      el.style.setProperty("--sx", `${lastX}px`);
      el.style.setProperty("--sy", `${lastY}px`);
    };

    const onMove = (e: PointerEvent) => {
      const r = parent.getBoundingClientRect();
      lastX = e.clientX - r.left;
      lastY = e.clientY - r.top;
      if (!frame) frame = requestAnimationFrame(flush);
    };
    const onEnter = () => {
      el.style.opacity = "1";
    };
    const onLeave = () => {
      el.style.opacity = "0";
    };

    parent.addEventListener("pointermove", onMove, { passive: true });
    parent.addEventListener("pointerenter", onEnter, { passive: true });
    parent.addEventListener("pointerleave", onLeave, { passive: true });
    return () => {
      parent.removeEventListener("pointermove", onMove);
      parent.removeEventListener("pointerenter", onEnter);
      parent.removeEventListener("pointerleave", onLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 z-0 opacity-0",
        "transition-opacity duration-300 ease-cinematic",
        className,
      )}
      style={{
        background: `radial-gradient(${size}px circle at var(--sx, 50%) var(--sy, 0%), var(--spotlight), transparent 62%)`,
      }}
    />
  );
}
