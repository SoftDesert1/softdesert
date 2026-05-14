import { BreakingNews } from "@/components/animations/BreakingNews";

import {
  AnimatedSection,
} from "@/components/animations/AnimatedSection";

import { NewsCard } from "@/components/cards/NewsCard";

import { HeroSection } from "@/components/home/HeroSection";

import { TrendingPosts } from "@/components/home/TrendingPosts";

import { getPosts } from "@/lib/posts/getPosts";

import { getTrendingPosts } from "@/lib/posts/getTrendingPosts";

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

      <AnimatedSection delay={0.2}>

        <TrendingPosts
          posts={trendingPosts}
        />

      </AnimatedSection>

      <div className="space-y-2">

        <h1
          className="
            text-5xl
            font-bold
            text-red-500
          "
        >
          Últimas Notícias
        </h1>

        <p className="text-gray-400">

          Confira as novidades
          do Black Desert

        </p>

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