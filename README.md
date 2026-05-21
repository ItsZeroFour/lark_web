# Lark Freelance

Premium website for **Lark Freelance** — an AI-native digital agency / elite
execution unit. Dark-tech cinematic minimalism with a luminous amber accent,
a living AI orb, and the Larkins intelligence layer.

Built as a production-grade React/Next.js project — not a single-file app.

## Stack

- **Next.js 14** (App Router) + **React 18**
- **TypeScript** (strict)
- **Tailwind CSS** with theme-aware CSS variables
- **Framer Motion** — slow, intentional, atmospheric motion
- **@anthropic-ai/sdk** — optional live Larkins assistant

## Getting started

```bash
npm install
npm run dev          # http://localhost:3000
```

```bash
npm run build && npm start   # production build
```

## Larkins AI

The Larkins console (`#contact` section) collects a 5-question client brief.

- **Without an API key** — a deterministic scripted flow walks the same five
  questions and produces a summary. The console always works out of the box.
- **With an API key** — replies are generated live by Claude using the
  `LARKINS_SYSTEM` prompt.

Copy `.env.example` to `.env.local` and set:

```bash
ANTHROPIC_API_KEY=sk-ant-...
ANTHROPIC_MODEL=claude-opus-4-7   # optional
```

## Project structure

```
src/
├── app/
│   ├── layout.tsx            # fonts, theme bootstrap, metadata
│   ├── page.tsx              # home — all sections
│   ├── globals.css
│   ├── icon.svg
│   ├── larkins/page.tsx      # cinematic "coming soon" page
│   └── api/larkins/route.ts  # Larkins conversation endpoint
├── components/
│   ├── layout/   # Navbar, Footer, ThemeToggle
│   ├── hero/     # Hero, HeroBackground, HeroOrb
│   ├── sections/ # About, Services, Process, Portfolio, Team, Larkins, Freelancers
│   ├── larkins/  # LarkinsStage (full-screen experience)
│   ├── ui/       # Button, Card, SectionHeading, Glow, NoiseOverlay, Icon, Section
│   └── animations/ # Reveal, MagneticButton, AmbientMotion
├── data/         # services, team, portfolio, process
├── hooks/        # useTheme, useReveal, useMagnetic
├── lib/          # claude (system prompt + scripted flow), utils
└── styles/       # variables.css, animations.css, typography.css
```

## Design notes

- **Theme** — dark by default, warm light counterpart. The active theme is set
  pre-paint by an inline script to avoid any flash; `useTheme` toggles it.
- **Typography** — headings use **Playfair Display** (a cinematic high-contrast
  serif with true italics *and* full Cyrillic coverage; the brief's DM Serif
  Display has no Cyrillic glyphs and the site speaks Russian). Body uses
  **Geologica**, meta/code uses **JetBrains Mono**.
- **Motion** — every animation is slow and intentional and honors
  `prefers-reduced-motion`.
- **Accessibility** — semantic HTML, visible focus rings, ARIA labels on
  icon-only controls, keyboard-navigable, 44px+ touch targets.
