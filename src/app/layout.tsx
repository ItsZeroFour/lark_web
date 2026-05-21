import type { Metadata, Viewport } from "next";
import { Playfair_Display, Geologica, JetBrains_Mono } from "next/font/google";
import { NoiseOverlay } from "@/components/ui/NoiseOverlay";
import "./globals.css";

/**
 * Typography.
 * Headings — Playfair Display: a high-contrast cinematic serif with true
 * italic accents and full Cyrillic coverage (the brief's DM Serif Display
 * has no Cyrillic glyphs, and this site speaks Russian).
 * Body/UI — Geologica. Meta/code — JetBrains Mono.
 */
const serif = Playfair_Display({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const sans = Geologica({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://larkfreelance.dev"),
  title: {
    default: "Lark Freelance — AI-native execution unit",
    template: "%s · Lark Freelance",
  },
  description:
    "Lark Freelance — технологическая команда нового поколения. Стратегия, дизайн и AI-execution в одном контуре. Цифровые решения, которые работают.",
  keywords: [
    "Lark Freelance",
    "digital agency",
    "AI automation",
    "веб-разработка",
    "IT под ключ",
  ],
  authors: [{ name: "Lark Freelance" }],
  openGraph: {
    title: "Lark Freelance — AI-native execution unit",
    description:
      "Стратегия, дизайн и AI-execution в одной команде. Для бизнеса, который думает вперёд.",
    type: "website",
    locale: "ru_RU",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0b0b0c",
};

/** Sets the theme before first paint to avoid a flash of the wrong theme. */
const themeScript = `(function(){try{var t=localStorage.getItem('lark-theme');document.documentElement.setAttribute('data-theme',t==='light'?'light':'dark');}catch(e){document.documentElement.setAttribute('data-theme','dark');}})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ru"
      data-theme="dark"
      className={`${serif.variable} ${sans.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        {children}
        <NoiseOverlay opacity={0.04} />
      </body>
    </html>
  );
}
