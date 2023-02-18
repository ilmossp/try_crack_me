/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'background': '#161616',
        myGreen: {
          DEFAULT: '#20C20E'
        }
      },
      textShadow: {
        'green': '0px 0px 8px rgba(32, 194, 14, 0.8)',
      },    
    },
  },

  variants: {
    textShadow: ['responsive', 'hover', 'focus'],
  },

  plugins: [
    require('tailwindcss-textshadow'),
  ],
};
