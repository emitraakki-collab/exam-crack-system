import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#173B7A",
          50: "#E8EDF6",
          100: "#D1DBED",
          200: "#A3B7DB",
          300: "#7593C9",
          400: "#476FB7",
          500: "#173B7A",
          600: "#123062",
          700: "#0E244A",
          800: "#091831",
          900: "#050C19",
        },
        secondary: {
          DEFAULT: "#F4B400",
          50: "#FFF8E1",
          100: "#FFECB3",
          200: "#FFE082",
          300: "#FFD54F",
          400: "#FFCA28",
          500: "#F4B400",
          600: "#C49000",
          700: "#936C00",
          800: "#624800",
          900: "#312400",
        },
        accent: {
          DEFAULT: "#E53935",
          50: "#FDECEC",
          100: "#FBD9D9",
          200: "#F7B3B2",
          300: "#F28D8C",
          400: "#EE6765",
          500: "#E53935",
          600: "#C62828",
          700: "#951E1E",
          800: "#631414",
          900: "#320A0A",
        },
        background: "#F7F9FC",
        dark: "#111827",
        success: {
          DEFAULT: "#16A34A",
          50: "#ECFDF5",
          100: "#D1FAE5",
          200: "#A7F3D0",
          300: "#6EE7B7",
          400: "#34D399",
          500: "#16A34A",
          600: "#15803D",
          700: "#166534",
          800: "#14532D",
          900: "#052E16",
        },
      },
      fontFamily: {
        hindi: ["var(--font-noto-sans-devanagari)", "sans-serif"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
      maxWidth: {
        container: "1200px",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-up": "slideUp 0.6s ease-out forwards",
        "fade-in-delay": "fadeIn 0.6s ease-out 0.2s forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
