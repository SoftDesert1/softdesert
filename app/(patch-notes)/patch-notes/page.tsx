import { MainLayout }
from "@/components/layout/MainLayout";

import { NewsCard }
from "@/components/posts/NewsCard";

import { supabase }
from "@/lib/supabase/client";

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

        {/* HEADER */}

        <div className="space-y-4">

          <h1
            className="
              text-6xl
              font-black
              text-white
            "
          >
            Patch Notes
          </h1>

          <p
            className="
              text-gray-400
              text-xl
            "
          >
            Atualizações
            e balanceamentos
          </p>

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
                post.content?.slice(
                  0,
                  120
                ) + "..."
              }
              image={post.image}
              slug={post.slug}
            />

          ))}

        </div>

      </div>

  );
}