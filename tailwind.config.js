/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/*.{html,js}"],
  theme: {
   
    extend: {
      backgroundImage: {
        'hero-pattern': "url('./images/image-hero.jpg')"
      },
    },
  },
  plugins: [],
}

