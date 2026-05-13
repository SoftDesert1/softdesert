"use client";

import Image from "next/image";

import Link from "next/link";

import { motion } from "framer-motion";

interface ClassCardProps {

  name: string;

  slug: string;

  image: string;

  role: string;

  difficulty: string;

  tags: string[];
}

export function ClassCard({
  name,
  slug,
  image,
  role,
  difficulty,
  tags,
}: ClassCardProps) {

  return (

    <motion.div

      whileHover={{
        y: -8,
      }}

      transition={{
        duration: 0.25,
      }}

      className="
        group
        relative
        rounded-3xl
        overflow-hidden
        border
        border-red-900/40
        bg-[#111]
        hover:border-red-500
        hover:shadow-[0_0_35px_rgba(255,0,0,0.2)]
        transition-all
        duration-500
      "
    >

      {/* IMAGE */}

      <div
        className="
          relative
          w-full
          aspect-[4/5]
          overflow-hidden
        "
      >

        <Image
          src={image}
          alt={name}
          fill
          className="
            object-cover
            object-top
            transition-transform
            duration-700
            group-hover:scale-105
          "
        />

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-black
            via-black/40
            to-transparent
          "
        />

      </div>

      {/* CONTENT */}

      <div
        className="
          absolute
          inset-x-0
          bottom-0
          p-6
          z-20
          space-y-4
        "
      >

        <div className="space-y-2">

          <h2
            className="
              text-3xl
              font-black
              text-white
            "
          >
            {name}
          </h2>

          <div
            className="
              flex
              items-center
              gap-3
              flex-wrap
            "
          >

            <span
              className="
                bg-red-600
                px-3
                py-1
                rounded-full
                text-xs
                font-bold
                uppercase
                text-white
              "
            >
              {role}
            </span>

            <span
              className="
                bg-[#222]
                px-3
                py-1
                rounded-full
                text-xs
                font-bold
                uppercase
                text-gray-300
              "
            >
              {difficulty}
            </span>

          </div>

        </div>

        {/* TAGS */}

        <div
          className="
            flex
            flex-wrap
            gap-2
          "
        >

          {tags.map((tag) => (

            <span
              key={tag}
              className="
                text-xs
                text-gray-400
                border
                border-red-900/30
                px-2
                py-1
                rounded-full
              "
            >
              #{tag}
            </span>

          ))}

        </div>

        <Link
          href={`/classes/${slug}`}
          className="
            inline-flex
            items-center
            gap-2
            bg-red-600
            hover:bg-red-700
            transition
            px-5
            py-3
            rounded-xl
            text-white
            font-bold
          "
        >
          Ver Classe

          <span
            className="
              transition
              group-hover:translate-x-1
            "
          >
            →
          </span>

        </Link>

      </div>

    </motion.div>
  );
}