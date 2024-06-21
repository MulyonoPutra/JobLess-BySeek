/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{html,ts}", "./node_modules/preline/preline.js"],
  theme: {
    extend: {
      colors: {
        orange: colors.orange,
        primary1: "#153448",
        primary2: "#3C5B6F",
        primary3: "#948979",
        primary4: "#DFD0B8",
        disabled: "#707578",
      },
    },
  },
  plugins: [require("preline/plugin"), require("@tailwindcss/forms")],
};
