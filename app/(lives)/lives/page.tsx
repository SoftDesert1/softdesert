"use client";

import {
  useEffect,
  useState,
} from "react";

import { MainLayout }
from "@/components/layout/MainLayout";

import { supabase }
from "@/lib/supabase/client";

export default function LivesPage() {

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

        .eq(
          "is_live",
          true
        )

        .order(
          "created_at",
          {
            ascending: false,
          }
        );

    setLives(data || []);
  }

  return (

    <MainLayout>

      <div
        className="
          max-w-7xl
          mx-auto
          space-y-12
        "
      >

        {/* HERO */}

        <section
          className="
            relative
            overflow-hidden
            rounded-[40px]
            border
            border-red-900
            bg-[#111]
            p-10
          "
        >

          <div className="space-y-6 max-w-3xl">

            <span
              className="
                inline-flex
                bg-red-600
                text-white
                px-4
                py-2
                rounded-full
                text-sm
                font-bold
                uppercase
              "
            >
              Community Lives
            </span>

            <h1
              className="
                text-6xl
                font-black
                text-white
              "
            >
              Lives da Comunidade
            </h1>

            <p
              className="
                text-xl
                text-gray-300
                leading-relaxed
              "
            >
              Divulgando streamers,
              shotcallers e criadores
              da comunidade Black Desert.
            </p>

          </div>

        </section>

        {/* GRID */}

        <div
          className="
            grid
            grid-cols-1
            xl:grid-cols-2
            gap-8
          "
        >

          {lives.map((live) => (

            <div
              key={live.id}
              className="
                bg-[#111]
                border
                border-red-900
                rounded-3xl
                overflow-hidden
              "
            >

              <div className="aspect-video">

                <iframe
                  src={live.embed_url}
                  className="
                    w-full
                    h-full
                  "
                  allowFullScreen
                />

              </div>

              <div className="p-6 space-y-5">

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
                      text-3xl
                      font-black
                      text-white
                    "
                  >
                    {live.streamer_name}
                  </h2>

                  <p className="text-gray-400">

                    {live.description}

                  </p>

                </div>

                <a
                  href={live.stream_url}
                  target="_blank"
                  className="
                    inline-flex
                    bg-red-600
                    hover:bg-red-700
                    transition
                    px-6
                    py-3
                    rounded-2xl
                    text-white
                    font-bold
                  "
                >
                  Assistir Live
                </a>

              </div>

            </div>

          ))}

        </div>

      </div>

    </MainLayout>
  );
}