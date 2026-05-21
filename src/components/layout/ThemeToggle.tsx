"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/hooks/useTheme";
import { Icon } from "@/components/ui/Icon";

/**
 * Dark / light theme switch. Renders a stable placeholder until mounted
 * to avoid hydration mismatch with the pre-paint theme script.
 */
export function ThemeToggle() {
  const { theme, toggleTheme, mounted } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={
        theme === "dark"
          ? "Включить светлую тему"
          : "Включить тёмную тему"
      }
      className="relative grid h-11 w-11 place-items-center rounded-full border border-border
                 bg-bg-secondary/50 text-text-muted cursor-pointer
                 transition-colors duration-300 hover:text-accent hover:border-accent/50
                 focus-visible:outline-none"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={mounted ? theme : "placeholder"}
          initial={{ opacity: 0, rotate: -40, scale: 0.6 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 40, scale: 0.6 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="grid place-items-center"
        >
          <Icon name={theme === "dark" ? "moon" : "sun"} size={18} />
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
