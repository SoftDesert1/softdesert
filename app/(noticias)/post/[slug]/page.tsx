import { MainLayout } from "@/components/layout/MainLayout";

import { getPostBySlug } from "@/lib/posts/getPostBySlug";

import { getRelatedPosts } from "@/lib/posts/getRelatedPosts";

import { LikeButton } from "@/components/posts/LikeButton";

import { PostComments } from "@/components/comments/PostComments";

import { NewsCard } from "@/components/cards/NewsCard";

import ScrollButtons
from "@/components/ui/ScrollButtons";

import {
  stripHtml,
} from "@/lib/posts/stripHtml";

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

        <section
          className="
            relative
            overflow-hidden
            rounded-[40px]
            border
            border-red-900
            min-h-[700px]
            flex
            items-end
          "
        >

          {/* IMAGE */}

          <img
            src={post.image}
            alt={post.title}
            className="
              absolute
              inset-0
              w-full
              h-full
              object-cover
              object-center
            "
          />

          {/* OVERLAY */}

          <div
            className="
              absolute
              inset-0
              bg-black/60
            "
          />

          {/* CONTENT */}

          <div
            className="
              relative
              z-10
              p-12
              max-w-4xl
              space-y-6
            "
          >

            <div
              className="
                inline-flex
                bg-red-600
                text-white
                px-5
                py-2
                rounded-full
                text-sm
                font-black
                uppercase
              "
            >
              {post.category}
            </div>

            <h1
              className="
                text-5xl
                md:text-7xl
                font-black
                text-white
                leading-tight
              "
            >
              {post.title}
            </h1>

            <p
              className="
                text-xl
                text-gray-200
                leading-relaxed
              "
            >
              {stripHtml(post.content)
                .slice(0, 220)}...
            </p>

          </div>

        </section>

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
                bg-black/55
                backdrop-blur-sm
                border
                border-red-900
                rounded-3xl
                p-10
                space-y-10
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

              {/* CREDITS */}

              <div
                className="
                  border-t
                  border-red-900/40
                  pt-8
                  flex
                  flex-col
                  gap-4
                "
              >

                {post.created_by && (

                  <div
                    className="
                      flex
                      items-center
                      gap-3
                    "
                  >

                    <div
                      className="
                        w-10
                        h-10
                        rounded-2xl
                        bg-red-600
                        flex
                        items-center
                        justify-center
                        text-white
                        font-black
                      "
                    >
                      ✍️
                    </div>

                    <div>

                      <p className="text-gray-500 text-sm">
                        Criado por
                      </p>

                      <p
                        className="
                          text-white
                          font-bold
                        "
                      >
                        {post.created_by}
                      </p>

                    </div>

                  </div>

                )}

                {post.suggested_by && (

                  <div
                    className="
                      flex
                      items-center
                      gap-3
                    "
                  >

                    <div
                      className="
                        w-10
                        h-10
                        rounded-2xl
                        bg-red-950
                        flex
                        items-center
                        justify-center
                        text-red-400
                        font-black
                      "
                    >
                      💡
                    </div>

                    <div>

                      <p className="text-gray-500 text-sm">
                        Sugerido por
                      </p>

                      <p
                        className="
                          text-red-400
                          font-bold
                        "
                      >
                        {post.suggested_by}
                      </p>

                    </div>

                  </div>

                )}

              </div>

            </div>

            {/* RELATED POSTS */}

            {relatedPosts.length > 0 && (

              <section className="space-y-6">

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
                    py-8
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

                    <h2
                      className="
                        text-4xl
                        font-black
                        text-white
                      "
                    >
                      🔥 Você também pode gostar
                    </h2>

                    <p
                      className="
                        mt-3
                        text-gray-300
                        text-lg
                      "
                    >
                      Conteúdos relacionados
                      para continuar explorando.
                    </p>

                  </div>

                </div>

                <div
                  className="
                    grid
                    grid-cols-1
                    md:grid-cols-2
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
                          stripHtml(
                            relatedPost.content
                          )
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
                bg-black/55
                backdrop-blur-sm
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