/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        maroon: {
          700: "#800000",
          800: "#660000",
        },
      },
    },
  },
  plugins: [],
};
