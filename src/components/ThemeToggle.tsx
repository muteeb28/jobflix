"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();

  return (
    <button
      onClick={toggle}
      aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
      className="relative w-9 h-9 flex items-center justify-center rounded-full border border-neutral-200 dark:border-white/[0.1] bg-white dark:bg-white/[0.04] text-neutral-500 dark:text-zinc-400 hover:text-neutral-900 dark:hover:text-zinc-100 hover:border-neutral-300 dark:hover:border-white/[0.2] transition-all hover:scale-105 active:scale-95"
    >
      {theme === "light" ? (
        <Moon className="w-4 h-4" />
      ) : (
        <Sun className="w-4 h-4" />
      )}
    </button>
  );
}
