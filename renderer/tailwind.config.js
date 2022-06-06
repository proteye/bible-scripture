const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  darkMode: 'class',
  content: [
    "./renderer/pages/**/*.{js,ts,jsx,tsx}",
    "./renderer/containers/**/*.{js,ts,jsx,tsx}",
    "./renderer/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      ...defaultTheme.fontFamily,
      sans: ['Roboto', '"Helvetica Neue"', 'Helvetica', 'sans-serif', ...defaultTheme.fontFamily.sans],
      greek: ['SBL-Greek', 'BW-Greek'],
      hebrew: ['SBL-Hebrew', 'BW-Hebrew'],
    },
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
