/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        maroon: {
          600: "#7b1c1c",
          700: "#5a0f0f",
          800: "#3b0000"
        },
        black: "#000000",
        grey: "#808080",
        white: "#ffffff"
      },
    },
  },
  plugins: [],
};
