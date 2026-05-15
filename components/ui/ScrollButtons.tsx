"use client";

import {
  ChevronUp,
  ChevronDown,
} from "lucide-react";

export function ScrollButtons() {

  function scrollToTop() {

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function scrollToBottom() {

    window.scrollTo({
      top:
        document.body
          .scrollHeight,
      behavior: "smooth",
    });
  }

  return (

    <div
      className="
        fixed
        right-4
        md:right-6
        top-1/2
        -translate-y-1/2
        z-50
        flex
        flex-col
        gap-3
      "
    >

      <button
        onClick={scrollToTop}
        aria-label="Ir para o topo"
        className="
          w-12
          h-12
          md:w-14
          md:h-14
          rounded-2xl
          bg-[#111]
          border
          border-red-900
          text-red-500
          flex
          items-center
          justify-center
          shadow-lg
          backdrop-blur-sm
          hover:bg-red-600
          hover:text-white
          hover:border-red-500
          hover:scale-105
          active:scale-95
          transition
          duration-200
        "
      >

        <ChevronUp size={26} />

      </button>

      <button
        onClick={scrollToBottom}
        aria-label="Ir para o final"
        className="
          w-12
          h-12
          md:w-14
          md:h-14
          rounded-2xl
          bg-[#111]
          border
          border-red-900
          text-red-500
          flex
          items-center
          justify-center
          shadow-lg
          backdrop-blur-sm
          hover:bg-red-600
          hover:text-white
          hover:border-red-500
          hover:scale-105
          active:scale-95
          transition
          duration-200
        "
      >

        <ChevronDown size={26} />

      </button>

    </div>
  );
}

export default ScrollButtons;