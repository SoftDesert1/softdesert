"use client";
 import {
  motion,
} from "framer-motion";

const backgrounds = {

  0: {
    city: "odyllita",
    overlay:
      "bg-black/75",
  },

  1: {
    city: "heidel",
    overlay:
      "bg-black/70",
  },

  2: {
    city: "velia",
    overlay:
      "bg-black/65",
  },

  3: {
    city: "calpheon",
    overlay:
      "bg-black/75",
  },

  4: {
    city: "kamasylvia",
    overlay:
      "bg-black/60",
  },

  5: {
    city: "valencia",
    overlay:
      "bg-black/65",
  },

  6: {
    city: "drieghan",
    overlay:
      "bg-black/70",
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