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
        serif: ["var(--font-serif)", "Playfair Display", "Georgia", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
        display: ["var(--font-serif)", "Playfair Display", "serif"],
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
        // Luxury Obsidian & Velvet Canvas
        obsidian: {
          950: "#06070B",
          900: "#0A0C11",
          850: "#0E1118",
          800: "#131722",
          750: "#171C2A",
          700: "#1E2436",
          600: "#2B334B",
          500: "#3E4968",
        },
        // Brushed Champagne Gold & Titanium Palette
        gold: {
          50: "#FDFCF8",
          100: "#FAF6EB",
          200: "#F4EBD4",
          300: "#EEDFBA",
          400: "#E6D09A",
          500: "#E5C378", // Champagne Gold
          600: "#D4AF37", // Pure Gold
          700: "#B8922C",
          800: "#8C6E20",
          900: "#5F4914",
        },
        champagne: {
          light: "#FFF8EA",
          DEFAULT: "#E5C378",
          dark: "#B8922C",
          muted: "#C5B28B",
        },
        ivory: "#F7F7F9",
        parchment: "#EAE7DF",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      backgroundImage: {
        "luxury-gradient":
          "linear-gradient(135deg, #FFF9ED 0%, #E5C378 50%, #C5A880 100%)",
        "gold-shimmer":
          "linear-gradient(90deg, rgba(229,195,120,0) 0%, rgba(229,195,120,0.3) 50%, rgba(229,195,120,0) 100%)",
        "grid-pattern":
          "radial-gradient(circle at center, rgba(229,195,120,0.06) 1px, transparent 1px)",
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
          "50%": { transform: "translateY(-8px)" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        equalizer: {
          "0%, 100%": { height: "4px" },
          "50%": { height: "18px" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.5s ease-out",
        shimmer: "shimmer 2.5s linear infinite",
        float: "float 6s ease-in-out infinite",
        "spin-slow": "spin-slow 20s linear infinite",
        marquee: "marquee 32s linear infinite",
        equalizer: "equalizer 1.2s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
