"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { revealVariants } from "@/hooks/useReveal";
import { cn } from "@/lib/utils";

interface CardProps {
  children: ReactNode;
  className?: string;
  /** Border + shadow lift on hover (no scale — layout stays stable). */
  interactive?: boolean;
  /** Highlighted treatment — amber border tint. */
  featured?: boolean;
  as?: "div" | "article" | "li";
}

/**
 * Clean solid surface card. Crisp 1px border, calm hover feedback —
 * no heavy glass, no glow.
 */
export function Card({
  children,
  className,
  interactive = false,
  featured = false,
  as = "div",
}: CardProps) {
  const MotionTag = motion[as] as typeof motion.div;

  return (
    <MotionTag
      variants={revealVariants("up")}
      className={cn(
        "relative overflow-hidden rounded-2xl surface p-6 sm:p-7",
        "transition-[border-color,box-shadow,background-color] duration-300 ease-cinematic",
        interactive &&
          "cursor-pointer hover:border-border-strong hover:shadow-lift",
        featured && "border-accent/50 bg-accent-soft",
        className,
      )}
    >
      {children}
    </MotionTag>
  );
}
