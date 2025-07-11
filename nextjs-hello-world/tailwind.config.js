/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // Enable dark mode via .dark class
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // You can add custom colors, fonts, etc. here
    },
  },
  plugins: [],
};