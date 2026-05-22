import type { PortfolioCategory } from "@/data/portfolio";

/**
 * Generative cover art for portfolio cards. Each category gets a distinct
 * line-art motif — restrained, accent-tinted, never clip-art. Drawn on a
 * 200×125 (16:10) canvas and scaled to fill the card cover.
 */

/** web — a calm dashboard wireframe. */
function WebMotif() {
  return (
    <>
      <rect x="14" y="20" width="38" height="86" rx="4" />
      <rect x="60" y="20" width="126" height="18" rx="3" />
      <rect x="60" y="46" width="60" height="28" rx="3" />
      <rect x="128" y="46" width="58" height="28" rx="3" />
      <rect x="60" y="82" width="126" height="24" rx="3" />
    </>
  );
}

/** ai — a small neural node graph. */
function AiMotif() {
  const nodes = [
    [42, 32],
    [98, 24],
    [152, 44],
    [62, 82],
    [122, 92],
    [172, 90],
  ];
  const edges = [
    [0, 1],
    [1, 2],
    [0, 3],
    [1, 4],
    [2, 5],
    [3, 4],
    [4, 5],
  ];
  return (
    <>
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a][0]}
          y1={nodes[a][1]}
          x2={nodes[b][0]}
          y2={nodes[b][1]}
        />
      ))}
      {nodes.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i === 1 || i === 4 ? 7 : 5} />
      ))}
    </>
  );
}

/** gamification — a rising progression path with milestone dots. */
function GameMotif() {
  const pts = [
    [22, 100],
    [62, 82],
    [98, 90],
    [134, 56],
    [168, 40],
  ];
  return (
    <>
      <polyline points={pts.map((p) => p.join(",")).join(" ")} fill="none" />
      {pts.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={3.5 + i} />
      ))}
    </>
  );
}

/** case — three layered planes, offset on a diagonal. */
function CaseMotif() {
  return (
    <>
      <rect x="26" y="58" width="116" height="52" rx="6" />
      <rect x="48" y="40" width="116" height="52" rx="6" />
      <rect x="70" y="22" width="116" height="52" rx="6" />
    </>
  );
}

const MOTIFS: Record<PortfolioCategory, () => JSX.Element> = {
  web: WebMotif,
  ai: AiMotif,
  gamification: GameMotif,
  case: CaseMotif,
};

interface PortfolioCoverProps {
  category: PortfolioCategory;
  categoryLabel: string;
  year: string;
  cover: [string, string];
}

export function PortfolioCover({
  category,
  categoryLabel,
  year,
  cover,
}: PortfolioCoverProps) {
  const Motif = MOTIFS[category];

  return (
    <div
      className="relative z-[1] aspect-[16/10] overflow-hidden"
      style={{
        background: `linear-gradient(150deg, ${cover[0]}, ${cover[1]})`,
      }}
    >
      {/* Faint structural grid */}
      <div className="grid-lines mask-radial absolute inset-0" />

      {/* Generative motif */}
      <svg
        viewBox="0 0 200 125"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full text-accent
                   transition-transform duration-500 ease-cinematic
                   group-hover:scale-[1.04]"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.4}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <g className="opacity-[0.28] transition-opacity duration-500 group-hover:opacity-50">
          <Motif />
        </g>
      </svg>

      {/* Meta row */}
      <div className="absolute inset-x-0 top-0 flex items-center justify-between p-5">
        <span className="t-meta text-accent">{categoryLabel}</span>
        <span className="t-mono text-xs text-text-faint">{year}</span>
      </div>
    </div>
  );
}
