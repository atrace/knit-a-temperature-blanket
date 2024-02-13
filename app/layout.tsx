import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ContextWrapper from "./ui/context/ContextWrapper";
import React from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Knit a temperature blanket",
  description: "Knit a temperature blanket",
};

const RootLayout: React.FC<React.AllHTMLAttributes<{}>> = ({ children }) => {
  return (
    <html lang="en">
      <body
        // suppress hydration warnings caused by browser extensions e.g. grammarly, specifically:
        // Warning: Extra attributes from the server: data-new-gr-c-s-check-loaded,data-gr-ext-installed
        suppressHydrationWarning={true}
        className={inter.className}
      >
        <ContextWrapper>{children}</ContextWrapper>
      </body>
    </html>
  );
};

export default RootLayout;
