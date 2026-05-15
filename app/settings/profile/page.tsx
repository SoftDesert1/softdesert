"use client";

import {
  useEffect,
  useState,
} from "react";

import { supabase }
from "@/lib/supabase/client";

export default function SettingsProfilePage() {

  const [loading, setLoading] =
    useState(true);

  const [userId, setUserId] =
    useState("");

  const [username, setUsername] =
    useState("");

  const [avatar, setAvatar] =
    useState("");

  const [banner, setBanner] =
    useState("");

  const [bio, setBio] =
    useState("");

  const [mainClass, setMainClass] =
    useState("");

  const [guild, setGuild] =
    useState("");

  const [twitch, setTwitch] =
    useState("");

  const [youtube, setYoutube] =
    useState("");

  useEffect(() => {

    fetchProfile();

  }, []);

  async function fetchProfile() {

    const {
      data: { user },
    } = await supabase.auth
      .getUser();

    if (!user) return;

    console.log(
  user.user_metadata
);

    setUserId(user.id);

    const { data } =
      await supabase

        .from("profiles")

        .select("*")

        .eq("id", user.id)

        .single();

    if (!data) return;

    setUsername(
      data.username || ""
    );

    setAvatar(

  data.avatar ||

  user.user_metadata
    .avatar_url ||

  user.user_metadata
    .picture ||

  ""

);

    setBanner(
      data.banner || ""
    );

    setBio(
      data.bio || ""
    );

    setMainClass(
      data.main_class || ""
    );

    setGuild(
      data.guild || ""
    );

    setTwitch(
      data.twitch || ""
    );

    setYoutube(
      data.youtube || ""
    );

    setLoading(false);
  }

  async function saveProfile() {

    const { error } =
      await supabase

        .from("profiles")

        .update({

          username,

          banner,

          bio,

          main_class:
            mainClass,

          guild,

          twitch,

          youtube,

        })

        .eq("id", userId);

    if (error) {

      alert(error.message);

      return;
    }

    alert(
      "Perfil atualizado!"
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

      <div className="space-y-2">

        <h1
          className="
            text-5xl
            font-black
            text-white
          "
        >
          Editar Perfil
        </h1>

        <p className="text-gray-400">

          Personalize seu perfil
          da comunidade

        </p>

      </div>

      <div className="space-y-5">

        <input
          placeholder="Username"
          value={username}
          onChange={(e) =>
            setUsername(
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
          placeholder="Banner URL"
          value={banner}
          onChange={(e) =>
            setBanner(
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
          placeholder="Classe Main"
          value={mainClass}
          onChange={(e) =>
            setMainClass(
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
          placeholder="Guild"
          value={guild}
          onChange={(e) =>
            setGuild(
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
          placeholder="Twitch URL"
          value={twitch}
          onChange={(e) =>
            setTwitch(
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
          placeholder="YouTube URL"
          value={youtube}
          onChange={(e) =>
            setYoutube(
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
          placeholder="Bio"
          value={bio}
          onChange={(e) =>
            setBio(
              e.target.value
            )
          }
          rows={6}
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
          onClick={saveProfile}
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
          Salvar Perfil
        </button>

      </div>

    </div>
  );
}