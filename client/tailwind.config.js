/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [  "./src/**/*.{ts,tsx}",],
  theme: {
    extend: {
      padding:{
        "1/3": "33.33333%",
        "2/3": "66.66667%",
      },
      colors:{
        "mainOrange": "#ff7d1a",
        "paleOrange": "#ffede0",
        "grayishBlue": "#F7F8FD"
      },
      fontFamily:{
        roboto: "roboto"
      }
    },
  },variants: {
    extend: {
      visibility: ["group-hover"],
    },
   },
  plugins: [],
}
