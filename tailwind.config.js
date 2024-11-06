/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#869D78'  // Votre couleur verte
      },
      borderColor: {
        DEFAULT: 'hsl(var(--border))',
      },
    }
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}