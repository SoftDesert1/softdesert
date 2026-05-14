"use client";

import { useState }
from "react";

import { supabase }
from "@/lib/supabase/client";

import { ImageUpload }
from "@/components/upload/ImageUpload";

import { MainLayout }
from "@/components/layout/MainLayout";

export default function AdminClassesPage() {

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

  async function createClass() {

    const {
      error,
    } = await supabase

      .from("classes")

      .insert({

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

      });

    if (error) {

      console.log(error);

      alert(
        "Erro ao criar classe"
      );

      return;
    }

    alert("Classe criada!");

    setName("");
    setSlug("");
    setImage("");
    setBanner("");
    setDescription("");
    setRole("");
    setDifficulty("");
    setTags("");
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
            Criar Classe
          </h1>

          <p
            className="
              text-gray-400
              mt-2
            "
          >
            Adicione uma nova classe
          </p>

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
              placeholder="
                pve, pvp, grab
              "
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

            <textarea
              rows={8}
              value={description}
              onChange={(e) =>
                setDescription(
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

          {/* BUTTON */}

          <button
            onClick={createClass}
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
            Criar Classe
          </button>

        </div>

      </div>
  );
}