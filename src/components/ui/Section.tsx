import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  id?: string;
  children: ReactNode;
  className?: string;
  /** Renders the standard shell container around children. */
  contained?: boolean;
  /** Adds a top hairline divider. */
  divided?: boolean;
}

/**
 * Vertical rhythm wrapper. Tight, consistent spacing across the page
 * with scroll-margin so anchored navigation lands cleanly.
 */
export function Section({
  id,
  children,
  className,
  contained = true,
  divided = false,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative scroll-mt-24 py-16 sm:py-20 lg:py-24",
        divided && "border-t border-border",
        className,
      )}
    >
      {contained ? <div className="shell relative">{children}</div> : children}
    </section>
  );
}
