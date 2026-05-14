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
            rounded-3xl
            border
            border-red-900
            bg-[#111]
            p-12
          "
        >

          <div className="space-y-5">

            <span
              className="
                inline-flex
                bg-red-600
                px-4
                py-2
                rounded-full
                text-sm
                font-bold
                uppercase
                text-white
              "
            >
              Classes
            </span>

            <h1
              className="
                text-6xl
                font-black
                text-white
                leading-tight
              "
            >
              Explore todas
              as classes
            </h1>

            <p
              className="
                text-xl
                text-gray-400
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
              bg-[#111]
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