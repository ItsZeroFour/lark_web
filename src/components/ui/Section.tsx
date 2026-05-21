import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  id?: string;
  children: ReactNode;
  className?: string;
  /** Renders the standard shell container around children. */
  contained?: boolean;
}

/**
 * Vertical rhythm wrapper. Every page section uses the same generous
 * spacing and scroll-margin so anchored navigation lands cleanly.
 */
export function Section({
  id,
  children,
  className,
  contained = true,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative scroll-mt-24 py-24 sm:py-28 lg:py-36",
        className,
      )}
    >
      {contained ? <div className="shell relative">{children}</div> : children}
    </section>
  );
}
