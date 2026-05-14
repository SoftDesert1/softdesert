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

import { MainLayout }
from "@/components/layout/MainLayout";

import {
  RichEditor,
} from "@/components/editor/RichEditor";

import { ImageUpload }
from "@/components/upload/ImageUpload";

export default function EditSectionPage() {

  const params =
    useParams();

  const router =
    useRouter();

  const id =
    params.id as string;

  const [loading, setLoading] =
    useState(true);

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

    fetchData();

  }, []);

  async function fetchData() {

    const {
      data: classesData,
    } = await supabase

      .from("classes")

      .select("*")

      .order("name");

    setClasses(
      classesData || []
    );

    const {
      data: section,
    } = await supabase

      .from("class_sections")

      .select("*")

      .eq("id", id)

      .single();

    if (section) {

      setClassId(
        String(
          section.class_id
        )
      );

      setType(section.type);

      setTitle(section.title);

      setContent(
        section.content
      );

      setImage(section.image);

      setVideoUrl(
        section.video_url
      );

      setOrderIndex(
        String(
          section.order_index
        )
      );
    }

    setLoading(false);
  }

  async function updateSection() {

    const {
      error,
    } = await supabase

      .from("class_sections")

      .update({

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

      })

      .eq("id", id);

    if (error) {

      alert(
        "Erro ao atualizar"
      );

      return;
    }

    alert(
      "Section atualizada!"
    );

    router.push(
      "/admin/sections"
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
            Editar Section
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

            <RichEditor
  content={content}
  onChange={setContent}
/>

          </div>

          {/* BUTTON */}

          <button
            onClick={updateSection}
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