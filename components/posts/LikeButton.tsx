"use client";

import {
  useEffect,
  useState,
} from "react";

import { supabase } from "@/lib/supabase/client";

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

    const { count } = await supabase
      .from("likes")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("post_id", postId);

    setLikes(count || 0);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data } = await supabase
      .from("likes")
      .select("*")
      .eq("post_id", postId)
      .eq("user_id", user.id)
      .single();

    setLiked(!!data);
  }

  async function toggleLike() {

    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

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
        .eq("post_id", postId)
        .eq("user_id", user.id);

      setLiked(false);

      setLikes((prev) => prev - 1);

    } else {

      await supabase
        .from("likes")
        .insert({
          post_id: postId,
          user_id: user.id,
        });

      setLiked(true);

      setLikes((prev) => prev + 1);
    }

    setLoading(false);
  }

  useEffect(() => {

    getLikes();

  }, []);

  return (

    <button
      onClick={toggleLike}
      disabled={loading}
      className="
        flex
        items-center
        gap-3
        bg-[#111]
        border
        border-red-900
        rounded-xl
        px-6
        py-3
        text-white
        hover:border-red-500
        transition
      "
    >

      <span
        className={`
          text-2xl
          transition
          ${
            liked
              ? "text-red-500"
              : "text-white"
          }
        `}
      >
        ♥
      </span>

      <span className="font-semibold">

        {likes} curtidas

      </span>

    </button>
  );
}