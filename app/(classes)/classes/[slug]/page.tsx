import Image from "next/image";

import { MainLayout } from "@/components/layout/MainLayout";

import { getClassBySlug } from "@/lib/classes/getClassBySlug";

import { getClassSections } from "@/lib/classes/getClassSections";

import { ClassTabs }
from "@/components/classes/ClassTabs";

interface ClassPageProps {

  params: Promise<{
    slug: string;
  }>;
}

export default async function ClassPage({
  params,
}: ClassPageProps) {

  const { slug } = await params;

  const classe =
    await getClassBySlug(slug);

  const sections =
    await getClassSections(
      classe.id
    );

  if (!classe) {

    return (

      <MainLayout>

        <div
          className="
            min-h-[50vh]
            flex
            items-center
            justify-center
          "
        >

          <h1
            className="
              text-4xl
              font-black
              text-white
            "
          >
            Classe não encontrada
          </h1>

        </div>

      </MainLayout>

    );
  }

  return (

    <MainLayout>

      <div className="space-y-12">

        {/* HERO */}

        <section
          className="
            relative
            overflow-hidden
            rounded-3xl
            border
            border-red-900
            min-h-[700px]
          "
        >

          <Image
            src={classe.banner || classe.image}
            alt={classe.name}
            fill
            className="
              object-cover
              object-top
            "
          />

          <div
            className="
              absolute
              inset-0
              bg-gradient-to-t
              from-black
              via-black/70
              to-transparent
            "
          />

          <div
            className="
              absolute
              bottom-0
              left-0
              p-12
              max-w-4xl
              space-y-6
            "
          >

            <div
              className="
                flex
                items-center
                gap-3
                flex-wrap
              "
            >

              <span
                className="
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
                {classe.role}
              </span>

              <span
                className="
                  bg-[#222]
                  px-4
                  py-2
                  rounded-full
                  text-sm
                  font-bold
                  uppercase
                  text-gray-300
                "
              >
                {classe.difficulty}
              </span>

            </div>

            <h1
              className="
                text-7xl
                font-black
                text-white
                leading-none
              "
            >
              {classe.name}
            </h1>

            <p
              className="
                text-2xl
                text-gray-300
                max-w-3xl
                leading-relaxed
              "
            >
              {classe.description}
            </p>

          </div>

        </section>

        {/* CONTENT */}

        <div
          className="
            grid
            grid-cols-1
            xl:grid-cols-3
            gap-10
          "
        >

          {/* MAIN */}

          <div
            className="
              xl:col-span-2
              space-y-8
            "
          >

            <div
              className="
                bg-[#111]
                border
                border-red-900
                rounded-3xl
                p-10
              "
            >

              <h2
                className="
                  text-4xl
                  font-black
                  text-white
                  mb-6
                "
              >
                Sobre a Classe
              </h2>

              <p
                className="
                  text-xl
                  text-gray-300
                  leading-relaxed
                "
              >
                {classe.description}
              </p>

            </div>

            {/* SECTIONS */}

<ClassTabs
  sections={sections}
/>

          </div>

          {/* SIDEBAR */}

          <aside className="space-y-6">

            <div
              className="
                bg-[#111]
                border
                border-red-900
                rounded-3xl
                p-6
              "
            >

              <h2
                className="
                  text-2xl
                  font-black
                  text-white
                  mb-5
                "
              >
                Tags
              </h2>

              <div
                className="
                  flex
                  flex-wrap
                  gap-3
                "
              >

                {(classe.tags || []).map(
                  (tag: string) => (

                    <span
                      key={tag}
                      className="
                        bg-black/40
                        border
                        border-red-900/40
                        px-3
                        py-2
                        rounded-full
                        text-sm
                        text-gray-300
                      "
                    >
                      #{tag}
                    </span>

                  )
                )}

              </div>

            </div>

          </aside>

        </div>

      </div>

    </MainLayout>
  );
}