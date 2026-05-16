"use client";

import {
  useState,
} from "react";

import { supabase }
from "@/lib/supabase/client";

export default function SuggestPostPage() {

  const [title, setTitle] =
    useState("");

  const [
    description,
    setDescription,
  ] = useState("");

  const [sourceUrl, setSourceUrl] =
    useState("");

  const [image, setImage] =
    useState("");

  const [category, setCategory] =
    useState("news");

  const [notes, setNotes] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [success, setSuccess] =
    useState(false);

  async function handleSubmit(
    e: React.FormEvent
  ) {

    e.preventDefault();

    setLoading(true);

    const {
      data: { user },
    } =
      await supabase.auth.getUser();

    if (!user) {

      alert(
        "Faça login para sugerir um post."
      );

      setLoading(false);

      return;
    }

    const metadata =
      user.user_metadata;

    const {
      error,
    } =
      await supabase

        .from(
          "post_suggestions"
        )

        .insert({

          title,

          description,

          source_url:
            sourceUrl,

          image,

          category,

          notes,

          user_id:
            user.id,

          user_name:
            metadata?.full_name ||
            metadata?.name ||
            "Usuário",

          user_avatar:
            metadata?.avatar_url ||
            "",

        });

    setLoading(false);

    if (error) {

      alert(
        "Erro ao enviar sugestão."
      );

      return;
    }

    setSuccess(true);

    setTitle("");

    setDescription("");

    setSourceUrl("");

    setImage("");

    setCategory("news");

    setNotes("");
  }

  return (

    <div
      className="
        max-w-4xl
        mx-auto
        space-y-10
      "
    >

      {/* HERO */}

      <section
        className="
          relative
          overflow-hidden

          rounded-[40px]

          border
          border-red-900

          bg-black/60
          backdrop-blur-xl

          p-10
        "
      >

        <div className="space-y-6">

          <span
            className="
              inline-flex

              bg-red-600

              text-white

              px-5
              py-2

              rounded-full

              text-sm
              font-bold
              uppercase
            "
          >
            Community Posts
          </span>

          <h1
            className="
              text-6xl
              font-black
              text-white
            "
          >
            Sugira um Post
          </h1>

          <p
            className="
              text-xl
              text-gray-300
              leading-relaxed
              max-w-3xl
            "
          >
            Compartilhe notícias,
            guias, conteúdos,
            eventos e novidades
            do universo Black Desert.
          </p>

        </div>

      </section>

      {/* FORM */}

      <form
        onSubmit={handleSubmit}
        className="
          bg-black/60
          backdrop-blur-xl

          border
          border-red-900

          rounded-[40px]

          p-10

          space-y-8
        "
      >

        <div className="space-y-3">

          <label
            className="
              text-white
              font-bold
            "
          >
            Título
          </label>

          <input
            value={title}
            onChange={(e) =>
              setTitle(
                e.target.value
              )
            }
            required
            className="
              w-full

              bg-[#111]

              border
              border-red-900

              rounded-2xl

              px-5
              py-4

              text-white

              outline-none

              focus:border-red-500
            "
          />

        </div>

        <div className="space-y-3">

          <label
            className="
              text-white
              font-bold
            "
          >
            Descrição
          </label>

          <textarea
            value={description}
            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }
            required
            rows={6}
            className="
              w-full

              bg-[#111]

              border
              border-red-900

              rounded-2xl

              px-5
              py-4

              text-white

              outline-none

              focus:border-red-500
            "
          />

        </div>

        <div className="space-y-3">

          <label
            className="
              text-white
              font-bold
            "
          >
            URL da Fonte
          </label>

          <input
            value={sourceUrl}
            onChange={(e) =>
              setSourceUrl(
                e.target.value
              )
            }
            className="
              w-full

              bg-[#111]

              border
              border-red-900

              rounded-2xl

              px-5
              py-4

              text-white

              outline-none

              focus:border-red-500
            "
          />

        </div>

        <div className="space-y-3">

          <label
            className="
              text-white
              font-bold
            "
          >
            URL da Imagem
          </label>

          <input
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

              px-5
              py-4

              text-white

              outline-none

              focus:border-red-500
            "
          />

        </div>

        <div className="space-y-3">

          <label
            className="
              text-white
              font-bold
            "
          >
            Categoria
          </label>

          <select
            value={category}
            onChange={(e) =>
              setCategory(
                e.target.value
              )
            }
            className="
              w-full

              bg-[#111]

              border
              border-red-900

              rounded-2xl

              px-5
              py-4

              text-white

              outline-none
            "
          >

            <option value="news">
              Notícias
            </option>

            <option value="patch-notes">
              Patch Notes
            </option>

            <option value="guide">
              Guia
            </option>

          </select>

        </div>

        <div className="space-y-3">

          <label
            className="
              text-white
              font-bold
            "
          >
            Observações
          </label>

          <textarea
            value={notes}
            onChange={(e) =>
              setNotes(
                e.target.value
              )
            }
            rows={4}
            className="
              w-full

              bg-[#111]

              border
              border-red-900

              rounded-2xl

              px-5
              py-4

              text-white

              outline-none

              focus:border-red-500
            "
          />

        </div>

        <button
          type="submit"
          disabled={loading}
          className="
            bg-red-600

            hover:bg-red-700

            transition

            px-8
            py-4

            rounded-2xl

            text-white
            font-bold
          "
        >

          {loading
            ? "Enviando..."
            : "Enviar Sugestão"}

        </button>

        {success && (

          <div
            className="
              bg-green-500/10

              border
              border-green-500

              rounded-2xl

              p-4

              text-green-400
            "
          >
            Sugestão enviada com sucesso.
          </div>

        )}

      </form>

    </div>
  );
}