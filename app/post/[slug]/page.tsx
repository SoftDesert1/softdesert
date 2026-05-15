import { MainLayout } from "@/components/layout/MainLayout";

import { getPostBySlug } from "@/lib/posts/getPostBySlug";

import { getRelatedPosts } from "@/lib/posts/getRelatedPosts";

import { PostHero } from "@/components/posts/PostHero";

import { LikeButton } from "@/components/posts/LikeButton";

import { PostComments } from "@/components/comments/PostComments";

import { NewsCard } from "@/components/cards/NewsCard";

import {
  ChevronUp,
  ChevronDown,
} from "lucide-react";

interface PostPageProps {

  params: Promise<{
    slug: string;
  }>;
}

function ScrollButtons() {

  return (

    <div
      className="
        fixed
        right-6
        top-1/2
        -translate-y-1/2
        z-50
        flex
        flex-col
        gap-4
      "
    >

      <button
        onClick={() =>
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          })
        }
        className="
          w-14
          h-14
          rounded-2xl
          bg-[#111]
          border
          border-red-900
          text-red-500
          flex
          items-center
          justify-center
          hover:bg-red-600
          hover:text-white
          hover:border-red-500
          transition
        "
      >

        <ChevronUp size={28} />

      </button>

      <button
        onClick={() =>
          window.scrollTo({
            top:
              document.body
                .scrollHeight,
            behavior: "smooth",
          })
        }
        className="
          w-14
          h-14
          rounded-2xl
          bg-[#111]
          border
          border-red-900
          text-red-500
          flex
          items-center
          justify-center
          hover:bg-red-600
          hover:text-white
          hover:border-red-500
          transition
        "
      >

        <ChevronDown size={28} />

      </button>

    </div>
  );
}

export default async function PostPage({
  params,
}: PostPageProps) {

  const { slug } = await params;

  const post =
    await getPostBySlug(slug);

  if (!post) {

    return (

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

    );
  }

  const relatedPosts =
    await getRelatedPosts(
      post.category,
      post.id
    );

  return (

    <>

      <ScrollButtons />

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
                  max-w-none

                  prose-headings:text-white
                  prose-p:text-gray-300
                  prose-strong:text-white
                  prose-li:text-gray-300

                  prose-blockquote:border-red-500
                  prose-blockquote:text-gray-400
                "
                dangerouslySetInnerHTML={{
                  __html: post.content,
                }}
              />

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
                    ).toLocaleDateString(
                      "pt-BR"
                    )}

                  </p>

                </div>

              </div>

            </div>

          </aside>

        </div>

      </div>

    </>

  );
}