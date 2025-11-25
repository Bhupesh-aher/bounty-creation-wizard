/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["system-ui", "ui-sans-serif", "sans-serif"],
      },
      colors: {
        primary: {
          DEFAULT: "#1677ff",
        },
        accent: {
          orange: "#ff7a45",
        },
      },
    },
  },
  plugins: [],
};
