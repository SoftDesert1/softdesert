"use client";

import Link from "next/link";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({
  isOpen,
  onClose,
}: SidebarProps) {
  return (
    <>
      {/* Overlay */}

      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/70 z-40"
        />
      )}

      {/* Sidebar */}

      <aside
        className={`
          fixed top-0 left-0 z-50
          h-screen w-64
          bg-[#0a0a0a]
          border-r border-red-900
          p-6
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >

        <h2 className="text-2xl font-bold text-red-500 mb-10">
          SoftDesert
        </h2>

        <nav className="flex flex-col gap-5">

          <Link
            href="/"
            className="text-gray-300 hover:text-red-500 transition"
          >
            Home
          </Link>

          <Link
            href="/noticias"
            className="text-gray-300 hover:text-red-500 transition"
          >
            Notícias
          </Link>

          <Link
            href="/classes"
            className="text-gray-300 hover:text-red-500 transition"
          >
            Classes
          </Link>

          <Link
            href="/patch-notes"
            className="text-gray-300 hover:text-red-500 transition"
          >
            Patch Notes
          </Link>

          <Link
            href="/lives"
            className="text-gray-300 hover:text-red-500 transition"
          >
            Lives
          </Link>

        </nav>

      </aside>
    </>
  );
}