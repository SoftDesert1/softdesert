import { MainLayout }
from "@/components/layout/MainLayout";

const streamers = [

  {
    id: 1,

    name: "OneTapinha",

    platform: "Kick",

    description:
      "Main Berserker PvP",

    embed:
      "https://player.kick.com/onetapinha?muted=true",

    url:
      "https://kick.com/onetapinha",
  },

  {
    id: 2,

    name: "Streamer 2",

    platform: "YouTube",

    description:
      "Endgame Grind",

    embed:
      "https://www.youtube.com/embed/jfKfPfyJRdk",

    url:
      "https://youtube.com",
  },

  {
    id: 3,

    name: "KhorinGATV",

    platform: "Kick",

    description:
      "Main Guardian AWK",

    embed:
      "https://player.kick.com/khoringatv?muted=true",

    url:
      "https://kick.com/khoringatv",
  },
];

export default function LivesPage() {

  return (

    <MainLayout>

      <div
        className="
          max-w-7xl
          mx-auto
          space-y-12
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
            bg-[#111]
            p-10
          "
        >

          <div className="space-y-6 max-w-3xl">

            <span
              className="
                inline-flex
                bg-red-600
                text-white
                px-4
                py-2
                rounded-full
                text-sm
                font-bold
                uppercase
              "
            >
              Community Lives
            </span>

            <h1
              className="
                text-6xl
                font-black
                text-white
              "
            >
              Lives da Comunidade
            </h1>

            <p
              className="
                text-xl
                text-gray-300
                leading-relaxed
              "
            >
              Divulgando criadores de conteúdo,
              PvP grinders, shotcallers e streamers
              da comunidade Black Desert.
            </p>

          </div>

        </section>

        {/* GRID */}

        <div
          className="
            grid
            grid-cols-1
            xl:grid-cols-2
            gap-8
          "
        >

          {streamers.map((streamer) => (

            <div
              key={streamer.id}
              className="
                bg-[#111]
                border
                border-red-900
                rounded-3xl
                overflow-hidden
              "
            >

              {/* VIDEO */}

              <div className="aspect-video">

                <iframe
                  src={streamer.embed}
                  className="w-full h-full"
                  allowFullScreen
                />

              </div>

              {/* CONTENT */}

              <div className="p-6 space-y-5">

                <div className="space-y-2">

                  <div
                    className="
                      inline-flex
                      bg-red-600
                      text-white
                      px-3
                      py-1
                      rounded-full
                      text-xs
                      font-bold
                    "
                  >
                    {streamer.platform}
                  </div>

                  <h2
                    className="
                      text-3xl
                      font-black
                      text-white
                    "
                  >
                    {streamer.name}
                  </h2>

                  <p className="text-gray-400">
                    {streamer.description}
                  </p>

                </div>

                <a
                  href={streamer.url}
                  target="_blank"
                  className="
                    inline-flex
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
                  Assistir Live
                </a>

              </div>

            </div>

          ))}

        </div>

      </div>

    </MainLayout>
  );
}