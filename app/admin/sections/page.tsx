"use client";

import {
  useEffect,
  useState,
} from "react";

import { supabase }
from "@/lib/supabase/client";

import { MainLayout }
from "@/components/layout/MainLayout";

export default function AdminSectionsPage() {

  const [classes, setClasses] =
    useState<any[]>([]);

  const [classId, setClassId] =
    useState("");

  const [type, setType] =
    useState("");

  const [title, setTitle] =
    useState("");

  const [content, setContent] =
    useState("");

  const [image, setImage] =
    useState("");

  const [videoUrl, setVideoUrl] =
    useState("");

  const [orderIndex, setOrderIndex] =
    useState("0");

  useEffect(() => {

    async function fetchClasses() {

      const { data } =
        await supabase

          .from("classes")

          .select("*")

          .order("name");

      setClasses(data || []);
    }

    fetchClasses();

  }, []);

  async function createSection() {

    const {
      error,
    } = await supabase

      .from("class_sections")

      .insert({

        class_id:
          Number(classId),

        type,

        title,

        content,

        image,

        video_url:
          videoUrl,

        order_index:
          Number(orderIndex),

      });

    if (error) {

      console.log(error);

      alert(
        "Erro ao criar section"
      );

      return;
    }

    alert("Section criada!");

    setType("");
    setTitle("");
    setContent("");
    setImage("");
    setVideoUrl("");
    setOrderIndex("0");
  }

  return (

    <MainLayout>

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
            Criar Section
          </h1>

          <p
            className="
              text-gray-400
              mt-2
            "
          >
            Adicione conteúdo
            para as classes
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

          {/* CLASS */}

          <div className="space-y-2">

            <label className="text-white font-bold">
              Classe
            </label>

            <select
              value={classId}
              onChange={(e) =>
                setClassId(
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
            >

              <option value="">
                Selecione
              </option>

              {classes.map((classe) => (

                <option
                  key={classe.id}
                  value={classe.id}
                >
                  {classe.name}
                </option>

              ))}

            </select>

          </div>

          {/* TYPE */}

          <div className="space-y-2">

            <label className="text-white font-bold">
              Tipo
            </label>

            <input
              value={type}
              onChange={(e) =>
                setType(e.target.value)
              }
              placeholder="
                pve, pvp, combo...
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

          {/* TITLE */}

          <div className="space-y-2">

            <label className="text-white font-bold">
              Título
            </label>

            <input
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
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

          <div className="space-y-2">

            <label className="text-white font-bold">
              Imagem
            </label>

            <input
              value={image}
              onChange={(e) =>
                setImage(e.target.value)
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

          {/* VIDEO */}

          <div className="space-y-2">

            <label className="text-white font-bold">
              Video URL
            </label>

            <input
              value={videoUrl}
              onChange={(e) =>
                setVideoUrl(
                  e.target.value
                )
              }
              placeholder="
                https://www.youtube.com/embed/...
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

          {/* ORDER */}

          <div className="space-y-2">

            <label className="text-white font-bold">
              Ordem
            </label>

            <input
              value={orderIndex}
              onChange={(e) =>
                setOrderIndex(
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

            <textarea
              rows={10}
              value={content}
              onChange={(e) =>
                setContent(
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
            onClick={createSection}
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
            Criar Section
          </button>

        </div>

      </div>

    </MainLayout>
  );
}