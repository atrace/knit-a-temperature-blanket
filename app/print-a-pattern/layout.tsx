import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Print pattern instructions",
};

const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
    <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
  </div>
);

export default Layout;
