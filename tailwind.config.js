/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        Roboto: ["Roboto", "sans-serif"],
      },
       backgroundSize: {
        64: "64rem",
      },
      animation: {
        shimmer: "shimmer 4s infinite linear",
      },
      keyframes: {
        shimmer: {
          "0%": {
            "background-position": "-64rem",
          },
          "100%": {
            "background-position": "64rem",
          },
        },
      },
    },
  },
  plugins: [],
};
