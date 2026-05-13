"use client";

import Image from "next/image";

import Link from "next/link";

import { motion } from "framer-motion";

interface NewsCardProps {

  title: string;

  description: string;

  image: string;

  slug: string;
}

export function NewsCard({
  title,
  description,
  image,
  slug,
}: NewsCardProps) {

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
        bg-[#111]
        border
        border-red-900/40
        rounded-3xl
        overflow-hidden
        transition-all
        duration-500
        hover:border-red-500
        hover:shadow-[0_0_35px_rgba(255,0,0,0.25)]
      "
    >

      {/* GLOW */}

      <div
        className="
          absolute
          inset-0
          opacity-0
          group-hover:opacity-100
          transition
          duration-500
          bg-gradient-to-t
          from-red-900/10
          to-transparent
          pointer-events-none
          z-10
        "
      />

      {/* IMAGE */}

      <div
        className="
          relative
          w-full
          aspect-video
          overflow-hidden
        "
      >

        {image && (

  <Image
    src={image}
    alt={title}
    fill
    className="
      object-cover
      group-hover:scale-105
      transition
      duration-500
    "
  />

)}

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-black/70
            to-transparent
          "
        />

      </div>

      {/* CONTENT */}

      <div
        className="
          relative
          z-20
          p-6
          space-y-5
        "
      >

        <h2
          className="
            text-2xl
            font-black
            text-white
            leading-tight
            transition
            duration-300
            group-hover:text-red-500
          "
        >
          {title}
        </h2>

        <p
          className="
            text-gray-400
            line-clamp-3
            leading-relaxed
          "
        >
          {description}
        </p>

        <Link
          href={`/post/${slug}`}
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
          Ler mais

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