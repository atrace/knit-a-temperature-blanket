import type { Metadata } from "next";
import { Inter } from "next/font/google";
import React from "react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Knit a temperature blanket",
  description: "Knit a temperature blanket",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en">
    <body
      // suppress hydration warnings caused by browser extensions e.g. grammarly, specifically:
      // Warning: Extra attributes from the server: data-new-gr-c-s-check-loaded,data-gr-ext-installed
      suppressHydrationWarning={true}
      className={inter.className}
    >
      {children}
    </body>
  </html>
);

export default RootLayout;
