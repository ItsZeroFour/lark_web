/**
 * Full-bleed film-grain noise. Adds controlled imperfection so surfaces
 * never feel sterile or flat. SVG fractal noise — no asset files needed.
 */

const NOISE_SVG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'>
       <filter id='n'>
         <feTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='2' stitchTiles='stitch'/>
         <feColorMatrix type='saturate' values='0'/>
       </filter>
       <rect width='100%' height='100%' filter='url(%23n)'/>
     </svg>`,
  );

interface NoiseOverlayProps {
  /** 0–1, defaults to a very subtle grain. */
  opacity?: number;
  /** When true, covers the whole viewport (fixed). Otherwise absolute. */
  fixed?: boolean;
}

export function NoiseOverlay({ opacity = 0.035, fixed = true }: NoiseOverlayProps) {
  return (
    <div
      aria-hidden="true"
      className={`${fixed ? "fixed" : "absolute"} inset-0 z-[60] pointer-events-none mix-blend-overlay`}
      style={{
        opacity,
        backgroundImage: `url("${NOISE_SVG}")`,
        backgroundRepeat: "repeat",
      }}
    />
  );
}
