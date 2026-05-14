"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
  useRouter,
} from "next/navigation";

import { supabase }
from "@/lib/supabase/client";

import {
  RichEditor,
} from "@/components/editor/RichEditor";

import { MainLayout }
from "@/components/layout/MainLayout";

import { ImageUpload }
from "@/components/upload/ImageUpload";

export default function EditClassPage() {

  const params =
    useParams();

  const router =
    useRouter();

  const id =
    params.id as string;

  const [loading, setLoading] =
    useState(true);

  const [name, setName] =
    useState("");

  const [slug, setSlug] =
    useState("");

  const [image, setImage] =
    useState("");

  const [banner, setBanner] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [role, setRole] =
    useState("");

  const [difficulty, setDifficulty] =
    useState("");

  const [tags, setTags] =
    useState("");

  useEffect(() => {

    fetchClass();

  }, []);

  async function fetchClass() {

    const { data } =
      await supabase

        .from("classes")

        .select("*")

        .eq("id", id)

        .single();

    if (data) {

      setName(data.name);
      setSlug(data.slug);
      setImage(data.image);
      setBanner(data.banner);
      setDescription(
        data.description
      );
      setRole(data.role);
      setDifficulty(
        data.difficulty
      );

      setTags(
        (data.tags || [])
          .join(", ")
      );
    }

    setLoading(false);
  }

  async function updateClass() {

    const {
      error,
    } = await supabase

      .from("classes")

      .update({

        name,
        slug,
        image,
        banner,
        description,
        role,
        difficulty,

        tags:
          tags

            .split(",")

            .map((tag) =>
              tag.trim()
            ),

      })

      .eq("id", id);

    if (error) {

      alert(
        "Erro ao atualizar"
      );

      return;
    }

    alert(
      "Classe atualizada!"
    );

    router.push(
      "/admin/classes"
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
          max-w-5xl
          mx-auto
          space-y-8
        "
      >

        {/* HEADER */}

        <div>

          <h1
            className="
              text-5xl
              font-black
              text-white
            "
          >
            Editar Classe
          </h1>

        </div>

        {/* FORM */}

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

          {/* NAME */}

          <div className="space-y-2">

            <label className="text-white font-bold">
              Nome
            </label>

            <input
              value={name}

              onChange={(e) => {

                const value =
                  e.target.value;

                setName(value);

                setSlug(

                  value

                    .toLowerCase()

                    .replaceAll(" ", "-")

                    .normalize("NFD")

                    .replace(
                      /[\u0300-\u036f]/g,
                      ""
                    )

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
                  h-72
                  object-cover
                  rounded-2xl
                  border
                  border-red-900
                "
              />

            )}

          </div>

          {/* BANNER */}

          <div className="space-y-4">

            <label className="text-white font-bold">
              Banner
            </label>

            <ImageUpload
              onUpload={setBanner}
            />

            {banner && (

              <img
                src={banner}
                alt="preview"
                className="
                  w-full
                  h-72
                  object-cover
                  rounded-2xl
                  border
                  border-red-900
                "
              />

            )}

          </div>

          {/* ROLE */}

          <div className="space-y-2">

            <label className="text-white font-bold">
              Role
            </label>

            <input
              value={role}
              onChange={(e) =>
                setRole(e.target.value)
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

          {/* DIFFICULTY */}

          <div className="space-y-2">

            <label className="text-white font-bold">
              Difficulty
            </label>

            <input
              value={difficulty}
              onChange={(e) =>
                setDifficulty(
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

          {/* TAGS */}

          <div className="space-y-2">

            <label className="text-white font-bold">
              Tags
            </label>

            <input
              value={tags}
              onChange={(e) =>
                setTags(e.target.value)
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

          {/* DESCRIPTION */}

          <div className="space-y-2">

            <label className="text-white font-bold">
              Description
            </label>

            <RichEditor
  content={content}
  onChange={setContent}
/>

          </div>

          {/* BUTTON */}

          <button
            onClick={updateClass}
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