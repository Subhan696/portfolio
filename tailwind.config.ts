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
        // Maroon / wine spectrum — the accent
        wine: {
          950: "#2a060f", // near-black wine
          900: "#3d0a18", // darkest burgundy
          800: "#5c0f24", // burgundy
          700: "#7a1631", // deep maroon
          600: "#9b1d3e", // maroon (primary)
          500: "#b8294c", // crimson
          400: "#cf4c6b", // bright crimson
          300: "#e07a93", // rose
          200: "#eba9b8", // blush
          100: "#f5d7de", // pale rose
        },
        // Off-white text — slightly warm for elegance
        ivory: "#f3eee6",
        parchment: "#e8e1d3",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(to right, rgba(155,29,62,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(155,29,62,0.07) 1px, transparent 1px)",
        "wine-gradient":
          "linear-gradient(135deg, #cf4c6b 0%, #9b1d3e 50%, #5c0f24 100%)",
        "glow-radial":
          "radial-gradient(circle at center, rgba(155,29,62,0.22), transparent 70%)",
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
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
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
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
