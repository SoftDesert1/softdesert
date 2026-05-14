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

export default function EditLivePage() {

  const router =
    useRouter();

  const params =
    useParams();

  const id =
    params.id;

  const [
    streamerName,
    setStreamerName,
  ] = useState("");

  const [
    platform,
    setPlatform,
  ] = useState("");

  const [
    description,
    setDescription,
  ] = useState("");

  const [
    image,
    setImage,
  ] = useState("");

  const [
    streamUrl,
    setStreamUrl,
  ] = useState("");

  const [
    embedUrl,
    setEmbedUrl,
  ] = useState("");

  const [
    isLive,
    setIsLive,
  ] = useState(true);

  useEffect(() => {

    fetchLive();

  }, []);

  async function fetchLive() {

    const { data } =
      await supabase

        .from("lives")

        .select("*")

        .eq("id", id)

        .single();

    if (!data) return;

    setStreamerName(
      data.streamer_name
    );

    setPlatform(
      data.platform
    );

    setDescription(
      data.description
    );

    setImage(
      data.image
    );

    setStreamUrl(
      data.stream_url
    );

    setEmbedUrl(
      data.embed_url
    );

    setIsLive(
      data.is_live
    );
  }

  async function updateLive() {

    const { error } =
      await supabase

        .from("lives")

        .update({

          streamer_name:
            streamerName,

          platform,

          description,

          image,

          stream_url:
            streamUrl,

          embed_url:
            embedUrl,

          is_live:
            isLive,

        })

        .eq("id", id);

    if (error) {

      alert(error.message);

      return;
    }

    router.push(
      "/admin/lives"
    );
  }

  return (

    <MainLayout>

      <div
        className="
          max-w-3xl
          mx-auto
          space-y-8
        "
      >

        <div className="space-y-2">

          <h1
            className="
              text-5xl
              font-black
              text-white
            "
          >
            Editar Live
          </h1>

          <p className="text-gray-400">

            Atualize os dados
            do streamer

          </p>

        </div>

        <div className="space-y-5">

          <input
            placeholder="
              Nome streamer
            "
            value={streamerName}
            onChange={(e) =>
              setStreamerName(
                e.target.value
              )
            }
            className="
              w-full
              bg-[#111]
              border
              border-red-900
              rounded-2xl
              p-4
              text-white
            "
          />

          <input
            placeholder="
              Plataforma
            "
            value={platform}
            onChange={(e) =>
              setPlatform(
                e.target.value
              )
            }
            className="
              w-full
              bg-[#111]
              border
              border-red-900
              rounded-2xl
              p-4
              text-white
            "
          />

          <input
            placeholder="
              Thumbnail URL
            "
            value={image}
            onChange={(e) =>
              setImage(
                e.target.value
              )
            }
            className="
              w-full
              bg-[#111]
              border
              border-red-900
              rounded-2xl
              p-4
              text-white
            "
          />

          <input
            placeholder="
              Stream URL
            "
            value={streamUrl}
            onChange={(e) =>
              setStreamUrl(
                e.target.value
              )
            }
            className="
              w-full
              bg-[#111]
              border
              border-red-900
              rounded-2xl
              p-4
              text-white
            "
          />

          <input
            placeholder="
              Embed URL
            "
            value={embedUrl}
            onChange={(e) =>
              setEmbedUrl(
                e.target.value
              )
            }
            className="
              w-full
              bg-[#111]
              border
              border-red-900
              rounded-2xl
              p-4
              text-white
            "
          />

          <textarea
            placeholder="
              Descrição
            "
            value={description}
            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }
            rows={5}
            className="
              w-full
              bg-[#111]
              border
              border-red-900
              rounded-2xl
              p-4
              text-white
            "
          />

          <div
            className="
              flex
              items-center
              gap-3
            "
          >

            <input
              type="checkbox"

              checked={isLive}

              onChange={(e) =>
                setIsLive(
                  e.target.checked
                )
              }
            />

            <label className="text-white">

              Live ativa

            </label>

          </div>

          <button
            onClick={updateLive}
            className="
              w-full
              bg-red-600
              hover:bg-red-700
              transition
              p-5
              rounded-2xl
              text-white
              font-black
            "
          >
            Salvar Live
          </button>

        </div>

      </div>

    </MainLayout>
  );
}