/**
 * Full-bleed film grain. A whisper of texture so surfaces never feel
 * plasticky — editorial, not decorative. SVG fractal noise, no asset files.
 */

const NOISE_SVG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'>
       <filter id='n'>
         <feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/>
         <feColorMatrix type='saturate' values='0'/>
       </filter>
       <rect width='100%' height='100%' filter='url(%23n)'/>
     </svg>`,
  );

interface NoiseOverlayProps {
  opacity?: number;
}

export function NoiseOverlay({ opacity = 0.022 }: NoiseOverlayProps) {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[60] pointer-events-none mix-blend-overlay"
      style={{
        opacity,
        backgroundImage: `url("${NOISE_SVG}")`,
        backgroundRepeat: "repeat",
      }}
    />
  );
}
