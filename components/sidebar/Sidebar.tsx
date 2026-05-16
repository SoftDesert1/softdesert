"use client";

import Link from "next/link";

import {
  Home,
  Newspaper,
  Swords,
  ScrollText,
  Radio,
  X,
} from "lucide-react";

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

      {/* OVERLAY */}

      <div
        onClick={onClose}
        className={`
          fixed
          inset-0
          bg-black/70
          backdrop-blur-sm
          z-40
          transition-opacity
          duration-300

          ${isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
          }
        `}
      />

      {/* SIDEBAR */}

      <aside
        className={`
          fixed
          top-0
          left-0
          z-50

          h-dvh
          w-[300px]

          overflow-y-auto

          bg-black/80
          backdrop-blur-2xl

          border-r
          border-red-900/60

          shadow-[0_0_40px_rgba(255,0,0,0.15)]

          transform
          transition-transform
          duration-500

          ${isOpen
            ? "translate-x-0"
            : "-translate-x-full"
          }
        `}
      >

        {/* HEADER */}

        <div
          className="
            sticky
            top-0
            z-20

            flex
            items-center
            justify-between

            px-6
            py-6

            bg-black/70
            backdrop-blur-xl

            border-b
            border-red-900/40
          "
        >

          <div className="space-y-1">

            <h2
              className="
                text-3xl
                font-black
                text-white
              "
            >
              <span className="text-white">
                Soft
              </span>

              <span className="text-red-500">
                Desert
              </span>
            </h2>

            <p
              className="
                text-xs
                uppercase
                tracking-[0.3em]
                text-gray-500
              "
            >
              BDO Community
            </p>

          </div>

          <button
            onClick={onClose}
            className="
              w-11
              h-11

              rounded-2xl

              bg-[#111]

              border
              border-red-900/50

              flex
              items-center
              justify-center

              text-gray-400

              hover:bg-red-600
              hover:text-white
              hover:border-red-500

              transition
            "
          >

            <X size={20} />

          </button>

        </div>

        {/* MENU */}

        <nav
          className="
            flex
            flex-col
            gap-3

            p-6
          "
        >

          <SidebarLink
            href="/"
            icon={<Home size={20} />}
            label="Home"
            onClose={onClose}
          />

          <SidebarLink
            href="/news"
            icon={<Newspaper size={20} />}
            label="Notícias"
            onClose={onClose}
          />

          <SidebarLink
            href="/classes"
            icon={<Swords size={20} />}
            label="Classes"
            onClose={onClose}
          />

          <SidebarLink
            href="/patch-notes"
            icon={<ScrollText size={20} />}
            label="Patch Notes"
            onClose={onClose}
          />

          <SidebarLink
            href="/lives"
            icon={<Radio size={20} />}
            label="Lives"
            onClose={onClose}
          />

          <SidebarLink
            href="/suggest-post"
            icon={<Newspaper size={20} />}
            label="Sugestões"
            onClose={onClose}
          />

        </nav>

      </aside>

    </>
  );
}

function SidebarLink({
  href,
  icon,
  label,
  onClose,
}: {
  href: string;

  icon: React.ReactNode;

  label: string;

  onClose: () => void;
}) {

  return (

    <Link
      href={href}
      onClick={onClose}
      className="
        group

        flex
        items-center
        gap-4

        rounded-2xl

        border
        border-transparent

        bg-[#111]/70

        px-5
        py-4

        text-gray-300

        hover:border-red-900
        hover:bg-red-950/30
        hover:text-white

        transition-all
        duration-300
      "
    >

      <div
        className="
          text-red-500

          group-hover:scale-110

          transition
        "
      >
        {icon}
      </div>

      <span
        className="
          text-lg
          font-semibold
        "
      >
        {label}
      </span>

    </Link>
  );
}