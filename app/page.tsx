import { MainLayout } from "@/components/layout/MainLayout";
import { BreakingNews } from "@/components/animations/BreakingNews";
import { NewsCard } from "@/components/cards/NewsCard";
import { HeroSection } from "@/components/home/HeroSection";
import { getPosts } from "@/lib/posts/getPosts";

export default async function Home() {

  const posts = await getPosts();

  return (
    <MainLayout>

      <div className="space-y-8">

        <BreakingNews />

        <HeroSection
          post={posts[0]}
        />

        <div>

          <h1 className="text-5xl font-bold text-red-500">
            Últimas Notícias
          </h1>

          <p className="text-gray-400 mt-2">
            Confira as novidades do Black Desert
          </p>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

          {posts.map((post) => (

            <NewsCard
              key={post.id}
              title={post.title}
              description={post.content}
              image={post.image}
              slug={post.slug}
            />

          ))}

        </div>

      </div>

    </MainLayout>
  );
}