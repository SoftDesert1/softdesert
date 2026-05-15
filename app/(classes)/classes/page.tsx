import { MainLayout } from "@/components/layout/MainLayout";

import { ClassCard } from "@/components/classes/ClassCard";

import { getClasses } from "@/lib/classes/getClasses";

export default async function ClassesPage() {

  const classes =
    await getClasses();

  return (

    <div className="space-y-12">

      {/* HERO */}

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
              text-4xl
              md:text-5xl
              font-black
              text-white
            "
          >
            ⚔️ Explore todas as classes
          </h1>

          <p
            className="
              mt-4
              text-lg
              text-gray-300
              max-w-3xl
            "
          >
            Builds, PvE, PvP,
            combos, recomendações,
            guias e conteúdo da
            comunidade.
          </p>

        </div>

      </div>

      {/* GRID */}

      {classes.length === 0 ? (

        <div
          className="
            bg-black/55
            backdrop-blur-sm
            border
            border-red-900
            rounded-3xl
            p-10
            text-center
          "
        >

          <h2
            className="
              text-3xl
              font-black
              text-white
            "
          >
            Nenhuma classe cadastrada
          </h2>

        </div>

      ) : (

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-4
            gap-8
          "
        >

          {classes.map((classe) => (

            <ClassCard
              key={classe.id}
              name={classe.name}
              slug={classe.slug}
              image={classe.image}
              role={classe.role}
              difficulty={classe.difficulty}
              tags={classe.tags || []}
            />

          ))}

        </div>

      )}

    </div>

  );
}