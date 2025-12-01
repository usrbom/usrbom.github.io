const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: "#0b1021",
        "pale-gray": "#f4f6fb",
        accent: "#2563eb",
      },
      fontFamily: {
        heading: ["var(--font-space-grotesk)", ...fontFamily.sans],
        body: ["var(--font-inter)", ...fontFamily.sans],
      },
      boxShadow: {
        soft: "0 20px 60px rgba(11, 16, 33, 0.07)",
      },
    },
  },
  plugins: [],
};
