/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./index.html",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: "Plus Jakarta Sans",
    },
    extend: {},
  },
  plugins: [require("flowbite/plugin")],
};
