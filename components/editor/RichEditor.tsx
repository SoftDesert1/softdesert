"use client";

import {
  EditorContent,
  useEditor,
} from "@tiptap/react";

import StarterKit
from "@tiptap/starter-kit";

interface RichEditorProps {

  content: string;

  onChange: (
    value: string
  ) => void;
}

export function RichEditor({
  content,
  onChange,
}: RichEditorProps) {

  const editor =
    useEditor({

      extensions: [
        StarterKit,
      ],

      content,

      editorProps: {

        attributes: {

          class:
            "min-h-[500px] bg-[#0a0a0a] border border-red-900 rounded-[28px] p-8 text-white outline-none prose prose-invert max-w-none text-lg leading-relaxed focus:border-red-500 transition",
        },
      },

      onUpdate({
        editor,
      }) {

        onChange(
          editor.getHTML()
        );
      },
    });

  if (!editor)
    return null;

  return (

    <div className="space-y-5">

      {/* TOOLBAR */}

      <div
        className="
          flex
          flex-wrap
          gap-3
          p-4
          bg-[#111]
          border
          border-red-900
          rounded-2xl
        "
      >

        {/* BOLD */}

        <button
          type="button"
          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleBold()
              .run()
          }
          className={`
            px-4
            py-2
            rounded-xl
            font-bold
            transition

            ${editor.isActive("bold")

              ? "bg-red-600 text-white shadow-[0_0_20px_rgba(239,68,68,0.6)]"

              : "bg-black border border-red-900 text-gray-300 hover:bg-red-950"
            }
          `}
        >
          B
        </button>

        {/* HEADING */}

        <button
          type="button"
          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleHeading({
                level: 2,
              })
              .run()
          }
          className={`
            px-4
            py-2
            rounded-xl
            font-bold
            transition

            ${editor.isActive("heading")

              ? "bg-red-600 text-white shadow-[0_0_20px_rgba(239,68,68,0.6)]"

              : "bg-black border border-red-900 text-gray-300 hover:bg-red-950"
            }
          `}
        >
          H2
        </button>

        {/* LIST */}

        <button
          type="button"
          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleBulletList()
              .run()
          }
          className={`
            px-4
            py-2
            rounded-xl
            font-bold
            transition

            ${editor.isActive("bulletList")

              ? "bg-red-600 text-white shadow-[0_0_20px_rgba(239,68,68,0.6)]"

              : "bg-black border border-red-900 text-gray-300 hover:bg-red-950"
            }
          `}
        >
          • Lista
        </button>

      </div>

      {/* EDITOR */}

      <div
        className="
          overflow-hidden
          rounded-[28px]
          shadow-[0_0_40px_rgba(239,68,68,0.08)]
        "
      >

        <EditorContent
          editor={editor}
        />

      </div>

    </div>
  );
}