import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Proxima Nova", ...defaultTheme.fontFamily.sans],
    },
    extend: {
      height: {
        screen: "100svh",
      },
      width: {
        screen: "100svw",
      },
      transitionDuration: {
        2000: "2000ms",
      },
      colors: {
        main: "#02d4d0",
      },
      keyframes: {
        revealDown: {
          "0%": { height: 0 },
          "100%": { height: "100%" },
        },
        slideFromLeft: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0px)" },
        },
      },
      animation: {
        down: "revealDown var(--down-animation-time) var(--down-animation-function)",
        slide: "slideFromLeft 0.5s ease forwards",
      },
    },
  },
  plugins: [],
};
