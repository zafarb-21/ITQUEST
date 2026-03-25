import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./sections/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#08111f",
        mist: "#f3f7fc",
        line: "rgba(148, 163, 184, 0.16)",
        brand: {
          50: "#e8fbff",
          100: "#c3f3ff",
          200: "#8ee8ff",
          300: "#53d7ff",
          400: "#23c0f0",
          500: "#0aa5d6",
          600: "#0d83b0",
          700: "#12698d",
          800: "#155672",
          900: "#164761"
        }
      },
      boxShadow: {
        glow: "0 20px 60px rgba(5, 27, 54, 0.28)",
        card: "0 20px 45px rgba(7, 16, 31, 0.16)",
      },
      backgroundImage: {
        "hero-grid":
          "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
        "light-grid":
          "linear-gradient(rgba(8,17,31,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(8,17,31,0.06) 1px, transparent 1px)",
      },
      fontFamily: {
        heading: ["Manrope", "Aptos", "Segoe UI", "sans-serif"],
        body: ["Satoshi", "Manrope", "Segoe UI", "sans-serif"],
      },
      maxWidth: {
        "8xl": "90rem",
      },
    },
  },
  plugins: [],
};

export default config;
