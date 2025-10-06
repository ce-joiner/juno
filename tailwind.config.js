/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#99F7AB',
        secondary: '#FAFFF9',
        neutral: {
          light: '#FFFFFE',
          DEFAULT: '#E2EEF0',
          dark: '#5D7263',
          darkest: '#222E50',
        },
      },
      fontFamily: {
        sans: ['DM Sans'],
        mono: ['DM Mono'],
      },
    },
  },
  plugins: [],
};
