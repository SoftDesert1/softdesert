import { BreakingNews } from "@/components/animations/BreakingNews";

import {
  AnimatedSection,
} from "@/components/animations/AnimatedSection";

import { NewsCard } from "@/components/cards/NewsCard";

import { HeroSection } from "@/components/home/HeroSection";

import { TrendingPosts } from "@/components/home/TrendingPosts";

import { getPosts } from "@/lib/posts/getPosts";

import { getTrendingPosts } from "@/lib/posts/getTrendingPosts";

import {
  stripHtml,
} from "@/lib/posts/stripHtml";

export const dynamic =
  "force-dynamic";

export default async function Home() {

  const posts =
    await getPosts();

  const trendingPosts =
    await getTrendingPosts();

  return (

    <div className="space-y-12">

      <BreakingNews />

      <AnimatedSection>

        <HeroSection
          posts={posts}
        />

      </AnimatedSection>

      {/* EM ALTA */}

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
            🔥 Em Alta Agora
          </h1>

          <p
            className="
              mt-4
              text-lg
              text-gray-300
              max-w-3xl
            "
          >
            Os conteúdos mais comentados
            da comunidade Black Desert.
          </p>

        </div>

      </div>

      <AnimatedSection delay={0.2}>

        <TrendingPosts
          posts={trendingPosts}
        />

      </AnimatedSection>

      {/* ÚLTIMAS NOTÍCIAS */}

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
            📰 Últimas Notícias
          </h1>

          <p
            className="
              mt-4
              text-lg
              text-gray-300
              max-w-3xl
            "
          >
            Atualizações, novidades e conteúdos
            recentes da comunidade.
          </p>

        </div>

      </div>

      <AnimatedSection delay={0.4}>

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

      </AnimatedSection>

    </div>
  );
}