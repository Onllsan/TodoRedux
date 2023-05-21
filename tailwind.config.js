/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      Poppins: "Poppins",
    },
    extend: {
      colors: {
        orange: "#FF8144",
        lightorange: "#FFB691",
        lightpink: "#ddd6fe",
        transparentBlack: "rgba(0,0,0,0.85)",

        Gray: "#6B7498",
      },
      boxShadow: {
        custom: "0 4px 0px 0px rgba(209, 178, 178, 0.8)",
        customButton: "0 4px 0px 0px rgba(255, 184, 177, 0.8)",
      },
    },
  },
  plugins: [],
};
