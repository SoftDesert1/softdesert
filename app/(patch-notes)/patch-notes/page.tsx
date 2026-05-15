import { MainLayout }
from "@/components/layout/MainLayout";

import { NewsCard }
from "@/components/posts/NewsCard";

import { supabase }
from "@/lib/supabase/client";

import {
  stripHtml,
} from "@/lib/posts/stripHtml";

export const dynamic =
  "force-dynamic";

export default async function PatchNotesPage() {

  const { data: posts } =
    await supabase

      .from("posts")

      .select("*")

      .eq(
        "category",
        "patch-notes"
      )

      .order(
        "created_at",
        {
          ascending: false,
        }
      );

  return (

    <div
      className="
        max-w-7xl
        mx-auto
        space-y-10
      "
    >

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
            ⚒️ Patch Notes
          </h1>

          <p
            className="
              mt-4
              text-lg
              text-gray-300
              max-w-3xl
            "
          >
            Atualizações,
            balanceamentos,
            eventos e mudanças
            recentes do Black Desert.
          </p>

        </div>

      </div>

      {/* POSTS */}

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-3
          gap-8
        "
      >

        {posts?.map((post) => (

          <NewsCard
            key={post.id}
            title={post.title}
            description={
              stripHtml(
                post.content
              )
            }
            image={post.image}
            slug={post.slug}
          />

        ))}

      </div>

    </div>

  );
}