/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      width: {
        "1/10": "5%",
        "15/100": "15%",
      },
      textColor: {
        secondary: "#82ecad",
        darkblue: "#2d425b",
      },
      backgroundColor: {
        secondary: "#82ecad",
      },
    },
  },
  plugins: [],
};
