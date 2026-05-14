"use client";

import {
  useState,
} from "react";

import { useRouter }
from "next/navigation";

import { supabase }
from "@/lib/supabase/client";

import { MainLayout }
from "@/components/layout/MainLayout";

export default function CreateLivePage() {

  const router =
    useRouter();

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

  async function createLive() {

    const { error } =
      await supabase

        .from("lives")

        .insert({

          streamer_name:
            streamerName,

          platform,

          description,

          image,

          stream_url:
            streamUrl,

          embed_url:
            embedUrl,

          is_live: true,

        });

    if (error) {

  console.error(error);

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
            Nova Live
          </h1>

          <p className="text-gray-400">

            Adicione um streamer
            da comunidade

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
              (Twitch/YouTube)
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

          <button
            onClick={createLive}
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
            Criar Live
          </button>

        </div>

      </div>

    </MainLayout>
  );
}