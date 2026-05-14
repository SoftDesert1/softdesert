"use client";

import { supabase }
from "@/lib/supabase/client";

interface CommentListProps {

  comments: any[];

  isAdmin?: boolean;

  onDelete?: () => void;
}

export function CommentList({
  comments,
  isAdmin = false,
  onDelete,
}: CommentListProps) {

  async function deleteComment(
    id: number
  ) {

    const confirmed =
      confirm(
        "Excluir comentário?"
      );

    if (!confirmed) return;

    const { error } =
      await supabase

        .from("comments")

        .delete()

        .eq("id", id);

    if (error) {

      alert(error.message);

      return;
    }

    onDelete?.();
  }

  return (

    <div className="space-y-4">

      <h2
        className="
          text-3xl
          font-bold
          text-red-500
        "
      >
        Comentários
      </h2>

      {comments.length === 0 && (

        <p className="text-gray-400">
          Nenhum comentário ainda.
        </p>

      )}

      {comments.map((comment) => (

        <div
          key={comment.id}
          className="
            bg-[#111]
            border
            border-red-900
            rounded-xl
            p-4
            flex
            gap-4
          "
        >

          <img
            src={comment.avatar}
            alt={comment.username}
            className="
              w-12
              h-12
              rounded-full
              border
              border-red-500
            "
          />

          <div className="flex-1">

            <div
              className="
                flex
                items-center
                justify-between
                gap-4
                mb-2
              "
            >

              <div
                className="
                  flex
                  items-center
                  gap-2
                "
              >

                <h3
                  className="
                    text-white
                    font-bold
                  "
                >
                  {comment.username}
                </h3>

                <span
                  className="
                    text-xs
                    text-gray-500
                  "
                >
                  {new Date(
                    comment.created_at
                  ).toLocaleDateString()}
                </span>

              </div>

              {/* ADMIN DELETE */}

              {isAdmin && (

                <button
                  onClick={() =>
                    deleteComment(
                      comment.id
                    )
                  }
                  className="
                    bg-red-600
                    hover:bg-red-700
                    transition
                    px-3
                    py-1
                    rounded-lg
                    text-xs
                    font-bold
                    text-white
                  "
                >
                  Excluir
                </button>

              )}

            </div>

            <p className="text-gray-300">
              {comment.content}
            </p>

          </div>

        </div>

      ))}

    </div>
  );
}