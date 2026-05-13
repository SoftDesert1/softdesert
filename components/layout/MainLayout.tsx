"use client";

import { useState } from "react";

import { Header } from "../header/Header";
import { Sidebar } from "../sidebar/Sidebar";

export function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const [isSidebarOpen, setIsSidebarOpen] =
    useState(false);

  return (
    <div className="bg-black text-white min-h-screen">

      <Header
        onOpenSidebar={() =>
          setIsSidebarOpen(true)
        }
      />

      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() =>
          setIsSidebarOpen(false)
        }
      />

      <main className="p-8">
        {children}
      </main>

    </div>
  );
}