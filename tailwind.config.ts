import type { Config } from "tailwindcss";

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
    colors: {
      light: "#fff",
      accent: "#F6285B",
      "grey-100": "#F9F9F9",
      "grey-200": "#EDEDED",
      "grey-300": "#C0C0C0",
      "grey-400": "#ADADAD",
      dark: "#202020",
      yellow: "#FFD600",
      green: "#1BB446",
      red: "#FE0000",
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      boxShadow: {
        small: "0 2px 3px rgba(0, 0, 0, 0.1)",
        base: "0 0 10px rgba(0, 0, 0, 0.1)",
      },
      keyframes: {
        "bg-on": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "bg-off": {
          from: { opacity: "1" },
          to: { opacity: "0" },
        },
        "slide-down": {
          from: { transform: "translateY(-5%)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
        "slide-up": {
          from: { transform: "translateY(0)", opacity: "1" },
          to: { transform: "translateY(-5%)", opacity: "0" },
        },
      },
      animation: {
        "bg-on": "bg-on 0.2s ease forwards",
        "bg-off": "bg-off 0.2s ease forwards",
        "slide-down": "slide-down 0.2s ease forwards",
        "slide-up": "slide-up 0.2s ease forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
