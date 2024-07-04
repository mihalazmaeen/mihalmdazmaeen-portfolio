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
      animation: {
        // {...}
        spin_right: "spin_right 3s linear infinite",
        spin_right_fast: "spin_right 2s linear infinite",
        spin_left: "spin_left 3s linear infinite",
      },
      keyframes: {
        // {...}
        spin_right: {
          "0%": { transform: "rotate(0deg)" },
          "50%": { transform: "rotate(180deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        spin_left: {
          "0%": { transform: "rotate(0deg)" },
          "50%": { transform: "rotate(-180deg)" },
          "100%": { transform: "rotate(-360deg)" },
        },
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
