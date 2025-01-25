/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}", // Include files here
    "./public/index.html"              // Include your public HTML files
  ],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui'),],
};
