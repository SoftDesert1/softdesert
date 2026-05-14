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
            `
            min-h-[400px]
            bg-[#111]
            border
            border-red-900
            rounded-2xl
            p-6
            text-white
            outline-none
            prose
            prose-invert
            max-w-none
          `,
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

    <div className="space-y-4">

      {/* TOOLBAR */}

      <div
        className="
          flex
          flex-wrap
          gap-2
        "
      >

        <button
          type="button"
          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleBold()
              .run()
          }
          className="
            px-4
            py-2
            bg-red-600
            rounded-xl
            text-white
            font-bold
          "
        >
          Bold
        </button>

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
          className="
            px-4
            py-2
            bg-red-600
            rounded-xl
            text-white
            font-bold
          "
        >
          Título
        </button>

        <button
          type="button"
          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleBulletList()
              .run()
          }
          className="
            px-4
            py-2
            bg-red-600
            rounded-xl
            text-white
            font-bold
          "
        >
          Lista
        </button>

      </div>

      <EditorContent
        editor={editor}
      />

    </div>
  );
}