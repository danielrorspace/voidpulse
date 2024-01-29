const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },

      colors: {
        secondary: {
          // "main-100": "#676BF6",
          "signature-100": "#466FFF",
          "signature-200": "#2C3D95",
          "complement-100": "#24F0E1",
        },
        primary: {
          100: "#F1F1F7",
          200: "#D1D0DB",
          300: "#B7B5C5",
          400: "#9C9AAE",
          500: "#7D7B92",
          600: "#626076",
          700: "#403E54",
          800: "#343344",
          900: "#23222E",
          1000: "#0D0D13",
        },
      },
    },
  },
  plugins: [],
};
export default config;
