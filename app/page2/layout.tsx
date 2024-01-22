import { Metadata } from "next";
import SideNav from "../ui/page2/sidenav";
import React from "react";

export const metadata: Metadata = {
  title: "This is another title"
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}
