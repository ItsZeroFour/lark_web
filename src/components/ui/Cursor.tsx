"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

// Easter egg #22 — Telegram magnet. When the real pointer enters this radius
// from the bounding box of any [data-magnet="telegram"] element, the ambient
// cursor ring is pulled toward the element's centre.
const MAGNET_RADIUS = 30;

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
  const [snapped, setSnapped] = useState(false);

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

    /** Find the closest visible telegram-magnet element to the pointer.
     *  Returns the lerp strength (0–1) and centre coords, or null. */
    const findTelegramPull = (px: number, py: number) => {
      const targets = Array.from(
        document.querySelectorAll<HTMLElement>('[data-magnet="telegram"]'),
      );
      let best: { cx: number; cy: number; edge: number } | null = null;
      for (const el of targets) {
        const r = el.getBoundingClientRect();
        if (r.width <= 0 || r.height <= 0) continue;
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const ex = Math.max(0, Math.abs(px - cx) - r.width / 2);
        const ey = Math.max(0, Math.abs(py - cy) - r.height / 2);
        const edge = Math.hypot(ex, ey);
        if (edge < MAGNET_RADIUS && (!best || edge < best.edge)) {
          best = { cx, cy, edge };
        }
      }
      if (!best) return null;
      const strength = 1 - best.edge / MAGNET_RADIUS;
      return { cx: best.cx, cy: best.cy, strength };
    };

    const onMove = (e: PointerEvent) => {
      const pull = findTelegramPull(e.clientX, e.clientY);
      if (pull) {
        // Eased pull toward the icon centre — strong when near the edge,
        // full snap when the pointer already overlaps the icon.
        const k = 0.55 + pull.strength * 0.35;
        x.set(e.clientX + (pull.cx - e.clientX) * k);
        y.set(e.clientY + (pull.cy - e.clientY) * k);
        setSnapped(true);
      } else {
        x.set(e.clientX);
        y.set(e.clientY);
        setSnapped(false);
      }
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

  const hot = snapped || active;
  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[70] rounded-full"
      style={{ x: rx, y: ry }}
    >
      <motion.span
        className="block rounded-full border"
        animate={{
          width: hot ? 46 : 26,
          height: hot ? 46 : 26,
          margin: hot ? -23 : -13,
          borderColor: snapped
            ? "rgba(212,160,23,1)"
            : hot
              ? "rgba(212,160,23,0.85)"
              : "rgba(212,160,23,0.35)",
          backgroundColor: snapped
            ? "rgba(212,160,23,0.18)"
            : hot
              ? "rgba(212,160,23,0.08)"
              : "rgba(212,160,23,0)",
          scale: pressed ? 0.82 : 1,
          boxShadow: snapped
            ? "0 0 18px 2px rgba(212,160,23,0.45)"
            : "0 0 0 0 rgba(0,0,0,0)",
        }}
        transition={{ type: "spring", stiffness: 320, damping: 24 }}
      />
    </motion.div>
  );
}
