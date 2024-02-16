import { Inter } from "next/font/google";
import localFont from "next/font/local";

export const inter = Inter({ subsets: ["latin"] });

export const knitFont = localFont({
  src: "../public/jolly-sweater-font/JollySweaterRegular.ttf",
  display: "swap",
});
