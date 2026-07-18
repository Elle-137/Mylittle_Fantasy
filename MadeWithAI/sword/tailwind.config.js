/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        silver: {
          DEFAULT: '#C0C0C0',
          50: '#F8F8F8',
          100: '#E8E8E8',
          200: '#D0D0D0',
          300: '#B8B8B8',
          400: '#A0A0A0',
          500: '#C0C0C0',
          600: '#969696',
          700: '#787878',
          800: '#606060',
          900: '#484848',
        },
      },
    },
  },
  plugins: [],
};
