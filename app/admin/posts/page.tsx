"use client";

import Link from "next/link";

import {
  useEffect,
  useState,
} from "react";

import { supabase }
from "@/lib/supabase/client";

import { MainLayout }
from "@/components/layout/MainLayout";

export default function AdminPostsPage() {

  const [posts, setPosts] =
    useState<any[]>([]);

  useEffect(() => {

    fetchPosts();

  }, []);

  async function fetchPosts() {

    const { data } =
      await supabase

        .from("posts")

        .select("*")

        .order(
          "created_at",
          {
            ascending: false,
          }
        );

    setPosts(data || []);
  }

  async function deletePost(
    id: number
  ) {

    const confirmed =
      confirm(
        "Excluir post?"
      );

    if (!confirmed) return;

    await supabase

      .from("posts")

      .delete()

      .eq("id", id);

    fetchPosts();
  }

  return (

      <div
        className="
          max-w-7xl
          mx-auto
          space-y-10
        "
      >

        {/* HEADER */}

        <div
          className="
            flex
            items-center
            justify-between
            gap-6
          "
        >

          <div>

            <h1
              className="
                text-5xl
                font-black
                text-white
              "
            >
              Gerenciar Posts
            </h1>

            <p
              className="
                text-gray-400
                mt-2
              "
            >
              Edite e organize
              o conteúdo do portal
            </p>

          </div>

          <Link
            href="/admin/posts/create"
            className="
              bg-red-600
              hover:bg-red-700
              transition
              px-6
              py-4
              rounded-2xl
              text-white
              font-bold
            "
          >
            + Novo Post
          </Link>

        </div>

        {/* POSTS */}

        <div className="space-y-5">

          {posts.map((post) => (

            <div
              key={post.id}
              className="
                bg-[#111]
                border
                border-red-900
                rounded-3xl
                p-6
                flex
                items-center
                justify-between
                gap-6
              "
            >

              <div className="space-y-2">

                <h2
                  className="
                    text-2xl
                    font-bold
                    text-white
                  "
                >
                  {post.title}
                </h2>

                <p
                  className="
                    text-gray-400
                  "
                >
                  {post.category}
                </p>

              </div>

              <div className="flex gap-3">

                <Link
                  href={`/admin/posts/${post.id}`}
                  className="
                    bg-yellow-600
                    hover:bg-yellow-700
                    transition
                    px-5
                    py-3
                    rounded-xl
                    text-white
                    font-bold
                  "
                >
                  Editar
                </Link>

                <button
                  onClick={() =>
                    deletePost(post.id)
                  }
                  className="
                    bg-red-600
                    hover:bg-red-700
                    transition
                    px-5
                    py-3
                    rounded-xl
                    text-white
                    font-bold
                  "
                >
                  Excluir
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

  );
}