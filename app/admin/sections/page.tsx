"use client";

import Link from "next/link";

import {
  useEffect,
  useState,
} from "react";

import { supabase }
from "@/lib/supabase/client";

import { MainLayout }
from "@/components/layout/MainLayout";

export default function AdminSectionsPage() {

  const [sections, setSections] =
    useState<any[]>([]);

  useEffect(() => {

    fetchSections();

  }, []);

  async function fetchSections() {

    const { data } =
      await supabase

        .from("class_sections")

        .select(`
          *,
          classes (
            name
          )
        `)

        .order(
          "created_at",
          {
            ascending: false,
          }
        );

    setSections(data || []);
  }

  async function deleteSection(
    id: number
  ) {

    const confirmed =
      confirm(
        "Excluir section?"
      );

    if (!confirmed) return;

    await supabase

      .from("class_sections")

      .delete()

      .eq("id", id);

    fetchSections();
  }

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
            flex
            items-center
            justify-between
            gap-6
          "
        >

          <div>

            <h1
              className="
                text-5xl
                font-black
                text-white
              "
            >
              Gerenciar Sections
            </h1>

            <p
              className="
                text-gray-400
                mt-2
              "
            >
              Gerencie o conteúdo
              das classes
            </p>

          </div>

          <Link
            href="/admin/sections/create"
            className="
              bg-red-600
              hover:bg-red-700
              transition
              px-6
              py-4
              rounded-2xl
              text-white
              font-bold
            "
          >
            + Nova Section
          </Link>

        </div>

        {/* LIST */}

        <div className="space-y-5">

          {sections.map((section) => (

            <div
              key={section.id}
              className="
                bg-[#111]
                border
                border-red-900
                rounded-3xl
                p-6
                flex
                items-center
                justify-between
                gap-6
              "
            >

              <div className="space-y-2">

                <div
                  className="
                    flex
                    items-center
                    gap-3
                  "
                >

                  <span
                    className="
                      bg-red-600
                      text-white
                      text-xs
                      font-bold
                      px-3
                      py-1
                      rounded-full
                      uppercase
                    "
                  >
                    {section.type}
                  </span>

                  <span
                    className="
                      text-gray-400
                    "
                  >
                    {
                      section
                        .classes
                        ?.name
                    }
                  </span>

                </div>

                <h2
                  className="
                    text-2xl
                    font-bold
                    text-white
                  "
                >
                  {section.title}
                </h2>

              </div>

              <div className="flex gap-3">

                <Link
                  href={`/admin/sections/${section.id}`}
                  className="
                    bg-yellow-600
                    hover:bg-yellow-700
                    transition
                    px-5
                    py-3
                    rounded-xl
                    text-white
                    font-bold
                  "
                >
                  Editar
                </Link>

                <button
                  onClick={() =>
                    deleteSection(
                      section.id
                    )
                  }
                  className="
                    bg-red-600
                    hover:bg-red-700
                    transition
                    px-5
                    py-3
                    rounded-xl
                    text-white
                    font-bold
                  "
                >
                  Excluir
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

  );
}