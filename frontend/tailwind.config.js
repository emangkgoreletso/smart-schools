/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./frontend/src/**/*.{js,jsx,ts,tsx}" // <- point to your frontend folder
  ],
  theme: {
    extend: {
      colors: {
        maroon: {
          700: "#800000",
          800: "#660000"
        },
      },
    },
  },
  plugins: [],
};
