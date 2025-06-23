/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  plugins: [
    // Note: Check if tailwind-scrollbar-hide is compatible with v4
    // You may need to find an alternative or update the plugin
    require('tailwind-scrollbar-hide'),
  ],
};
