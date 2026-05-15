"use client";

import {
  ChevronUp,
  ChevronDown,
} from "lucide-react";

export default function ScrollButtons() {

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
        "
      >

        <ChevronDown size={28} />

      </button>

    </div>
  );
}