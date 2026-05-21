"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

interface BaseProps {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
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
  "group inline-flex items-center justify-center gap-2 rounded-full font-medium " +
  "tracking-tight whitespace-nowrap cursor-pointer select-none " +
  "transition-[background-color,color,border-color,box-shadow,transform] " +
  "duration-300 ease-cinematic active:scale-[0.98] " +
  "disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none";

const sizes: Record<Size, string> = {
  md: "text-sm px-5 py-2.5 min-h-[44px]",
  lg: "text-[0.95rem] px-7 py-3.5 min-h-[52px]",
};

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-accent-ink hover:bg-accent-light hover:shadow-lift",
  secondary:
    "border border-border-strong text-text hover:border-accent hover:text-accent",
  ghost: "text-text-muted hover:text-text hover:bg-bg-tertiary",
};

/** Shared, variant-aware action element. Renders a link or a button. */
export function Button(props: ButtonProps) {
  const {
    children,
    variant = "primary",
    size = "md",
    className,
    fullWidth,
  } = props;

  const classes = cn(
    base,
    sizes[size],
    variants[variant],
    fullWidth && "w-full",
    className,
  );

  if ("href" in props && props.href !== undefined) {
    if (props.external) {
      return (
        <a
          href={props.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={props["aria-label"]}
          className={classes}
        >
          {children}
        </a>
      );
    }
    return (
      <Link
        href={props.href}
        aria-label={props["aria-label"]}
        className={classes}
      >
        {children}
      </Link>
    );
  }

  return (
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
}
