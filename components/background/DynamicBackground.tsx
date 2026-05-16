"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

import {
  useEffect,
} from "react";

const backgrounds = {

  0: {
    city: "odyllita",
    overlay:
      "bg-black/10",
  },

  1: {
    city: "heidel",
    overlay:
      "bg-black/10",
  },

  2: {
    city: "velia",
    overlay:
      "bg-black/10",
  },

  3: {
    city: "calpheon",
    overlay:
      "bg-black/10",
  },

  4: {
    city: "kamasylvia",
    overlay:
      "bg-black/10",
  },

  5: {
    city: "valencia",
    overlay:
      "bg-black/10",
  },

  6: {
    city: "drieghan",
    overlay:
      "bg-black/10",
  },
};

export default function DynamicBackground() {

  const day =
    new Date().getDay();

  const current =
    backgrounds[
      day as keyof typeof backgrounds
    ];

  const mouseX =
    useMotionValue(0);

  const mouseY =
    useMotionValue(0);

  useEffect(() => {

    function handleMouseMove(
      e: MouseEvent
    ) {

      const x =
        (
          e.clientX /
          window.innerWidth -
          0.5
        ) * 40;

      const y =
        (
          e.clientY /
          window.innerHeight -
          0.5
        ) * 40;

      mouseX.set(x);

      mouseY.set(y);
    }

    window.addEventListener(
      "mousemove",
      handleMouseMove
    );

    return () => {

      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );
    };

  }, [mouseX, mouseY]);

  const smoothX =
    useSpring(mouseX, {

      stiffness: 35,

      damping: 18,

    });

  const smoothY =
    useSpring(mouseY, {

      stiffness: 35,

      damping: 18,

    });

  const translateX =
    useTransform(
      smoothX,
      [-40, 40],
      [-35, 35]
    );

  const translateY =
    useTransform(
      smoothY,
      [-40, 40],
      [-35, 35]
    );

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
          scale: 1.08,
        }}

        animate={{
          scale: 1.14,
        }}

        transition={{

          duration: 35,

          repeat: Infinity,

          repeatType:
            "reverse",

          ease: "linear",
        }}

        style={{

          x: translateX,

          y: translateY,

          backgroundImage:
            `url('/backgrounds/${current.city}.png')`,

          backgroundSize:
            "cover",

          backgroundPosition:
            "center",

          backgroundRepeat:
            "no-repeat",

        }}

        className="
          absolute
          -inset-16
          will-change-transform
        "
      />

      <div
        className={`
          absolute
          inset-0
          ${current.overlay}
        `}
      />

    </div>
  );
}