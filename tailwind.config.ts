import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        "bg-secondary": "var(--bg-secondary)",
        "bg-tertiary": "var(--bg-tertiary)",
        surface: "var(--surface)",
        text: "var(--text)",
        "text-muted": "var(--text-muted)",
        "text-faint": "var(--text-faint)",
        accent: "var(--accent)",
        "accent-light": "var(--accent-light)",
        "accent-ink": "var(--accent-ink)",
        "accent-soft": "var(--accent-soft)",
        border: "var(--border)",
        "border-strong": "var(--border-strong)",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(0,0,0,0.3)",
        lift: "0 18px 50px -28px rgba(0,0,0,0.7)",
        float: "0 12px 40px -16px rgba(0,0,0,0.55)",
      },
      borderColor: {
        DEFAULT: "var(--border)",
      },
      maxWidth: {
        shell: "1200px",
      },
      transitionTimingFunction: {
        cinematic: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      screens: {
        xs: "400px",
      },
    },
  },
  plugins: [],
};

export default config;
