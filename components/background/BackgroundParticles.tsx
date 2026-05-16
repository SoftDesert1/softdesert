"use client";

import {
  motion,
} from "framer-motion";

import {
  useEffect,
  useState,
} from "react";

type Particle = {

  id: number;

  left: number;

  duration: number;

  delay: number;

  size: number;
};

export default function BackgroundParticles() {

  const [particles, setParticles] =
    useState<Particle[]>([]);

  useEffect(() => {

    const generatedParticles =
      [...Array(20)].map((_, i) => ({

        id: i,

        left:
          Math.random() * 100,

        duration:
          20 +
          Math.random() * 15,

        delay:
          Math.random() * 10,

        size:
          2 +
          Math.random() * 3,
      }));

    setParticles(
      generatedParticles
    );

  }, []);

  return (

    <div
      className="
        fixed
        inset-0
        pointer-events-none
        overflow-hidden
        z-0
      "
    >

      {particles.map(
        (particle) => (

          <motion.div
            key={particle.id}

            initial={{
              y: "110vh",
              opacity: 0,
            }}

            animate={{
              y: "-10vh",

              opacity: [
                0,
                0.3,
                0,
              ],
            }}

            transition={{
              duration:
                particle.duration,

              repeat: Infinity,

              ease: "linear",

              delay:
                particle.delay,
            }}

            className="
              absolute
              rounded-full
              bg-red-500/30
              blur-sm
            "

            style={{
              left:
                `${particle.left}%`,

              width:
                `${particle.size}px`,

              height:
                `${particle.size}px`,
            }}
          />

        )
      )}

    </div>
  );
}