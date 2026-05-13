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

export default function AdminClassesPage() {

  const [classes, setClasses] =
    useState<any[]>([]);

  useEffect(() => {

    fetchClasses();

  }, []);

  async function fetchClasses() {

    const { data } =
      await supabase

        .from("classes")

        .select("*")

        .order(
          "created_at",
          {
            ascending: false,
          }
        );

    setClasses(data || []);
  }

  async function deleteClass(
    id: number
  ) {

    const confirmed =
      confirm(
        "Excluir classe?"
      );

    if (!confirmed) return;

    await supabase

      .from("classes")

      .delete()

      .eq("id", id);

    fetchClasses();
  }

  return (

    <MainLayout>

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
              Gerenciar Classes
            </h1>

            <p
              className="
                text-gray-400
                mt-2
              "
            >
              Edite e organize
              as classes do portal
            </p>

          </div>

          <Link
            href="/admin/classes/create"
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
            + Nova Classe
          </Link>

        </div>

        {/* CLASSES */}

        <div className="space-y-5">

          {classes.map((classe) => (

            <div
              key={classe.id}
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

              <div
                className="
                  flex
                  items-center
                  gap-5
                "
              >

                <img
                  src={classe.image}
                  alt={classe.name}
                  className="
                    w-24
                    h-24
                    object-cover
                    rounded-2xl
                    border
                    border-red-900
                  "
                />

                <div className="space-y-2">

                  <h2
                    className="
                      text-2xl
                      font-bold
                      text-white
                    "
                  >
                    {classe.name}
                  </h2>

                  <p
                    className="
                      text-gray-400
                    "
                  >
                    {classe.role}
                  </p>

                </div>

              </div>

              <div className="flex gap-3">

                <Link
                  href={`/admin/classes/${classe.id}`}
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
                    deleteClass(
                      classe.id
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

    </MainLayout>
  );
}