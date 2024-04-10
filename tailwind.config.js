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
        star: {
          "0%": { transform: "scale(0)", opacity: 0 },
          "100%": { transform: "scale(1)", opacity: 1 },
        },
        shake: {
          "0%": { transform: "translate(1px, 1px) rotate(0deg)" },
          "10%": { transform: "translate(-1px, -2px) rotate(-1deg)" },
          "20%": { transform: "translate(-3px, 0px) rotate(1deg)" },
          "30%": { transform: "translate(3px, 2px) rotate(0deg)" },
          "40%": { transform: "translate(1px, -1px) rotate(1deg)" },
          "50%": { transform: "translate(-1px, 2px) rotate(-1deg)" },
          "60%": { transform: "translate(-3px, 1px) rotate(0deg)" },
          "70%": { transform: "translate(3px, 1px) rotate(-1deg)" },
          "80%": { transform: "translate(-1px, -1px) rotate(1deg)" },
          "90%": { transform: "translate(1px, 2px) rotate(0deg)" },
          "100%": { transform: "translate(1px, -2px) rotate(-1deg)" },
        },
      },
      animation: {
        down: "revealDown var(--down-animation-time) var(--down-animation-function)",
        slide: "slideFromLeft 0.5s ease forwards",
        star: "star 0.5s ease forwards var(--star-animation-delay)",
        shake: "shake 0.5s ease infinite paused",
      },
    },
  },
  plugins: [],
};
