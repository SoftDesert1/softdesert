"use client";

import { useState } from "react";

import { supabase } from "@/lib/supabase/client";

interface CommentFormProps {

  postId: string;

  onCommentAdded: () => void;
}

export function CommentForm({
  postId,
  onCommentAdded,
}: CommentFormProps) {

  const [content, setContent] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function createComment() {

    if (!content) return;

    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {

      alert(
        "Faça login para comentar"
      );

      setLoading(false);

      return;
    }

    const { error } = await supabase
      .from("comments")
      .insert({
        content,
        post_id: postId,
        user_id: user.id,
        username:
          user.user_metadata.full_name,
        avatar:
          user.user_metadata.avatar_url,
      });

    if (error) {

      console.error(error);

      alert(
        "Erro ao comentar"
      );

      setLoading(false);

      return;
    }

    setContent("");

    onCommentAdded();

    setLoading(false);
  }

  return (

    <div className="space-y-4">

      <textarea
        placeholder="Escreva um comentário..."
        value={content}
        onChange={(e) =>
          setContent(e.target.value)
        }
        className="
          w-full
          h-32
          bg-[#111]
          border
          border-red-900
          rounded-xl
          p-4
          text-white
        "
      />

      <button
        onClick={createComment}
        disabled={loading}
        className="
          bg-red-600
          hover:bg-red-700
          transition
          px-6
          py-3
          rounded-xl
          text-white
          font-semibold
        "
      >
        {loading
          ? "Enviando..."
          : "Comentar"}
      </button>

    </div>
  );
}