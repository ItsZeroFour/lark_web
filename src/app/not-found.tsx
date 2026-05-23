import type { Metadata } from "next";
import { SleepingOrb } from "@/components/easter/SleepingOrb";

export const metadata: Metadata = {
  title: "404 — спящий слой",
  description: "Страница ускользнула. Но Larkins пока спит — разбудите его.",
};

export default function NotFound() {
  return (
    <main className="relative grid min-h-[100svh] place-items-center overflow-hidden bg-bg px-6 py-20 text-center">
      {/* Soft amber pool, like the hero */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 60% 70% at 50% 35%, var(--warmth) 0%, transparent 70%)",
        }}
      />
      <div className="grid-lines mask-radial absolute inset-0 -z-10 opacity-50" />

      <SleepingOrb />
    </main>
  );
}
