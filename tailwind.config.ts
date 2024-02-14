import type { Config } from 'tailwindcss'

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    colors: {
      "primary-white": "#ffffff",
      "primary-black": "#000000",
      "secondary-blue": "lightblue",
    },
    extend: {
      backgroundImage: {
        "big-background": "url('/blue-background.png')",
        "yellow-knit-stitch": "url('/yellow-knit-stitch.jpg')",
      },
    },
  },
  plugins: [],
};
export default config
