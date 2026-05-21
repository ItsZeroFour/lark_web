"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { revealVariants } from "@/hooks/useReveal";
import { cn } from "@/lib/utils";

interface CardProps {
  children: ReactNode;
  className?: string;
  /** Adds a pointer-tracking sheen + border lift on hover. */
  interactive?: boolean;
  /** Highlighted treatment — amber border + soft pulse (used for Larkins). */
  featured?: boolean;
  as?: "div" | "article" | "li";
}

/**
 * Glass surface card. Hover feedback is color/border/shadow only — never a
 * scale transform — so layout never shifts.
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
        "relative overflow-hidden rounded-2xl glass p-7",
        "transition-[border-color,box-shadow,background-color] duration-300 ease-cinematic",
        interactive &&
          "cursor-pointer hover:border-accent/45 hover:shadow-elevated",
        featured && "border-accent/55 shadow-glow-sm",
        className,
      )}
    >
      {/* Featured cards carry a slow amber pulse along the top edge */}
      {featured && (
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px infra-line"
        />
      )}
      {children}
    </MotionTag>
  );
}
