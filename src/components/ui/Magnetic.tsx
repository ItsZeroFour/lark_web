"use client";

import { useEffect, useRef, type ReactNode, type PointerEvent } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

interface MagneticProps {
  children: ReactNode;
  /** Pull strength — fraction of cursor offset applied (0–1). */
  strength?: number;
  className?: string;
}

/**
 * Magnetic hover wrapper. The child eases toward the cursor while it
 * hovers and springs back on leave — a quiet, premium micro-interaction.
 * Disabled under reduced-motion; harmless on touch (no pointer events).
 */
export function Magnetic({
  children,
  strength = 0.32,
  className,
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const spring = { stiffness: 220, damping: 18, mass: 0.4 };
  const sx = useSpring(x, spring);
  const sy = useSpring(y, spring);

  // rAF-throttle: stash latest pointer, flush at most once per frame.
  const frameRef = useRef(0);
  const lastRef = useRef({ cx: 0, cy: 0 });

  useEffect(() => {
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  const handleMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduce || !ref.current) return;
    lastRef.current.cx = e.clientX;
    lastRef.current.cy = e.clientY;
    if (frameRef.current) return;
    frameRef.current = requestAnimationFrame(() => {
      frameRef.current = 0;
      if (!ref.current) return;
      const r = ref.current.getBoundingClientRect();
      x.set((lastRef.current.cx - (r.left + r.width / 2)) * strength);
      y.set((lastRef.current.cy - (r.top + r.height / 2)) * strength);
    });
  };

  const reset = () => {
    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = 0;
    }
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      style={{ x: sx, y: sy }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
