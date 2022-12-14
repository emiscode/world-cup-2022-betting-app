/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: "Roboto, sans-serif",
      },

      backgroundImage: {
        effects: "url(/bg-effects.png)",
      },

      colors: {
        gray: {
          100: "#FAFAD2",
          300: "#8D8D99",
          900: "#112110",
          600: "#323238",
        },

        green: {
          500: "#129e57ff",
        },

        yellow: {
          500: "#f4cd06",
        },

        blue: {
          500: "#324acd",
          700: "#323bcd",
        },
      },
    },
  },
  plugins: [],
};
