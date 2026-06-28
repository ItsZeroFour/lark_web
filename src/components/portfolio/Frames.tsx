import type { CSSProperties } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { getImageSize } from "@/data/imageSizes";

/**
 * Device frames that wrap raw screenshots in believable chrome. The premium
 * polish of the case studies lives here — a faux browser bar for desktop
 * captures, a notched phone shell for mobile stories.
 */

interface BrowserFrameProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}

/** Desktop capture inside a calm browser window. */
export function BrowserFrame({ src, alt, className }: BrowserFrameProps) {
  const { width, height } = getImageSize(src);
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-border-strong bg-bg-secondary shadow-lift",
        className,
      )}
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 border-b border-border bg-bg-tertiary px-4 py-2.5">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-text-faint/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-text-faint/40" />
          <span className="h-2.5 w-2.5 rounded-full bg-text-faint/30" />
        </span>
        <span className="mx-auto hidden h-5 w-1/2 max-w-[260px] items-center rounded-md bg-bg/60 px-2 sm:flex">
          <span className="t-mono truncate text-[0.62rem] text-text-faint">
            lark.work
          </span>
        </span>
      </div>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes="(min-width: 768px) 820px, 100vw"
        className="block h-auto w-full"
      />
    </div>
  );
}

interface PhoneFrameProps {
  src: string;
  alt: string;
  accent: string;
  className?: string;
}

/** Mobile story capture inside a notched phone shell. */
export function PhoneFrame({ src, alt, accent, className }: PhoneFrameProps) {
  const { width, height } = getImageSize(src);
  return (
    <div
      className={cn(
        "relative mx-auto w-full max-w-[260px] rounded-[2.2rem] border border-border-strong",
        "bg-bg-tertiary p-2.5 shadow-lift",
        className,
      )}
      style={{ "--member": accent } as CSSProperties}
    >
      {/* Soft brand glow behind the device */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -inset-6 -z-10 rounded-[3rem] opacity-40 blur-2xl"
        style={{
          background: `radial-gradient(60% 60% at 50% 30%, color-mix(in srgb, ${accent} 45%, transparent), transparent 70%)`,
        }}
      />
      <div className="relative overflow-hidden rounded-[1.7rem] border border-border bg-bg">
        {/* Notch */}
        <span
          aria-hidden="true"
          className="absolute left-1/2 top-2 z-[2] h-4 w-20 -translate-x-1/2 rounded-full bg-bg-tertiary"
        />
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes="260px"
          className="block h-auto w-full"
        />
      </div>
    </div>
  );
}
