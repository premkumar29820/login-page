/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        netflixBlack: "#000000",
        netflixRed: "#E50914",
      },
    },
  },
  plugins: [],
};