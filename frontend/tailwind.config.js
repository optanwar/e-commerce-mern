/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Scans all relevant files for Tailwind classes
  ],
  theme: {
    extend: {}, // Add custom styles here if needed
  },
  plugins: [
    require('@tailwindcss/line-clamp'), // Adds the line-clamp plugin for managing text overflow
  ],
};
