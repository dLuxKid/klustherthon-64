/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#3498db", // Dodger Blue
        background: "#f5f5f5", // Light Gray
        success: "#2ecc71", // Emerald Green
        error: "#e74c3c", // Alizarin
        text: "#34495e", // Wet Asphalt
      },
    },
  },
  plugins: [],
};
