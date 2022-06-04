module.exports = {
  darkMode: 'class',
  content: [
    "./renderer/pages/**/*.{js,ts,jsx,tsx}",
    "./renderer/containers/**/*.{js,ts,jsx,tsx}",
    "./renderer/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
