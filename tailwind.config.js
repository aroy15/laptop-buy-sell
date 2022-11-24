/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#00334E",
        secondary: "#004D73",
        accent: "#007FBC",
        light: "#DBEBFA"
      }
    }
  },
  plugins: [require("daisyui")],
}
