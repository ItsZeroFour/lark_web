"use client";

import { useEffect, useRef, useState } from "react";
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

  // Last reported pointer state — read inside rAF; never inside pointermove.
  const lastRef = useRef({ px: -100, py: -100, target: null as Element | null });
  const frameRef = useRef(0);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const noMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || noMotion) return;
    setEnabled(true);

    const interactive = "a, button, [role='button'], input, textarea, label, summary";

    // Cache magnet target rects rather than walking the DOM on every move.
    // The list is small (1 icon today) and only changes on layout — so we
    // refresh on resize, scroll, and visibility changes.
    type MagnetTarget = { cx: number; cy: number; w: number; h: number };
    let magnets: MagnetTarget[] = [];

    const refreshMagnets = () => {
      const els = document.querySelectorAll<HTMLElement>('[data-magnet="telegram"]');
      const next: MagnetTarget[] = [];
      for (const el of Array.from(els)) {
        const r = el.getBoundingClientRect();
        if (r.width <= 0 || r.height <= 0) continue;
        next.push({
          cx: r.left + r.width / 2,
          cy: r.top + r.height / 2,
          w: r.width,
          h: r.height,
        });
      }
      magnets = next;
    };

    refreshMagnets();

    const findTelegramPull = (px: number, py: number) => {
      let best: { cx: number; cy: number; edge: number } | null = null;
      for (const m of magnets) {
        const ex = Math.max(0, Math.abs(px - m.cx) - m.w / 2);
        const ey = Math.max(0, Math.abs(py - m.cy) - m.h / 2);
        const edge = Math.hypot(ex, ey);
        if (edge < MAGNET_RADIUS && (!best || edge < best.edge)) {
          best = { cx: m.cx, cy: m.cy, edge };
        }
      }
      if (!best) return null;
      const strength = 1 - best.edge / MAGNET_RADIUS;
      return { cx: best.cx, cy: best.cy, strength };
    };

    // rAF-throttled processor: pointermove just stashes the latest event,
    // the frame applies it. Caps work at one update per animation frame.
    const flush = () => {
      frameRef.current = 0;
      const { px, py, target } = lastRef.current;
      const pull = findTelegramPull(px, py);
      if (pull) {
        const k = 0.55 + pull.strength * 0.35;
        x.set(px + (pull.cx - px) * k);
        y.set(py + (pull.cy - py) * k);
        setSnapped(true);
      } else {
        x.set(px);
        y.set(py);
        setSnapped(false);
      }
      setActive(Boolean(target && target.closest(interactive)));
    };

    const onMove = (e: PointerEvent) => {
      lastRef.current.px = e.clientX;
      lastRef.current.py = e.clientY;
      lastRef.current.target = e.target as Element | null;
      if (!frameRef.current) {
        frameRef.current = requestAnimationFrame(flush);
      }
    };
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    window.addEventListener("resize", refreshMagnets, { passive: true });
    window.addEventListener("scroll", refreshMagnets, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("resize", refreshMagnets);
      window.removeEventListener("scroll", refreshMagnets);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
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
