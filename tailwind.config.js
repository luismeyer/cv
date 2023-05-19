const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Proxima Nova", ...defaultTheme.fontFamily.sans],
    },
    extend: {
      keyframes: {
        revealDown: {
          "0%": { height: 0 },
          "100%": { height: "100%" },
        },
      },
      animation: {
        down: "revealDown var(--down-animation-time) var(--down-animation-function)",
      },
    },
  },
  plugins: [],
};
