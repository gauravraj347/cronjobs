import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "#0b0d10",
          panel: "#15181d",
          field: "#1d2127",
          fieldHover: "#262b33",
        },
        border: {
          DEFAULT: "#262b33",
          subtle: "#1f242b",
        },
        text: {
          DEFAULT: "#e7e9ec",
          muted: "#8a93a0",
          dim: "#5b6470",
        },
        accent: {
          DEFAULT: "#7c9cff",
          green: "#4ade80",
          blue: "#60a5fa",
        },
      },
      fontFamily: {
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"],
        sans: ["Inter", "system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
      },
      borderRadius: {
        field: "12px",
      },
      boxShadow: {
        field: "inset 0 1px 0 0 rgba(255,255,255,0.04), 0 1px 2px 0 rgba(0,0,0,0.4)",
        panel: "0 8px 32px rgba(0,0,0,0.4)",
      },
    },
  },
  plugins: [],
};

export default config;
