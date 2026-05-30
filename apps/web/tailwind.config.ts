import type { Config } from "tailwindcss";
import tailwindAnimate from "tailwindcss-animate";

export default {
  darkMode: "class",
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
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
