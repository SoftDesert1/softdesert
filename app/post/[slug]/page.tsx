import { MainLayout } from "@/components/layout/MainLayout";

import { getPostBySlug } from "@/lib/posts/getPostBySlug";

import { getRelatedPosts } from "@/lib/posts/getRelatedPosts";

import { PostHero } from "@/components/posts/PostHero";

import { LikeButton } from "@/components/posts/LikeButton";

import { PostComments } from "@/components/comments/PostComments";

import { NewsCard } from "@/components/cards/NewsCard";

interface PostPageProps {

  params: Promise<{
    slug: string;
  }>;
}

export default async function PostPage({
  params,
}: PostPageProps) {

  const { slug } = await params;

  const post =
    await getPostBySlug(slug);

  if (!post) {

    return (

      <MainLayout>

        <div
          className="
            min-h-[50vh]
            flex
            items-center
            justify-center
          "
        >

          <h1
            className="
              text-4xl
              font-black
              text-white
            "
          >
            Post não encontrado
          </h1>

        </div>

      </MainLayout>

    );
  }

  const relatedPosts =
    await getRelatedPosts(
      post.category,
      post.id
    );

  return (

    <MainLayout>

      <div
        className="
          max-w-7xl
          mx-auto
          space-y-16
        "
      >

        {/* HERO */}

        <PostHero
          post={post}
        />

        {/* CONTENT */}

        <div
          className="
            grid
            grid-cols-1
            xl:grid-cols-3
            gap-12
          "
        >

          {/* ARTICLE */}

          <article
            className="
              xl:col-span-2
              space-y-10
            "
          >

            {/* ACTIONS */}

            <div
              className="
                flex
                items-center
                gap-4
              "
            >

              <LikeButton
                postId={post.id}
              />

            </div>

            {/* TEXT */}

            <div
              className="
                bg-[#111]
                border
                border-red-900
                rounded-3xl
                p-10
              "
            >

              <div
                className="
                  prose
                  prose-invert
                  prose-lg
                  max-w-none
                "
              >

                <p
                  className="
                    text-gray-300
                    text-xl
                    leading-relaxed
                    whitespace-pre-line
                  "
                >
                  {post.content}
                </p>

              </div>

            </div>

            {/* RELATED POSTS */}

            {relatedPosts.length > 0 && (

              <section className="space-y-6">

                <div
                  className="
                    flex
                    items-center
                    gap-3
                  "
                >

                  <span className="text-3xl">
                    🔥
                  </span>

                  <h2
                    className="
                      text-4xl
                      font-black
                      text-white
                    "
                  >
                    Você também pode gostar
                  </h2>

                </div>

                <div
                  className="
                    grid
                    grid-cols-1
                    md:grid-cols-2
                    xl:grid-cols-3
                    gap-6
                  "
                >

                  {relatedPosts.map(
                    (relatedPost) => (

                      <NewsCard
                        key={relatedPost.id}
                        title={
                          relatedPost.title
                        }
                        description={
                          relatedPost.content
                        }
                        image={
                          relatedPost.image
                        }
                        slug={
                          relatedPost.slug
                        }
                      />

                    )
                  )}

                </div>

              </section>

            )}

            {/* COMMENTS */}

            <PostComments
              postId={post.id}
            />

          </article>

          {/* SIDEBAR */}

          <aside
            className="
              space-y-6
            "
          >

            <div
              className="
                bg-[#111]
                border
                border-red-900
                rounded-3xl
                p-6
              "
            >

              <h2
                className="
                  text-2xl
                  font-black
                  text-white
                  mb-4
                "
              >
                Sobre esta notícia
              </h2>

              <div className="space-y-4">

                <div>

                  <p className="text-gray-500 text-sm">
                    Categoria
                  </p>

                  <p className="text-white font-bold">
                    {post.category}
                  </p>

                </div>

                <div>

                  <p className="text-gray-500 text-sm">
                    Publicado em
                  </p>

                  <p className="text-white font-bold">

                    {new Date(
                      post.created_at
                    ).toLocaleDateString()}

                  </p>

                </div>

              </div>

            </div>

          </aside>

        </div>

      </div>

    </MainLayout>
  );
}