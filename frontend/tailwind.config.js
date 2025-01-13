/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}", // Adjust this based on your file structure
  ],
  theme: {
    extend: {
      animation: {
        loadingRotate: "loadingRotate 800ms linear infinite",
      },
      keyframes: {
        loadingRotate: {
          to: {
            transform: "rotateZ(-360deg)",
          },
        },
      },
    },
  },
  plugins: [],
}