"use client";
 import {
  motion,
} from "framer-motion";

const backgrounds = {

  0: {
    city: "odyllita",
    overlay:
      "bg-transparent",
  },

  1: {
    city: "heidel",
    overlay:
      "bg-transparent",
  },

  2: {
    city: "velia",
    overlay:
      "bg-transparent",
  },

  3: {
    city: "calpheon",
    overlay:
      "bg-transparent",
  },

  4: {
    city: "kamasylvia",
    overlay:
      "bg-transparent",
  },

  5: {
    city: "valencia",
    overlay:
      "bg-transparent",
  },

  6: {
    city: "drieghan",
    overlay:
      "bg-transparent",
  },
};

export default function DynamicBackground() {

  const day =
    new Date().getDay();

  const current =
    backgrounds[
      day as keyof typeof backgrounds
    ];

  return (

    <div
      className="
        fixed
        inset-0
        -z-10
        overflow-hidden
      "
    >

      <motion.div
        initial={{
          scale: 1,
        }}
        animate={{
          scale: 1.08,
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          repeatType:
            "reverse",
          ease: "linear",
        }}
        className="
          absolute
          inset-0
          bg-cover
          bg-center
        "
        style={{
          backgroundImage:
            `url(/backgrounds/${current.city}.png)`,
        }}
      />

      <div
        className={`
          absolute
          inset-0
          ${current.overlay}
        `}
      />

      <div
        className="
          absolute
          inset-0
          backdrop-blur-[2px]
        "
      />

    </div>
  );
}