/**
 * Hero backdrop — deliberately quiet.
 * A single soft top warmth and a clean fade into the page. No grid,
 * no particles, no glow stack.
 */
export function HeroBackground() {
  return (
    <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
      {/* Soft warmth pooled at the top */}
      <div
        className="absolute inset-x-0 top-0 h-[70%]"
        style={{
          background:
            "radial-gradient(ellipse 70% 100% at 50% 0%, var(--warmth) 0%, transparent 65%)",
        }}
      />
      {/* Clean settle into the page background */}
      <div
        className="absolute inset-x-0 bottom-0 h-32"
        style={{
          background: "linear-gradient(180deg, transparent, var(--bg))",
        }}
      />
    </div>
  );
}
