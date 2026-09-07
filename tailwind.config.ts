import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--c-bg)",
        surface: "var(--c-surface)",
        "surface-2": "var(--c-surface-2)",
        border: "var(--c-border)",
        ink: "var(--c-ink)",
        muted: "var(--c-muted)",
        accent: "var(--c-accent)",
        "accent-ink": "var(--c-accent-ink)",
        berry: "var(--c-berry)",
        leaf: "var(--c-leaf)",
        sky: "var(--c-sky)",
      },
      fontFamily: {
        display: "var(--font-display)",
        sans: "var(--font-sans)",
      },
      borderRadius: {
        card: "var(--r-card)",
      },
    },
  },
  plugins: [],
};

export default config;
