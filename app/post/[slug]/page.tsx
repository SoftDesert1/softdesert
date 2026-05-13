import Image from "next/image";

import { MainLayout } from "@/components/layout/MainLayout";

import { getPostBySlug } from "@/lib/posts/getPostBySlug";

import { PostComments } from "@/components/comments/PostComments";

import { LikeButton } from "@/components/posts/LikeButton";

interface PostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function PostPage({
  params,
}: PostPageProps) {

  const { slug } = await params;

  const post = await getPostBySlug(slug);

  if (!post) {

    return (

      <MainLayout>

        <h1 className="text-white text-3xl">
          Post não encontrado
        </h1>

      </MainLayout>

    );
  }

  return (

    <MainLayout>

      <article
        className="
          max-w-4xl
          mx-auto
          space-y-12
        "
      >

        {/* IMAGE */}

        <div
          className="
            relative
            w-full
            h-[500px]
            rounded-3xl
            overflow-hidden
          "
        >

          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
          />

        </div>

        {/* CONTENT */}

        <div className="space-y-6">

          <span
            className="
              text-red-500
              font-bold
              uppercase
            "
          >
            {post.category}
          </span>

          <h1
            className="
              text-5xl
              font-black
              text-white
            "
          >
            {post.title}
          </h1>

          <p
            className="
              text-gray-300
              text-lg
              leading-relaxed
            "
          >
            {post.content}
          </p>

        </div>

        <LikeButton
          postId={post.id}
        />

        {/* COMMENTS */}

        <PostComments
          postId={post.id}
        />

      </article>

    </MainLayout>
  );
}