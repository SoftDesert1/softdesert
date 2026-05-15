"use client";

import {
  motion,
} from "framer-motion";

export default function BackgroundParticles() {

  return (

    <div
      className="
        fixed
        inset-0
        -z-10
        overflow-hidden
        pointer-events-none
      "
    >

      {Array.from({
        length: 30,
      }).map((_, i) => (

        <motion.div
          key={i}
          initial={{
            y: "110vh",
            opacity: 0,
          }}
          animate={{
            y: "-10vh",
            opacity: [
              0,
              0.4,
              0,
            ],
          }}
          transition={{
            duration:
              15 +
              Math.random() * 20,
            repeat: Infinity,
            delay:
              Math.random() * 10,
            ease: "linear",
          }}
          className="
            absolute
            w-2
            h-2
            rounded-full
            bg-red-500/30
            blur-sm
          "
          style={{
            left:
              `${Math.random() * 100}%`,
          }}
        />

      ))}

    </div>
  );
}