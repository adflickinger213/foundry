import type { Config } from "tailwindcss";

// The Foundry's design tokens. These are the only colors and fonts that
// should ever be reached for in this app — see docs/DESIGN.md.
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ivory: "#FAF7F2",
        cream: "#F5EFE6",
        beige: "#EDE0D0",
        card: "#FDFBF7",
        ink: "#4A3F3A",
        soft: "#857668",
        line: "#E7DCCB",
        terracotta: "#C4785A",
        sage: "#8FAF8A",
        rose: "#D4A5A5",
        gold: "#C9A84C",
        lavender: "#C5B8D4",
        mushroom: "#9E8E7E",
      },
      fontFamily: {
        display: ["'Cormorant Garamond'", "serif"],
        sans: ["'Inter'", "system-ui", "sans-serif"],
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      boxShadow: {
        soft: "0 2px 10px rgba(120, 90, 60, 0.06)",
        card: "0 4px 20px rgba(120, 90, 60, 0.08)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(6px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.25s ease-out",
      },
    },
  },
  plugins: [],
} satisfies Config;
