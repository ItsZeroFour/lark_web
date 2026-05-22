import { cn } from "@/lib/utils";

interface GridBackdropProps {
  className?: string;
  /** "lines" draws an infrastructure grid; "dots" a faint dot field. */
  variant?: "lines" | "dots";
  /** Mask shape — radial keeps it pooled in the centre, top fades downward. */
  fade?: "radial" | "top";
}

/**
 * Faint structural texture behind a section. Masked so it dissolves toward
 * the edges and never competes with content — "subtle infrastructure grid".
 */
export function GridBackdrop({
  className,
  variant = "lines",
  fade = "radial",
}: GridBackdropProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 -z-10",
        variant === "lines" ? "grid-lines" : "dot-field",
        fade === "radial" ? "mask-radial" : "mask-t",
        className,
      )}
    />
  );
}
