import Image from "next/image";

import { notFound }
from "next/navigation";

import { supabase }
from "@/lib/supabase/client";

export const dynamic =
  "force-dynamic";

interface ProfilePageProps {

  params: Promise<{
    id: string;
  }>;
}

export default async function ProfilePage({
  params,
}: ProfilePageProps) {

  const { id } =
    await params;

  const {
    data: profile,
  } = await supabase

    .from("profiles")

    .select("*")

    .eq("id", id)

    .single();

  if (!profile) {

    notFound();
  }

  return (

    <div
      className="
        max-w-6xl
        mx-auto
        space-y-10
      "
    >

      {/* BANNER */}

      <div
        className="
          relative
          h-[350px]
          rounded-[40px]
          overflow-hidden
          border
          border-red-900
          bg-[#111]
        "
      >

        {profile.banner && (

          <Image
            src={profile.banner}
            alt={profile.username}
            fill
            className="
              object-cover
            "
          />

        )}

        <div
          className="
            absolute
            inset-0
            bg-black/50
          "
        />

        {/* PROFILE */}

        <div
          className="
            absolute
            bottom-8
            left-8
            flex
            items-end
            gap-6
          "
        >

          <img
  src={
    profile.avatar
  }
  alt={profile.username}
  className="
    w-32
    h-32
    rounded-full
    border-4
    border-red-500
    object-cover
    overflow-hidden
  "
/>

          <div className="space-y-2">

            <div
              className="
                flex
                items-center
                gap-3
              "
            >

              <h1
                className="
                  text-5xl
                  font-black
                  text-white
                "
              >
                {profile.username}
              </h1>

              {profile.is_admin && (

                <span
                  className="
                    bg-red-600
                    px-4
                    py-2
                    rounded-full
                    text-sm
                    font-bold
                    text-white
                  "
                >
                  ADMIN
                </span>

              )}

            </div>

            <div
              className="
                flex
                items-center
                gap-4
                text-gray-300
              "
            >

              {profile.main_class && (

                <span>
                  ⚔ {profile.main_class}
                </span>

              )}

              {profile.guild && (

                <span>
                  👑 {profile.guild}
                </span>

              )}

            </div>

          </div>

        </div>

      </div>

      {/* BIO */}

      <div
        className="
          bg-[#111]
          border
          border-red-900
          rounded-3xl
          p-8
          space-y-5
        "
      >

        <h2
          className="
            text-3xl
            font-black
            text-red-500
          "
        >
          Sobre
        </h2>

        <p
          className="
            text-gray-300
            leading-relaxed
            text-lg
          "
        >
          {profile.bio ||
            "Nenhuma bio definida."}
        </p>

      </div>

      {/* SOCIALS */}

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          gap-6
        "
      >

        {profile.twitch && (

          <a
            href={profile.twitch}
            target="_blank"
            className="
              bg-[#111]
              border
              border-purple-700
              rounded-3xl
              p-6
              text-white
              font-bold
              hover:border-purple-500
              transition
            "
          >
            Twitch
          </a>

        )}

        {profile.youtube && (

          <a
            href={profile.youtube}
            target="_blank"
            className="
              bg-[#111]
              border
              border-red-700
              rounded-3xl
              p-6
              text-white
              font-bold
              hover:border-red-500
              transition
            "
          >
            YouTube
          </a>

        )}

      </div>

    </div>
  );
}