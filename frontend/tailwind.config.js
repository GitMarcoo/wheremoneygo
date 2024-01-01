const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx,vue}', './public/index.html'],
  darkMode: 'class', // or 'media' or 'class'
  content: [
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      spacing: {
        '10': '2.5rem', // 1rem = 16px, so 2.5rem = 40px
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}