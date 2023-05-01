/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['src/**/*'],
  theme: {
    extend: {
      boxShadow: {
        customShadow: '0px 0px 20px rgba(0, 0, 0, 0.05)'
      }
    },
  },
  plugins: [],
}
