import type { Config } from 'tailwindcss'

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    colors: {
      "primary-white": "#ffffff",
      "primary-black": "#000000",
      "key-background": "black",
      "key-font": "white",
      "key-outline": "white",
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
