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
        overflow-x-hidden
        border-y
        border-red-900
        bg-[#111]
        py-3
      "
    >

      <div
        className="
          inline-flex
          items-center
          gap-16
          whitespace-nowrap
          animate-marquee
          min-w-max
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
                whitespace-nowrap
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

              <span
                className="
                  text-white
                  font-semibold
                "
              >
                {item}
              </span>

            </div>

          )
        )}

      </div>

    </div>
  );
}