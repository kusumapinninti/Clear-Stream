"use client";

import React from "react";
import { Sidebar, TopBar } from "@/components/Navigation";
import { usePathname } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  // Get title from pathname
  const getTitle = () => {
    const segments = pathname.split("/");
    const lastSegment = segments[segments.length - 1];
    if (lastSegment === "dashboard") return "Overview";
    return lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1);
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 pl-64 transition-all duration-300">
        <TopBar title={getTitle()} />
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
