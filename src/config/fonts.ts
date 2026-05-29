// ---------------------------------------------------------------------------
// FONT CONFIG — single source of truth.
//
// To swap a font, change the import + invocation below, save, and the entire
// site re-skins. Components reference --font-display / --font-sans through
// Tailwind utility classes (font-display, font-sans) — never raw font names.
//
// Examples:
//   - Swap Fraunces for EB Garamond:    `import { EB_Garamond } from "next/font/google"`
//   - Swap Inter for IBM Plex Sans:     `import { IBM_Plex_Sans } from "next/font/google"`
//   - Swap to a self-hosted font:       use `next/font/local` and a font file path
//
// CSS variables exported here are wired to Tailwind in tailwind.config.ts
// (theme.extend.fontFamily.sans / display). Don't reference the font objects
// directly from components.
// ---------------------------------------------------------------------------

import { Fraunces, Inter } from "next/font/google";

export const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  axes: ["opsz", "SOFT", "WONK"],
});

// Apply this to <body> in layout.tsx — exposes both CSS variables in scope.
export const fontVariables = `${sans.variable} ${display.variable}`;
