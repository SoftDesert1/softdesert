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

      <div
        className="
          relative
          overflow-hidden

          rounded-[32px]

          border
          border-red-900

          bg-black/55
          backdrop-blur-sm

          px-8
          py-10
        "
      >

        <div
          className="
            absolute
            inset-0

            bg-gradient-to-r
            from-red-950/10
            to-transparent

            pointer-events-none
          "
        />

        <div className="relative z-10">

          <h1
            className="
              text-5xl
              font-black
              text-white
            "
          >
            🛠️ Admin Dashboard
          </h1>

          <p
            className="
              mt-4
              text-lg
              text-gray-300
            "
          >
            Gerencie o portal
            SoftDesert.
          </p>

        </div>

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
            bg-black/55
            backdrop-blur-sm

            border
            border-red-900

            rounded-3xl

            p-10

            hover:border-red-500
            hover:bg-red-950/20

            transition-all
            duration-300

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
            bg-black/55
            backdrop-blur-sm

            border
            border-red-900

            rounded-3xl

            p-10

            hover:border-red-500
            hover:bg-red-950/20

            transition-all
            duration-300

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

        {/* LIVES */}

        <Link
          href="/admin/lives"
          className="
            bg-black/55
            backdrop-blur-sm

            border
            border-red-900

            rounded-3xl

            p-10

            hover:border-red-500
            hover:bg-red-950/20

            transition-all
            duration-300

            group
          "
        >

          <div className="space-y-4">

            <div
              className="
                text-5xl
              "
            >
              📺
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
            bg-black/55
            backdrop-blur-sm

            border
            border-red-900

            rounded-3xl

            p-10

            hover:border-red-500
            hover:bg-red-950/20

            transition-all
            duration-300

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

        {/* SUGESTÕES */}

        <Link
          href="/admin/suggestions"
          className="
            bg-black/55
            backdrop-blur-sm

            border
            border-red-900

            rounded-3xl

            p-10

            hover:border-red-500
            hover:bg-red-950/20

            transition-all
            duration-300

            group
          "
        >

          <div className="space-y-4">

            <div className="text-5xl">
              📬
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
              Sugestões
            </h2>

            <p className="text-gray-400">

              Posts sugeridos
              pela comunidade

            </p>

          </div>

        </Link>

      </div>

    </div>

  );
}