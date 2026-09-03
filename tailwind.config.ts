import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
        display: ["var(--font-display)", "serif"],
      },
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
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Deep navy — the base canvas
        ink: {
          950: "#050912", // deepest void
          900: "#0a1226", // midnight (page bg)
          800: "#0f1a35", // card bg
          700: "#152347", // navy
          600: "#1f2d56", // muted navy
          500: "#2a3a6b", // steel
          400: "#3d4f87", // light steel
        },
        // Maroon / wine spectrum
        wine: {
          950: "#2a060f",
          900: "#3d0a18",
          800: "#5c0f24",
          700: "#7a1631",
          600: "#9b1d3e",
          500: "#b8294c",
          400: "#cf4c6b",
          300: "#e07a93",
          200: "#eba9b8",
          100: "#f5d7de",
        },
        // Liquid Chrome & Cosmic Silver Palette (Silver Surfer Aesthetic)
        silver: {
          50: "#FAFCFD",
          100: "#F0F4F8",
          200: "#D9E2EC",
          300: "#BCCCDC",
          400: "#9FB3C8",
          500: "#829AB1",
          600: "#627D98",
          700: "#486581",
          800: "#334E68",
          900: "#102A43",
          chrome: "#E2E8F0",
          bright: "#FFFFFF",
          metallic: "#CBD5E1",
          dark: "#0F172A",
        },
        // Prismatica Cyber Neon Palette
        cyber: {
          magenta: "#E2E8F0",
          hotpink: "#FFFFFF",
          violet: "#94A3B8",
          purple: "#64748B",
          cyan: "#38BDF8",
          dark: "#000000",
          card: "#05070B",
        },
        // Off-white text — slightly warm for elegance
        ivory: "#F8FAFC",
        parchment: "#E2E8F0",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      backgroundImage: {
        "grid-pattern":
          "radial-gradient(circle at center, rgba(255,255,255,0.08) 1px, transparent 1px)",
        "chrome-gradient":
          "linear-gradient(135deg, #FFFFFF 0%, #CBD5E1 35%, #64748B 70%, #F1F5F9 100%)",
        "glow-radial":
          "radial-gradient(circle at center, rgba(226,232,240,0.25), transparent 70%)",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.4", transform: "scale(0.98)" },
          "50%": { opacity: "1", transform: "scale(1.02)" },
        },
        "gradient-x": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        radar: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        equalizer: {
          "0%, 100%": { height: "4px" },
          "50%": { height: "18px" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.5s ease-out",
        shimmer: "shimmer 2s linear infinite",
        float: "float 6s ease-in-out infinite",
        "spin-slow": "spin-slow 20s linear infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "gradient-x": "gradient-x 4s ease infinite",
        marquee: "marquee 30s linear infinite",
        blink: "blink 1s step-end infinite",
        radar: "radar 4s linear infinite",
        equalizer: "equalizer 1.2s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
