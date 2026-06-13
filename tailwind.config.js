export default {
  content: ["./src/**/*.{jsx,js,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "wu-purple": {
          DEFAULT: "#4F2683",
          light:   "#6B47B0",
          pale:    "#EEEDFE",
          dark:    "#3B1A6A",
        }
      },
      fontFamily: {
        serif: ["Georgia", "Times New Roman", "serif"],
        sans:  ["system-ui", "-apple-system", "sans-serif"],
      }
    }
  }
};
