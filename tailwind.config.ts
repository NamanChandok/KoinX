import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#EFF2F5",
        foreground: "#0F1629",
        gray: "#3E5765",
        blue_light: "#2870EA",
        blue_dark: "#1B4AEF",
        blue_darker: "#0052FE",
        bluer: "#0141CF",
        stock_green: "#14B079",
        stock_green_bg: "#0AB27D0F",
        stock_red: "#E96975",
        stock_red_bg: "#EE68551A",
        light_gray: "#768396"
      },
      backgroundImage: {
        "gradient-red-green": "linear-gradient(90deg, rgba(255,0,0,1) 0%, rgba(255,133,0,1) 33%, rgba(255,223,0,1) 66%, rgba(0,255,0,1) 100%)",
      },
      width: {
        "1/10": "10%",
        "2/10": "20%",
        "3/10": "30%",
        "4/10": "40%",
        "5/10": "50%",
        "6/10": "60%",
        "7/10": "70%",
        "8/10": "80%",
        "9/10": "90%",
      },
    },
  },
  plugins: [],
} satisfies Config;
