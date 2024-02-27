/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./features/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "violet-1000": "#1C034A",
        smoke: "rgba(0, 0, 0, .2)",
        overlay: "rgba(0, 0, 0, .6)",
        "fog-900": "rgba(255, 255, 255, 0.9)",
        "fog-700": "rgba(255, 255, 255, 0.7)",
        "violet-transparent": "rgba(139, 92, 246, 0.7)",
      },
      fontFamily: {
        sans: ["var(--poppins)", "sans-serif"],
      },
      dropShadow: {
        sm: "0 4px 2px rgba(0, 0, 0, 0.07)",
        light: "0 4px 4px rgba(196, 181, 253, 0.15)",
      },
      boxShadow: {
        border: "0 0 4px 0 rgba(0, 0, 0, 0.15)",
      },
    },
  },
  plugins: [],
};
