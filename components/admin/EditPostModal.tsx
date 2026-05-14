"use client";

import { useEffect, useState } from "react";

import {
  RichEditor,
} from "@/components/editor/RichEditor";

interface EditPostModalProps {

  post: any;

  onClose: () => void;

  onSave: (
    id: string,
    title: string,
    content: string
  ) => void;
}

export function EditPostModal({
  post,
  onClose,
  onSave,
}: EditPostModalProps) {

  const [title, setTitle] =
    useState("");

  const [content, setContent] =
    useState("");

  useEffect(() => {

    if (post) {

      setTitle(post.title);

      setContent(post.content);
    }

  }, [post]);

  if (!post) return null;

  return (

    <div
      className="
        fixed
        inset-0
        bg-black/80
        flex
        items-center
        justify-center
        z-50
        p-4
      "
    >

      <div
        className="
          bg-[#111]
          border
          border-red-900
          rounded-2xl
          p-6
          w-full
          max-w-2xl
          space-y-4
        "
      >

        <h2
          className="
            text-3xl
            font-bold
            text-red-500
          "
        >
          Editar Post
        </h2>

        <input
          type="text"
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

        <RichEditor
  content={content}
  onChange={setContent}
/>

        <div className="flex gap-4">

          <button
            onClick={() =>
              onSave(
                post.id,
                title,
                content
              )
            }
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
            Salvar
          </button>

          <button
            onClick={onClose}
            className="
              bg-gray-700
              hover:bg-gray-600
              transition
              px-6
              py-3
              rounded-xl
              text-white
            "
          >
            Cancelar
          </button>

        </div>

      </div>

    </div>
  );
}