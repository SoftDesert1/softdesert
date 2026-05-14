"use client";

import { useState }
from "react";

import { supabase }
from "@/lib/supabase/client";

import { MainLayout }
from "@/components/layout/MainLayout";

import { ImageUpload }
from "@/components/upload/ImageUpload";

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
    useState("");

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

        is_breaking:
          isBreaking,

      });

    if (error) {

      console.log(error);

      alert("Erro ao criar post");

      return;
    }

    alert("Post criado!");

    setTitle("");
    setSlug("");
    setContent("");
    setImage("");
    setCategory("");
  }

  return (

      <div
        className="
          max-w-4xl
          mx-auto
          space-y-8
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
            Criar Post
          </h1>

          <p
            className="
              text-gray-400
              mt-2
            "
          >
            Adicione uma nova notícia
          </p>

        </div>

        <div
          className="
            bg-[#111]
            border
            border-red-900
            rounded-3xl
            p-8
            space-y-6
          "
        >

          {/* TITLE */}

          <div className="space-y-2">

            <label className="text-white font-bold">
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

      .replaceAll(" ", "-")

      .normalize("NFD")

      .replace(/[\u0300-\u036f]/g, "")

  );

}}
              className="
                w-full
                bg-black
                border
                border-red-900
                rounded-xl
                p-4
                text-white
              "
            />

          </div>

          {/* SLUG */}

          <div className="space-y-2">

            <label className="text-white font-bold">
              Slug
            </label>

            <input
              value={slug}
              onChange={(e) =>
                setSlug(e.target.value)
              }
              className="
                w-full
                bg-black
                border
                border-red-900
                rounded-xl
                p-4
                text-white
              "
            />

          </div>

          {/* IMAGE */}

          <div className="space-y-4">

  <label className="text-white font-bold">
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
        h-64
        object-cover
        rounded-2xl
        border
        border-red-900
      "
    />

  )}

</div>

          {/* CATEGORY */}

          <div className="space-y-2">

            <label className="text-white font-bold">
              Categoria
            </label>

            <input
              value={category}
              onChange={(e) =>
                setCategory(e.target.value)
              }
              className="
                w-full
                bg-black
                border
                border-red-900
                rounded-xl
                p-4
                text-white
              "
            />

          </div>

          {/* CONTENT */}

          <div className="space-y-2">

            <label className="text-white font-bold">
              Conteúdo
            </label>

            <textarea
              value={content}
              onChange={(e) =>
                setContent(e.target.value)
              }
              rows={10}
              className="
                w-full
                bg-black
                border
                border-red-900
                rounded-xl
                p-4
                text-white
              "
            />

          </div>

          <div
  className="
    flex
    items-center
    gap-3
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