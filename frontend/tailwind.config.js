/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html","./src/**/*.{html,jsx,}"
],
theme: {
  extend: {
    colors: {
      primaryColor: "#C63D2F",
      secondaryColor: "#FFBB5C",
      tertiaryColor: "#E25E3E",
      quaternaryColor: "#FF9B50"
    },
  },
},
plugins: [],
}