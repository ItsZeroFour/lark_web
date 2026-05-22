"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { revealVariants } from "@/hooks/useReveal";
import { Spotlight } from "@/components/ui/Spotlight";
import { cn } from "@/lib/utils";

interface CardProps {
  children: ReactNode;
  className?: string;
  /** Border + shadow lift on hover (no scale — layout stays stable). */
  interactive?: boolean;
  /** Highlighted treatment — amber border tint. */
  featured?: boolean;
  /** Cursor-tracked spotlight glow. On by default. */
  spotlight?: boolean;
  as?: "div" | "article" | "li";
}

/**
 * Solid surface card. Crisp 1px border, quiet depth, calm hover feedback
 * and an optional cursor-tracked spotlight glow.
 */
export function Card({
  children,
  className,
  interactive = false,
  featured = false,
  spotlight = true,
  as = "div",
}: CardProps) {
  const MotionTag = motion[as] as typeof motion.div;

  return (
    <MotionTag
      variants={revealVariants("up")}
      whileHover={interactive ? { y: -6 } : undefined}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className={cn(
        "relative overflow-hidden rounded-2xl surface p-6 sm:p-7",
        "transition-[border-color,box-shadow,background-color] duration-300 ease-cinematic",
        interactive && "cursor-pointer hover:border-border-strong hover:shadow-lift",
        featured && "border-accent/50 bg-accent-soft",
        className,
      )}
    >
      {spotlight && <Spotlight />}
      {children}
    </MotionTag>
  );
}
