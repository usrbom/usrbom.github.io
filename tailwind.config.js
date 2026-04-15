const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: "#091d2d",
        "dark-bg": "#0a0a0a",
        "dark-surface": "#161616",
        "dark-surface-high": "#1f1f1f",
        "pale-gray": "#f7f9ff",
        accent: "#0040e0",
        "accent-bright": "#2e5bff",
        "surface-low": "#edf4ff",
        "surface-white": "#ffffff",
        signal: "#00c1fd",
        amber: "#ffba35",
      },
      fontFamily: {
        heading: ["var(--font-space-grotesk)", ...fontFamily.sans],
        body: ["var(--font-inter)", ...fontFamily.sans],
      },
      boxShadow: {
        soft: "0 24px 60px rgba(9, 29, 45, 0.06)",
        float: "0 40px 80px rgba(9, 29, 45, 0.08)",
      },
      backgroundImage: {
        "accent-gradient":
          "linear-gradient(135deg, #0040e0 0%, #2e5bff 100%)",
      },
    },
  },
  plugins: [],
};
