import Link from "next/link";

import { MainLayout }
from "@/components/layout/MainLayout";

export default function AdminDashboard() {

  return (

      <div
        className="
          max-w-7xl
          mx-auto
          space-y-10
        "
      >

        {/* HEADER */}

        <div>

          <h1
            className="
              text-6xl
              font-black
              text-white
            "
          >
            Admin Dashboard
          </h1>

          <p
            className="
              text-gray-400
              mt-4
              text-xl
            "
          >
            Gerencie o portal SoftDesert
          </p>

        </div>

        {/* GRID */}

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-3
            gap-8
          "
        >

          {/* POSTS */}

          <Link
            href="/admin/posts"
            className="
              bg-[#111]
              border
              border-red-900
              rounded-3xl
              p-10
              hover:border-red-500
              transition
              group
            "
          >

            <div className="space-y-4">

              <div
                className="
                  text-5xl
                "
              >
                📰
              </div>

              <h2
                className="
                  text-3xl
                  font-black
                  text-white
                  group-hover:text-red-500
                  transition
                "
              >
                Posts
              </h2>

              <p className="text-gray-400">
                Criar e editar notícias
              </p>

            </div>

          </Link>

          {/* CLASSES */}

          <Link
            href="/admin/classes"
            className="
              bg-[#111]
              border
              border-red-900
              rounded-3xl
              p-10
              hover:border-red-500
              transition
              group
            "
          >

            <div className="space-y-4">

              <div className="text-5xl">
                ⚔️
              </div>

              <h2
                className="
                  text-3xl
                  font-black
                  text-white
                  group-hover:text-red-500
                  transition
                "
              >
                Classes
              </h2>

              <p className="text-gray-400">
                Gerenciar classes do jogo
              </p>

            </div>

          </Link>

          <Link
  href="/admin/lives"
  className="
    bg-[#111]
    border
    border-red-900
    rounded-3xl
    p-8
    hover:border-red-500
    transition
    space-y-4
  "
>

  <div
    className="
      text-5xl
    "
  >
    📺
  </div>

  <div className="space-y-2">

    <h2
      className="
        text-2xl
        font-black
        text-white
      "
    >
      Lives
    </h2>

    <p className="text-gray-400">

      Gerencie streamers
      e lives da comunidade

    </p>

  </div>

</Link>

          {/* SECTIONS */}

          <Link
            href="/admin/sections"
            className="
              bg-[#111]
              border
              border-red-900
              rounded-3xl
              p-10
              hover:border-red-500
              transition
              group
            "
          >

            <div className="space-y-4">

              <div className="text-5xl">
                📚
              </div>

              <h2
                className="
                  text-3xl
                  font-black
                  text-white
                  group-hover:text-red-500
                  transition
                "
              >
                Sections
              </h2>

              <p className="text-gray-400">
                Conteúdo das classes
              </p>

            </div>

          </Link>

        </div>

      </div>

  );
}