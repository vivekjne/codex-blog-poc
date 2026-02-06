import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx,mdx}",
    "./content/**/*.{ts,tsx,mdx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-sans)", "sans-serif"]
      },
      colors: {
        ink: "#0f172a",
        fog: "#94a3b8",
        haze: "#e2e8f0",
        glow: "#f97316",
        ember: "#fb7185",
        ocean: "#0ea5e9",
        night: "#020617"
      },
      boxShadow: {
        soft: "0 10px 30px -15px rgba(15, 23, 42, 0.4)",
        glow: "0 0 40px -10px rgba(249, 115, 22, 0.6)"
      },
      backgroundImage: {
        "hero-glow": "radial-gradient(circle at 20% 20%, rgba(14, 165, 233, 0.25), transparent 45%), radial-gradient(circle at 80% 0%, rgba(251, 113, 133, 0.25), transparent 40%), radial-gradient(circle at 0% 80%, rgba(249, 115, 22, 0.25), transparent 40%)"
      }
    }
  },
  plugins: [require("@tailwindcss/typography")]
};

export default config;
