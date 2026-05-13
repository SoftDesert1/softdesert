"use client";

const news = [

  "Nova classe anunciada no Black Desert KR",

  "Evento temporada começa esta semana",

  "Patch Notes global liberado",

  "Nova região pode chegar em breve",

  "World Boss receberá mudanças",

  "Sistema PvP terá balanceamento",
];

export function BreakingNews() {

  return (

    <div
      className="
        w-full
        overflow-hidden
        border-y
        border-red-900
        bg-[#111]
        py-3
      "
    >

      <div
        className="
          flex
          whitespace-nowrap
          animate-marquee
          gap-16
        "
      >

        {[...news, ...news].map(
          (item, index) => (

            <div
              key={index}
              className="
                flex
                items-center
                gap-4
                text-white
                font-semibold
              "
            >

              <span
                className="
                  text-red-500
                  font-black
                "
              >
                BREAKING
              </span>

              <span>
                {item}
              </span>

            </div>

          )
        )}

      </div>

    </div>
  );
}