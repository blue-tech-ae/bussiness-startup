/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}", 
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563eb'
        }
      }
    },
  },
  plugins: [],
}

