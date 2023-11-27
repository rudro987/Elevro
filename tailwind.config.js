/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: "'Poppins', sans-serif",
      },
      colors: {
        primary: "#057B98",
        secondary: "#7734A0",
        secondaryHover: "#61168F",
        menuText: "#F3F3F3",
        titleText: "#3B3A3A",
        bodyText: "#3B3A3A",
      },
      backgroundImage: {
        'banner': "url('https://i.ibb.co/h1bvhGV/banner-bg.png')",
      }
    },
  },
  plugins: [require("daisyui")],
}

