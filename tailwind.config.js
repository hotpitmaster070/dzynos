/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: { 
    extend: {
      colors: {
        biruz: "#2dd4bf",
        biruzGlow: "#00f5d4",
        trueBlack: "#000000",
      }
    } 
  },
  plugins: [],
}
