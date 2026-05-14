import { MainLayout } from "@/components/layout/MainLayout";

import { NewsCard } from "@/components/cards/NewsCard";

import {
  stripHtml,
} from "@/lib/posts/stripHtml";

import { searchPosts } from "@/lib/posts/searchPosts";

import {
  stripHtml,
} from "@/lib/posts/stripHtml";

interface SearchPageProps {

  searchParams: Promise<{
    q?: string;
  }>;
}

export default async function SearchPage({
  searchParams,
}: SearchPageProps) {

  const { q } =
    await searchParams;

  const posts =
    await searchPosts(q || "");

  return (

      <div className="space-y-10">

        <div className="space-y-3">

          <h1
            className="
              text-5xl
              font-black
              text-white
            "
          >
            Resultados da Busca
          </h1>

          <p className="text-gray-400">

            Pesquisa por:
            <span className="text-red-500">
              {" "} {q}
            </span>

          </p>

        </div>

        {posts.length === 0 ? (

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
              Nenhum resultado encontrado
            </h2>

          </div>

        ) : (

          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-2
              xl:grid-cols-3
              gap-6
            "
          >

            {posts.map((post) => (

              <NewsCard
                key={post.id}
                title={post.title}
                description={
  stripHtml(post.content)
}
                image={post.image}
                slug={post.slug}
              />

            ))}

          </div>

        )}

      </div>

  );
}