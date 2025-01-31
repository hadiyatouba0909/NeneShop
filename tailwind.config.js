// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
      extend: {
        colors: {
          'custom-pink': '#900F56',
          'custom-pink-dark': '#7d0d4a',
        },
        fontFamily: {
          'poppins': ['Poppins', 'sans-serif'],
        },
      },
    },
    plugins: [],
  }