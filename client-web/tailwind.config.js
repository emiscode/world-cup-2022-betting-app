/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: "Roboto, sans-serif",
      },

      colors: {
        gray: {
          100: "#FAFAD2",
          900: "#112110",
        },

        green: {
          500: "#32CD32",
        },
      },
    },
  },
  plugins: [],
};
