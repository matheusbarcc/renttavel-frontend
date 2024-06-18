/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    colors: {
      ...require('tailwindcss/colors'),
      'rentlaranja': '#ff914d',
      'rentazul': '#011e44',
      'rentbranco': '#ffffff',
      'rentcinza': '#cccccc',
      'rentpreto': '#000000'
    },
    extend: {
      boxShadow: {
        'custom-direction': '2px 0px 10px rgba(0, 0, 0, 0.2)', // Adjust the values as needed
      },
    },
  },
  plugins: [],
}
