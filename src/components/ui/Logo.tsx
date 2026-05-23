import type { SVGProps } from "react";

interface LogoProps extends SVGProps<SVGSVGElement> {
  size?: number;
}

/**
 * Lark brandmark — a lark ascending.
 * A compact filled body (the accent) with two line wings spread wide and
 * rising — "line + accent" treatment, standalone. Monochrome via
 * currentColor; pair with `text-accent`.
 */
export function Logo({ size = 28, ...rest }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 28 28"
      fill="none"
      aria-hidden="true"
      {...rest}
    >
      {/* Wings — spread wide and rising, drawn as line */}
      <path
        d="M12.5 12.2C8.5 12.2 4.5 10.5 1.6 5.6"
        stroke="currentColor"
        strokeWidth={2.1}
        strokeLinecap="round"
      />
      <path
        d="M15.5 12.2C19.5 12.2 23.5 10.5 26.4 5.6"
        stroke="currentColor"
        strokeWidth={2.1}
        strokeLinecap="round"
      />
      {/* Body — the filled accent: rounded head, tapered tail */}
      <path
        d="M14 9c2.2 0 2.2 4 1.2 6.8-.4 1.2-.9 2.5-1.2 3.7-.3-1.2-.8-2.5-1.2-3.7C11.8 13 11.8 9 14 9Z"
        fill="currentColor"
      />
    </svg>
  );
}
