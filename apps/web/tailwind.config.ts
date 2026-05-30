import type { Config } from "tailwindcss";
import tailwindAnimate from "tailwindcss-animate";
import path from "path";

export default {
  darkMode: ["class"],
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      dnd5e: {
        colors: {
          parchment: "#f4e4bc",
          "parchment-dark": "#d4c49c",
          ink: "#2c1810",
          "ink-light": "#5c4030",
          gold: "#c9a227",
          "gold-light": "#e8c547",
          crimson: "#8b0000",
          "crimson-light": "#b22222",
          azure: "#1e3a5f",
          "azure-light": "#2e5a8f",
        },
        fontFamily: {
          display: ["Cinzel", "serif"],
          body: ["Crimson Text", "Georgia", "serif"],
          mono: ["Courier Prime", "monospace"],
        },
      },
    },
  },
  plugins: [tailwindAnimate],
} satisfies Config;
