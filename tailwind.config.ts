import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,jsx,js,mdx}"],
  theme: {
    extend: {
      colors: {},
      fontFamily: {
        sans: ["PlusJakartaSans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
