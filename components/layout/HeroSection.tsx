export function HeroSection() {
  return (
    <section
      className="
        relative
        w-full
        h-[500px]
        rounded-3xl
        overflow-hidden
        border
        border-red-900/40
      "
    >

      {/* BACKGROUND */}

      <div
        className="
          absolute
          inset-0
          bg-cover
          bg-center
        "
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1542751371-adc38448a05e')",
        }}
      />

      {/* OVERLAY */}

      <div
        className="
          absolute
          inset-0
          bg-black/70
        "
      />

      {/* GLOW */}

      <div
        className="
          absolute
          inset-0
          bg-gradient-to-r
          from-red-950/60
          to-transparent
        "
      />

      {/* CONTENT */}

      <div
        className="
          relative
          z-10
          h-full
          flex
          flex-col
          justify-center
          px-10
          max-w-3xl
        "
      >

        <span className="text-red-500 font-bold mb-4">
          NOVO PATCH GLOBAL
        </span>

        <h1
          className="
            text-6xl
            font-black
            leading-tight
            text-white
          "
        >
          O NOVO
          <span className="text-red-500">
            {" "}DESPERTAR
          </span>
        </h1>

        <p
          className="
            text-gray-300
            mt-6
            text-lg
            leading-relaxed
          "
        >
          Confira todas as novidades do novo patch
          de Black Desert, eventos globais,
          balanceamentos e conteúdos inéditos.
        </p>

        <div className="mt-8 flex gap-4">

          <button
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
            Ver Patch Notes
          </button>

          <button
            className="
              border
              border-red-700
              hover:bg-red-900/30
              transition
              px-6
              py-3
              rounded-xl
              text-white
            "
          >
            Ver Notícias
          </button>

        </div>

      </div>

    </section>
  );
}