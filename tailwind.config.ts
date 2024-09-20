/* eslint-disable @typescript-eslint/no-require-imports */
import tailwindTypography from "@tailwindcss/typography"
import type { Config } from "tailwindcss"
import tailwindcssAnimate from "tailwindcss-animate"

require("./cssAsPlugin")

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    extend: {
      colors: {
        gray: {
          50: "rgb(var(--app-gray-50) / <alpha-value>)",
          100: "rgb(var(--app-gray-100) / <alpha-value>)",
          200: "rgb(var(--app-gray-200) / <alpha-value>)",
          300: "rgb(var(--app-gray-300) / <alpha-value>)",
          400: "rgb(var(--app-gray-400) / <alpha-value>)",
          500: "rgb(var(--app-gray-500) / <alpha-value>)",
          600: "rgb(var(--app-gray-600) / <alpha-value>)",
          700: "rgb(var(--app-gray-700) / <alpha-value>)",
          800: "rgb(var(--app-gray-800) / <alpha-value>)",
          900: "rgb(var(--app-gray-900) / <alpha-value>)",
          950: "rgb(var(--app-gray-950) / <alpha-value>)",
          DEFAULT: "rgb(var(--app-gray-default) / <alpha-value>)",
        },
        primary: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
          950: "#172554",
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
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
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
      keyframes: {
        open: {
          "0%": {
            opacity: "1",
            transform: "translateX(100%)",
          },
        },
        close: {
          to: {
            opacity: "0",
            transform: "translateX(100%)",
          },
        },
        waving: {
          "0%": {
            transform: "rotate(0.0deg)",
          },
          "10%": {
            transform: "rotate(14deg)",
          },
          "20%": {
            transform: "rotate(-8deg)",
          },
          "30%": {
            transform: "rotate(14deg)",
          },
          "40%": {
            transform: "rotate(-4deg)",
          },
          "50%": {
            transform: "rotate(10.0deg)",
          },
          "60%": {
            transform: "rotate(0.0deg)",
          },
          "100%": {
            transform: "rotate(0.0deg)",
          },
        },
      },
      animation: {
        "drawer-open": "open 0.3s ease-in-out",
        "drawer-close": "close 0.3s ease-in-out",
        "waving-hand": "waving 2s linear 3",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [
    tailwindcssAnimate,
    tailwindTypography,
    require("./src/styles/components.css"),
  ],
} satisfies Config

export default config
