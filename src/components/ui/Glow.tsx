import { cn } from "@/lib/utils";

interface GlowProps {
  className?: string;
  /** Diameter in pixels. */
  size?: number;
}

/**
 * A single, very soft ambient warmth. Used at most once per section to add
 * quiet depth — never stacked into the "glowing orb" look.
 */
export function Glow({ className, size = 480 }: GlowProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute -z-10 rounded-full blur-[120px]",
        className,
      )}
      style={{
        width: size,
        height: size,
        background:
          "radial-gradient(circle, var(--warmth) 0%, transparent 70%)",
      }}
    />
  );
}
