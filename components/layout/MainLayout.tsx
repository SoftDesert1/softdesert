"use client";

import { useState } from "react";

import { Header }
from "../header/Header";

import { Sidebar }
from "../sidebar/Sidebar";

export function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const [
    isSidebarOpen,
    setIsSidebarOpen,
  ] = useState(false);

  return (

    <div
      className="
        min-h-screen
        bg-black/10
        backdrop-blur-[1px]
        text-white
      "
    >

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