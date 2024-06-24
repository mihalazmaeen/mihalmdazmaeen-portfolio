module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0A192F",
        secondary: "#F97316",
        tertiary: "#54D688",
      },
    },
    screens: {
      lg: { max: "2023px" },
      // => @media (max-width: 1023px) { ... }

      sm: { max: "1000px" },
      // => @media (max-width: 639px) { ... }
    },
  },
  plugins: [],
};
