"use client";

import { useState }
from "react";

import { supabase }
from "@/lib/supabase/client";

import { ImageUpload }
from "@/components/upload/ImageUpload";

import {
  RichEditor,
} from "@/components/editor/RichEditor";

export default function AdminPostsPage() {

  const [title, setTitle] =
    useState("");

  const [isBreaking, setIsBreaking] =
    useState(false);

  const [slug, setSlug] =
    useState("");

  const [content, setContent] =
    useState("");

  const [image, setImage] =
    useState("");

  const [category, setCategory] =
    useState("news");

  async function createPost() {

    const {
      error,
    } = await supabase

      .from("posts")

      .insert({

        title,
        slug,
        content,
        image,
        category,

        created_by:
          "SoftDesert Team",

        is_breaking:
          isBreaking,

      });

    if (error) {

      console.log(error);

      alert(
        "Erro ao criar post"
      );

      return;
    }

    alert(
      "Post criado!"
    );

    setTitle("");
    setSlug("");
    setContent("");
    setImage("");
    setCategory("news");
    setIsBreaking(false);
  }

  return (

    <div
      className="
        max-w-4xl
        mx-auto
        space-y-8
      "
    >

      {/* HEADER */}

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
              text-5xl
              font-black
              text-white
            "
          >
            ✍️ Criar Post
          </h1>

          <p
            className="
              text-gray-300
              text-lg
              mt-4
            "
          >
            Adicione uma nova
            notícia ao portal
            SoftDesert.
          </p>

        </div>

      </div>

      {/* FORM */}

      <div
        className="
          bg-black/55
          backdrop-blur-sm

          border
          border-red-900

          rounded-3xl

          p-8

          space-y-8
        "
      >

        {/* TITLE */}

        <div className="space-y-3">

          <label
            className="
              text-white
              font-bold
            "
          >
            Título
          </label>

          <input
            value={title}

            onChange={(e) => {

              const value =
                e.target.value;

              setTitle(value);

              setSlug(

                value

                  .toLowerCase()

                  .normalize("NFD")

                  .replace(
                    /[\u0300-\u036f]/g,
                    ""
                  )

                  .replace(
                    /[^a-z0-9\s-]/g,
                    ""
                  )

                  .replace(
                    /\s+/g,
                    "-"
                  )
              );
            }}

            className="
              w-full

              bg-black/70

              border
              border-red-900

              rounded-2xl

              p-4

              text-white

              outline-none

              focus:border-red-500
            "
          />

        </div>

        {/* SLUG */}

        <div className="space-y-3">

          <label
            className="
              text-white
              font-bold
            "
          >
            Slug
          </label>

          <input
            value={slug}

            onChange={(e) =>
              setSlug(
                e.target.value
              )
            }

            className="
              w-full

              bg-black/70

              border
              border-red-900

              rounded-2xl

              p-4

              text-white

              outline-none

              focus:border-red-500
            "
          />

        </div>

        {/* IMAGE */}

        <div className="space-y-4">

          <label
            className="
              text-white
              font-bold
            "
          >
            Imagem
          </label>

          <ImageUpload
            onUpload={setImage}
          />

          {image && (

            <img
              src={image}
              alt="preview"

              className="
                w-full
                h-72

                object-cover

                rounded-3xl

                border
                border-red-900
              "
            />

          )}

        </div>

        {/* CATEGORY */}

        <div className="space-y-3">

          <label
            className="
              text-white
              font-bold
            "
          >
            Categoria
          </label>

          <select
            value={category}

            onChange={(e) =>
              setCategory(
                e.target.value
              )
            }

            className="
              w-full

              bg-black/70

              border
              border-red-900

              rounded-2xl

              p-4

              text-white

              outline-none

              focus:border-red-500
            "
          >

            <option value="news">
              Notícias
            </option>

            <option value="patch-notes">
              Patch Notes
            </option>

          </select>

        </div>

        {/* CONTENT */}

        <div className="space-y-3">

          <label
            className="
              text-white
              font-bold
            "
          >
            Conteúdo
          </label>

          <RichEditor
            content={content}
            onChange={setContent}
          />

        </div>

        {/* BREAKING */}

        <div
          className="
            flex
            items-center
            gap-4
          "
        >

          <input
            type="checkbox"

            checked={isBreaking}

            onChange={(e) =>
              setIsBreaking(
                e.target.checked
              )
            }

            className="
              w-5
              h-5
            "
          />

          <label
            className="
              text-white
              font-bold
            "
          >
            Breaking News
          </label>

        </div>

        {/* BUTTON */}

        <button

          onClick={createPost}

          className="
            bg-red-600

            hover:bg-red-700

            transition

            px-8
            py-4

            rounded-2xl

            text-white
            font-bold
          "
        >
          Criar Post
        </button>

      </div>

    </div>
  );
}