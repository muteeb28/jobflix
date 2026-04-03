/**
 * Jobflix Design Tokens
 *
 * Single source of truth for all visual constants.
 * Changing `colors.brand` here updates every accent element site-wide
 * (via the matching CSS custom properties in globals.css).
 *
 * Usage in components:
 *   import { tokens } from "@/lib/tokens";
 *   style={{ color: tokens.colors.brand }}
 *
 * For Tailwind classes, use the `brand-*` scale:
 *   className="bg-brand-500 text-brand-700 border-brand-200"
 */

export const tokens = {
  colors: {
    brand:        "#10b981",
    brandHover:   "#059669",
    brandLight:   "#ecfdf5",
    brandSubtle:  "#d1fae5",

    textPrimary:   "#1A1A1A",
    textSecondary: "#6B7280",
    textMuted:     "#9CA3AF",

    bgLight:       "#FFFFFF",
    bgDark:        "#0A0A0A",
    bgSurface:     "#F9FAFB",
    bgSurfaceDark: "#111113",

    borderLight:   "#E5E7EB",
    borderDark:    "#222222",

    success:       "#22C55E",
    warning:       "#F59E0B",
    error:         "#EF4444",
  },

  fonts: {
    heading: "var(--font-bricolage), sans-serif",
    body:    "var(--font-geist-sans), sans-serif",
    mono:    "var(--font-geist-mono), monospace",
    nav:     "var(--font-plus-jakarta), sans-serif",
  },

  radii: {
    card:    "12px",
    badge:   "999px",
    button:  "8px",
    buttonPill: "999px",
    input:   "8px",
  },

  shadows: {
    card:      "0 2px 8px rgba(0,0,0,0.06)",
    cardHover: "0 8px 30px rgba(16,185,129,0.15)",
    button:    "0 2px 8px rgba(16,185,129,0.3)",
    glow:      "0 0 40px 8px rgba(16,185,129,0.2)",
    glowSubtle:"0 0 24px 4px rgba(16,185,129,0.15)",
  },
} as const;

export type Tokens = typeof tokens;
