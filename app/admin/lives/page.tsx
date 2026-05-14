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

export default function AdminLivesPage() {

  const [lives, setLives] =
    useState<any[]>([]);

  useEffect(() => {

    fetchLives();

  }, []);

  async function fetchLives() {

    const { data } =
      await supabase

        .from("lives")

        .select("*")

        .order(
          "created_at",
          {
            ascending: false,
          }
        );

    setLives(data || []);
  }

  async function deleteLive(
    id: number
  ) {

    const confirmed =
      confirm(
        "Excluir live?"
      );

    if (!confirmed) return;

    await supabase

      .from("lives")

      .delete()

      .eq("id", id);

    fetchLives();
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
              Lives
            </h1>

            <p
              className="
                text-gray-400
                mt-2
              "
            >
              Gerencie streamers
              da comunidade
            </p>

          </div>

          <Link
            href="/admin/lives/create"
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
            + Nova Live
          </Link>

        </div>

        {/* LIST */}

        <div className="space-y-5">

          {lives.map((live) => (

            <div
              key={live.id}
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
                  src={live.image}
                  alt={live.streamer_name}
                  className="
                    w-32
                    h-20
                    object-cover
                    rounded-2xl
                  "
                />

                <div className="space-y-2">

                  <div
                    className="
                      inline-flex
                      bg-red-600
                      text-white
                      px-3
                      py-1
                      rounded-full
                      text-xs
                      font-bold
                    "
                  >
                    {live.platform}
                  </div>

                  <h2
                    className="
                      text-2xl
                      font-black
                      text-white
                    "
                  >
                    {live.streamer_name}
                  </h2>

                </div>

              </div>

              <div className="flex gap-3">

                <Link
                  href={`/admin/lives/${live.id}`}
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
                    deleteLive(
                      live.id
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