/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      keyframes: {
        'slide-right': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        }
      },
      animation: {
        'slide-right': 'slide-right 5s linear infinite',
      },
      colors: {
        color1: '#F5F5F5', //900
        color2: '	#cadeef', //700
        color3: '#9bd4e4', //600
        color4:  '#39ace7', //300
        color5: '#0784b5' //100
        
      },
      fontFamily: {
        sans: ['Roboto', 'Arial', 'sans-serif'], // Add your Google Font here
      },
    },
  },
  plugins: [],
}