"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Ambient cursor ring — a soft amber circle that trails the native pointer
 * with a gentle spring lag and swells over interactive elements.
 *
 * Purely additive: the OS cursor stays visible, the ring is pointer-events-none.
 * Mounts only on fine-pointer devices that don't ask for reduced motion.
 */
export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false);
  const [pressed, setPressed] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const spring = { stiffness: 380, damping: 30, mass: 0.35 };
  const rx = useSpring(x, spring);
  const ry = useSpring(y, spring);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const noMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || noMotion) return;
    setEnabled(true);

    const interactive = "a, button, [role='button'], input, textarea, label, summary";

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = e.target as Element | null;
      setActive(Boolean(el && el.closest(interactive)));
    };
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[70] rounded-full"
      style={{ x: rx, y: ry }}
    >
      <motion.span
        className="block rounded-full border"
        animate={{
          width: active ? 46 : 26,
          height: active ? 46 : 26,
          margin: active ? -23 : -13,
          borderColor: active
            ? "rgba(212,160,23,0.85)"
            : "rgba(212,160,23,0.35)",
          backgroundColor: active
            ? "rgba(212,160,23,0.08)"
            : "rgba(212,160,23,0)",
          scale: pressed ? 0.82 : 1,
        }}
        transition={{ type: "spring", stiffness: 320, damping: 24 }}
      />
    </motion.div>
  );
}
