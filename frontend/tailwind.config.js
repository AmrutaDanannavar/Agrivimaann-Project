/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        color1: '#1a2e05', //900
        color2: '#4d7c0f', //700
        color3: '#65a30d', //600
        color4:  '#d9f99d', //300
        color5: '#ecfccb' //100
        
      },
      fontFamily: {
        sans: ['Roboto', 'Arial', 'sans-serif'], // Add your Google Font here
      },
    },
  },
  plugins: [],
}