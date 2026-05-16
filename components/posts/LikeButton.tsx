"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import { supabase }
from "@/lib/supabase/client";

interface LikeButtonProps {

  postId: number;
}

export function LikeButton({
  postId,
}: LikeButtonProps) {

  const [likes, setLikes] =
    useState(0);

  const [liked, setLiked] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  async function getLikes() {

    const { count } =
      await supabase

        .from("likes")

        .select(
          "*",
          {
            count: "exact",
            head: true,
          }
        )

        .eq(
          "post_id",
          postId
        );

    setLikes(count || 0);

    const {
      data: { user },
    } =
      await supabase.auth.getUser();

    if (!user) return;

    const { data } =
      await supabase

        .from("likes")

        .select("*")

        .eq(
          "post_id",
          postId
        )

        .eq(
          "user_id",
          user.id
        )

        .single();

    setLiked(!!data);
  }

  async function toggleLike() {

    setLoading(true);

    const {
      data: { user },
    } =
      await supabase.auth.getUser();

    if (!user) {

      alert(
        "Faça login para curtir"
      );

      setLoading(false);

      return;
    }

    if (liked) {

      await supabase

        .from("likes")

        .delete()

        .eq(
          "post_id",
          postId
        )

        .eq(
          "user_id",
          user.id
        );

      setLiked(false);

      setLikes(
        (prev) => prev - 1
      );

    } else {

      await supabase

        .from("likes")

        .insert({

          post_id: postId,

          user_id:
            user.id,

        });

      setLiked(true);

      setLikes(
        (prev) => prev + 1
      );
    }

    setLoading(false);
  }

  useEffect(() => {

    getLikes();

  }, []);

  return (

    <motion.button

      whileHover={{
        scale: 1.03,
      }}

      whileTap={{
        scale: 0.96,
      }}

      onClick={toggleLike}

      disabled={loading}

      className={`
        relative
        overflow-hidden

        flex
        items-center
        gap-4

        px-7
        py-5

        rounded-[24px]

        border

        transition-all
        duration-300

        backdrop-blur-md

        ${
          liked

            ? `
              border-red-500
              bg-red-500/15
              shadow-[0_0_30px_rgba(255,0,0,0.25)]
            `

            : `
              border-red-900
              bg-black/65
              hover:border-red-500
              hover:bg-red-500/10
            `
        }

        ${
          loading
            ? "opacity-70"
            : ""
        }
      `}
    >

      {/* GLOW */}

      <div
        className="
          absolute
          inset-0

          bg-gradient-to-r
          from-red-500/5
          to-transparent

          pointer-events-none
        "
      />

      {/* HEART */}

      <motion.div

        animate={
          liked

            ? {
                scale: [
                  1,
                  1.4,
                  1,
                ],
              }

            : {}
        }

        transition={{
          duration: 0.4,
        }}

        className="
          relative
          z-10
        "
      >

        <span
          className={`
            text-3xl

            ${
              liked

                ? "text-red-400"

                : "text-red-500"
            }
          `}
        >
          ♥
        </span>

      </motion.div>

      {/* TEXT */}

      <div
        className="
          relative
          z-10

          flex
          flex-col
          items-start
        "
      >

        <span
          className="
            text-white
            font-black
            text-xl
            leading-none
          "
        >
          {likes}
        </span>

        <span
          className="
            text-gray-400
            text-sm
          "
        >
          curtidas
        </span>

      </div>

      {/* PARTICLE */}

      <AnimatePresence>

        {liked && (

          <motion.div

            initial={{
              opacity: 1,
              scale: 0,
            }}

            animate={{
              opacity: 0,
              scale: 2.2,
            }}

            exit={{
              opacity: 0,
            }}

            transition={{
              duration: 0.8,
            }}

            className="
              absolute
              inset-0

              rounded-full

              bg-red-500/20
            "
          />

        )}

      </AnimatePresence>

    </motion.button>
  );
}