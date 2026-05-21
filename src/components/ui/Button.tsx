"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";

interface BaseProps {
  children: ReactNode;
  variant?: Variant;
  className?: string;
  /** Wrap in a magnetic pull. On by default for primary. */
  magnetic?: boolean;
  fullWidth?: boolean;
}

interface ButtonAsButton extends BaseProps {
  href?: undefined;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  "aria-label"?: string;
}

interface ButtonAsLink extends BaseProps {
  href: string;
  external?: boolean;
  "aria-label"?: string;
}

type ButtonProps = ButtonAsButton | ButtonAsLink;

const base =
  "group relative inline-flex items-center justify-center gap-2.5 rounded-full " +
  "text-sm font-medium tracking-tight whitespace-nowrap cursor-pointer " +
  "px-7 py-3.5 min-h-[48px] transition-[background,color,border-color,box-shadow] " +
  "duration-300 ease-cinematic disabled:opacity-50 disabled:cursor-not-allowed " +
  "focus-visible:outline-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-[#0b0b0c] hover:bg-accent-light hover:shadow-glow-sm",
  secondary:
    "border border-border text-text bg-bg-secondary/40 hover:border-accent/60 hover:bg-bg-tertiary",
  ghost:
    "text-text-muted hover:text-text hover:bg-bg-secondary/60",
};

/** Shared, variant-aware action element. Renders a link or a button. */
export function Button(props: ButtonProps) {
  const {
    children,
    variant = "primary",
    className,
    magnetic = variant === "primary",
    fullWidth,
  } = props;

  const classes = cn(
    base,
    variants[variant],
    fullWidth && "w-full",
    className,
  );

  const inner =
    "href" in props && props.href !== undefined ? (
      props.external ? (
        <a
          href={props.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={props["aria-label"]}
          className={classes}
        >
          {children}
        </a>
      ) : (
        <Link
          href={props.href}
          aria-label={props["aria-label"]}
          className={classes}
        >
          {children}
        </Link>
      )
    ) : (
      <button
        type={props.type ?? "button"}
        onClick={props.onClick}
        disabled={props.disabled}
        aria-label={props["aria-label"]}
        className={classes}
      >
        {children}
      </button>
    );

  if (!magnetic) return inner;

  return (
    <MagneticButton className={cn("inline-flex", fullWidth && "w-full")} strength={0.28}>
      {inner}
    </MagneticButton>
  );
}
