const defaultTheme = require("tailwindcss/defaultTheme");
/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xxs: "320px",
      xs: "475px",
      xsm: "540px",
      ...defaultTheme.screens,
    },
    extend: {
      backgroundImage: {
        responsive: "url('/bg_responsive.jpg')",
        desktop: "url('/bg_desktop.jpg')",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
  prefix: "tw-",
};
