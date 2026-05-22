/**
 * Inline SVG icon set. Single 24x24 viewBox, currentColor stroke.
 * No emojis used as icons anywhere in the app.
 */

import type { SVGProps } from "react";

export type IconName =
  | "arrow-right"
  | "arrow-up-right"
  | "arrow-down"
  | "sun"
  | "moon"
  | "menu"
  | "close"
  | "plus"
  | "minus"
  | "check"
  | "send"
  | "code"
  | "circuit"
  | "layers"
  | "spark"
  | "telegram"
  | "phone"
  | "mail"
  | "clock"
  | "shield"
  | "wing"
  | "user";

interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName;
  size?: number;
}

/** Icons drawn with fill (brand glyphs). */
const FILLED: ReadonlySet<IconName> = new Set<IconName>(["telegram", "wing"]);

const paths: Record<IconName, JSX.Element> = {
  "arrow-right": <path d="M5 12h14M13 6l6 6-6 6" />,
  "arrow-up-right": <path d="M7 17 17 7M8 7h9v9" />,
  "arrow-down": <path d="M12 5v14M6 13l6 6 6-6" />,
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </>
  ),
  moon: <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  plus: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M5 12h14" />,
  check: <path d="M20 6 9 17l-5-5" />,
  send: <path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7Z" />,
  code: <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" />,
  circuit: (
    <>
      <circle cx="6" cy="6" r="2" />
      <circle cx="18" cy="18" r="2" />
      <circle cx="18" cy="6" r="2" />
      <path d="M8 6h8M6 8v6a4 4 0 0 0 4 4h6" />
    </>
  ),
  layers: <path d="m12 3 9 5-9 5-9-5 9-5ZM3 13l9 5 9-5M3 18l9 5 9-5" />,
  spark: <path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6 5.6 18.4" />,
  telegram: (
    <path d="M21.9 4.3 2.9 11.6c-1.2.5-1.2 1.2-.2 1.5l4.8 1.5 1.9 5.8c.2.7.4.9 1 .9.5 0 .7-.2 1-.6l2.4-2.4 4.9 3.6c.9.5 1.5.2 1.7-.8l3.2-15c.3-1.3-.5-1.8-1.5-1.3ZM9.5 14.6l9.3-5.9c.4-.3.8-.1.5.2l-7.5 6.8-.3 3.4-2-4.5Z" />
  ),
  phone: (
    <path d="M6.5 3h3l1.5 4.5-2 1.5a13 13 0 0 0 6 6l1.5-2L21 18v3a1 1 0 0 1-1 1A17 17 0 0 1 3 5a1 1 0 0 1 1-1Z" />
  ),
  mail: (
    <>
      <rect x="2.5" y="5" width="19" height="14" rx="2.5" />
      <path d="m3.5 7 8.5 6 8.5-6" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </>
  ),
  shield: <path d="M12 3l7 3v5c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6l7-3Z" />,
  wing: (
    <path d="M3 18c5 0 9-3 11-9 1 4 4 6 7 6-4 2-7 5-9 9-1-4-5-6-9-6Z" />
  ),
  user: (
    <>
      <circle cx="12" cy="8.5" r="4" />
      <path d="M4.5 20.5c0-4.2 3.4-6.8 7.5-6.8s7.5 2.6 7.5 6.8" />
    </>
  ),
};

export function Icon({ name, size = 20, ...rest }: IconProps) {
  const filled = FILLED.has(name);
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke={filled ? "none" : "currentColor"}
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...rest}
    >
      {paths[name]}
    </svg>
  );
}
