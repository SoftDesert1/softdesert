import { supabase }
from "@/lib/supabase/client";

export const dynamic =
  "force-dynamic";

export default async function SuggestionsPage() {

  const {
    data: suggestions,
  } =
    await supabase

      .from(
        "post_suggestions"
      )

      .select("*")

      .order(
        "created_at",
        {
          ascending: false,
        }
      );

  return (

    <div
      className="
        max-w-7xl
        mx-auto
        space-y-10
      "
    >

      {/* HERO */}

      <div
        className="
          relative
          overflow-hidden

          rounded-[32px]

          border
          border-red-900

          bg-black/55
          backdrop-blur-sm

          px-8
          py-10
        "
      >

        <div
          className="
            absolute
            inset-0

            bg-gradient-to-r
            from-red-950/10
            to-transparent

            pointer-events-none
          "
        />

        <div className="relative z-10">

          <h1
            className="
              text-5xl
              font-black
              text-white
            "
          >
            📬 Sugestões da Comunidade
          </h1>

          <p
            className="
              mt-4
              text-lg
              text-gray-300
            "
          >
            Aprovar ou rejeitar
            posts sugeridos
            pela comunidade.
          </p>

        </div>

      </div>

      {/* LIST */}

      <div className="space-y-6">

        {suggestions?.map(
          (suggestion) => (

            <div
              key={suggestion.id}

              className="
                bg-black/55
                backdrop-blur-sm

                border
                border-red-900

                rounded-3xl

                p-8

                space-y-6
              "
            >

              {/* USER */}

              <div
                className="
                  flex
                  items-center
                  gap-4
                "
              >

                <img
                  src={
                    suggestion.user_avatar
                  }
                  alt={
                    suggestion.user_name
                  }
                  className="
                    w-14
                    h-14
                    rounded-full
                    object-cover
                  "
                />

                <div>

                  <h2
                    className="
                      text-xl
                      font-black
                      text-white
                    "
                  >
                    {
                      suggestion.user_name
                    }
                  </h2>

                  <p className="text-gray-500">

                    {new Date(
                      suggestion.created_at
                    ).toLocaleDateString(
                      "pt-BR"
                    )}

                  </p>

                </div>

              </div>

              {/* CONTENT */}

              <div className="space-y-4">

                <div
                  className="
                    inline-flex

                    bg-red-600

                    px-4
                    py-2

                    rounded-full

                    text-sm
                    font-bold
                    text-white
                  "
                >
                  {suggestion.category}
                </div>

                <h1
                  className="
                    text-4xl
                    font-black
                    text-white
                  "
                >
                  {suggestion.title}
                </h1>

                <p
                  className="
                    text-gray-300
                    text-lg
                    leading-relaxed
                  "
                >
                  {
                    suggestion.description
                  }
                </p>

                {suggestion.source_url && (

                  <a
                    href={
                      suggestion.source_url
                    }
                    target="_blank"
                    className="
                      inline-flex

                      text-red-400

                      hover:text-red-300

                      transition
                    "
                  >
                    Abrir Fonte
                  </a>

                )}

              </div>

              {/* ACTIONS */}

<div
  className="
    flex
    items-center
    gap-4
  "
>

  {/* APROVAR */}

  <form
    action={async () => {

      "use server";

      await fetch(

        "/api/admin/approve-suggestion",

        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({

            suggestionId:
              suggestion.id,

            adminName:
              "SoftDesert Team",

          }),
        }
      );
    }}
  >

    <button
      className="
        bg-green-600

        hover:bg-green-700

        transition

        px-6
        py-3

        rounded-2xl

        text-white
        font-bold
      "
    >
      Aprovar
    </button>

  </form>

  {/* REJEITAR */}

  <form
    action={async () => {

      "use server";

      await fetch(

        "/api/admin/reject-suggestion",

        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({

            suggestionId:
              suggestion.id,

          }),
        }
      );
    }}
  >

    <button
      className="
        bg-red-600

        hover:bg-red-700

        transition

        px-6
        py-3

        rounded-2xl

        text-white
        font-bold
      "
    >
      Rejeitar
    </button>

  </form>

</div>

            </div>

          )
        )}

      </div>

    </div>
  );
}