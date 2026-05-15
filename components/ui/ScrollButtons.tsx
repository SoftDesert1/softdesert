"use client";
    <div
      className="
        fixed
        right-6
        top-1/2
        -translate-y-1/2
        z-50
        flex
        flex-col
        gap-4
      "
    >

      <button
        onClick={scrollToTop}
        className="
          w-14
          h-14
          rounded-2xl
          bg-[#111]
          border
          border-red-900
          text-red-500
          flex
          items-center
          justify-center
          hover:bg-red-600
          hover:text-white
          hover:border-red-500
          transition
          shadow-[0_0_20px_rgba(255,0,0,0.15)]
        "
      >

        <ChevronUp size={28} />

      </button>

      <button
        onClick={scrollToBottom}
        className="
          w-14
          h-14
          rounded-2xl
          bg-[#111]
          border
          border-red-900
          text-red-500
          flex
          items-center
          justify-center
          hover:bg-red-600
          hover:text-white
          hover:border-red-500
          transition
          shadow-[0_0_20px_rgba(255,0,0,0.15)]
        "
      >

        <ChevronDown size={28} />

      </button>

    </div>
  );
}