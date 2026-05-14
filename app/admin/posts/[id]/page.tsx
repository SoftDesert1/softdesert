"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  RichEditor,
} from "@/components/editor/RichEditor";

import {
  useParams,
  useRouter,
} from "next/navigation";

import { supabase }
from "@/lib/supabase/client";

import { MainLayout }
from "@/components/layout/MainLayout";

import { ImageUpload }
from "@/components/upload/ImageUpload";

export default function EditPostPage() {

  const params =
    useParams();

  const router =
    useRouter();

  const id =
    params.id as string;

  const [loading, setLoading] =
    useState(true);

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

  useEffect(() => {

    fetchPost();

  }, []);

  async function fetchPost() {

    const { data } =
      await supabase

        .from("posts")

        .select("*")

        .eq("id", id)

        .single();

    if (data) {

      setTitle(data.title);
      setSlug(data.slug);
      setContent(data.content);
      setImage(data.image);
      setCategory(data.category);
      setIsBreaking(
        data.is_breaking
      );
    }

    setLoading(false);
  }

  async function updatePost() {

    const {
      error,
    } = await supabase

      .from("posts")

      .update({

        title,
        slug,
        content,
        image,
        category,
        is_breaking:
          isBreaking,

      })

      .eq("id", id);

    if (error) {

      alert(
        "Erro ao atualizar"
      );

      return;
    }

    alert(
      "Post atualizado!"
    );

    router.push(
      "/admin/posts"
    );
  }

  if (loading) {

    return (

        <div className="text-white">
          Carregando...
        </div>

    );
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
            Editar Post
          </h1>

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

    .normalize("NFD")

    .replace(/[\u0300-\u036f]/g, "")

    .replace(/[^a-z0-9\s-]/g, "")

    .replace(/\s+/g, "-")

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
                setCategory(
                  e.target.value
                )
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
            onClick={updatePost}
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
            Salvar Alterações
          </button>

        </div>

      </div>

  );
}