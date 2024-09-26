/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
       // primary: "#bde0fe",

        bprimary: {
          DEFAULT:"#fff6e8",
          100: "#FEFBF3",
          200: "#FEF6E8",
          300: "#FDEFDC",
          400: "#FBE7D3",
          500: "#F9DCC4",
          600: "#D6AB8F",
          700: "#B37E62",
          800: "#90563E",
          900: "#773825",
        },

        secondary: {
          DEFAULT: "#F9DCC4",
          100: "#FEFBF3",
          200: "#FEF6E8",
          300: "#FDEFDC",
          400: "#FBE7D3",
          500: "#F9DCC4",
          600: "#D6AB8F",
          700: "#B37E62",
          800: "#90563E",
          900: "#773825",
        },

        t_primary: {
          DEFAULT: "#000",
          100: "#FEFBF3",
          200: "#FEF6E8",
          300: "#FDEFDC",
          400: "#FBE7D3",
          500: "#F9DCC4",
          600: "#D6AB8F",
          700: "#B37E62",
          800: "#90563E",
          900: "#773825",
        },
        t_secondary: {
          DEFAULT: "#06b6d4",
        },


        col_important: {
          DEFAULT: "#00c9aa",
        },
        black: {
          DEFAULT: "#000",
          100: "#1E1E2D",
          200: "#232533",
        },
        gray: {
          100: "#CDCDE0",
        },
      },
      fontFamily: {
        pthin: ["Poppins-Thin", "sans-serif"],
        pextralight: ["PoppBins-ExtraLight", "sans-serif"],
        plight: ["Poppins-Light", "sans-serif"],
        pregular: ["Poppins-Regular", "sans-serif"],
        pmedium: ["Poppins-Medium", "sans-serif"],
        psemibold: ["Poppins-SemiBold", "sans-serif"],
        pbold: ["Poppins-Bold", "sans-serif"],
        pextrabold: ["Poppins-ExtraBold", "sans-serif"],
        pblack: ["Poppins-Black", "sans-serif"],
      },
    },
  },
  plugins: [],
  corePlugin: {
    backgroundOpacity: true,
  },
};