import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/app/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0D1B2A",
        sea: "#0A9396",
        sand: "#E9D8A6",
        mist: "#94D2BD"
      }
    }
  },
  plugins: []
};

export default config;
