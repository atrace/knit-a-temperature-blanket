import type { Metadata } from "next";
import React from "react";
import { inter } from "./font";
import "./globals.css";
import { Header } from "./ui/Header";

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
      <Header />
      {children}
    </body>
  </html>
);

export default RootLayout;
