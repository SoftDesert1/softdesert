"use client";

import Image from "next/image";

import Link from "next/link";

import {
  stripHtml,
} from "@/lib/posts/stripHtml";

import {
  useEffect,
  useState,
} from "react";

interface HeroSectionProps {

  posts: any[];
}

export function HeroSection({
  posts,
}: HeroSectionProps) {

  const [current,
    setCurrent] =
      useState(0);

  useEffect(() => {

    if (!posts?.length) return;

    const interval =
      setInterval(() => {

        setCurrent((prev) =>
          prev === posts.length - 1
            ? 0
            : prev + 1
        );

      }, 6000);

    return () =>
      clearInterval(interval);

  }, [posts]);

  if (!posts?.length)
    return null;

  const post =
    posts[current];

  return (

    <section
      className="
        relative
        w-full
        h-[780px]
        rounded-[40px]
        overflow-hidden
        border
        border-red-900
        bg-[#111]
      "
    >

      {/* IMAGE */}

      {post.image && (

        <Image
          src={post.image}
          alt={post.title}
          fill
          priority
          className="
            object-cover
            scale-105
            animate-[slowZoom_12s_linear_infinite]
          "
        />

      )}

      {/* OVERLAY */}

      <div
        className="
          absolute
          inset-0
          bg-gradient-to-r
          from-black
          via-black/50
          to-black/20
        "
      />

      <div
        className="
          absolute
          inset-0
          bg-gradient-to-t
          from-black
          via-transparent
          to-transparent
        "
      />

      {/* CONTENT */}

      <div
        className="
          absolute
          bottom-0
          left-0
          w-full
          p-12
          flex
          items-end
          justify-between
          gap-10
        "
      >

        {/* LEFT */}

        <div
          className="
            max-w-4xl
            space-y-8
          "
        >

          <div
            className="
              flex
              items-center
              gap-4
            "
          >

            <span
              className="
                inline-flex
                bg-red-600
                px-5
                py-2
                rounded-full
                text-sm
                font-black
                uppercase
                tracking-wider
                text-white
              "
            >
              Destaque
            </span>

            <div
              className="
                h-[2px]
                w-24
                bg-red-600
              "
            />

          </div>

          <h1
            className="
              text-7xl
              font-black
              text-white
              leading-none
              tracking-tight
              drop-shadow-2xl
            "
          >
            {post.title}
          </h1>

          <p
            className="
              text-2xl
              text-gray-300
              leading-relaxed
              max-w-3xl
            "
          >
            {stripHtml(post.content)}
          </p>

          <div
            className="
              flex
              items-center
              gap-5
            "
          >

            <Link
              href={`/post/${post.slug}`}
              className="
                inline-flex
                items-center
                bg-red-600
                hover:bg-red-700
                transition
                px-10
                py-5
                rounded-2xl
                text-white
                font-black
                text-lg
                shadow-2xl
                shadow-red-900/40
              "
            >
              Ler Agora
            </Link>

            <div
              className="
                hidden
                md:flex
                items-center
                gap-3
              "
            >

              {posts.map(
                (_,
                index) => (

                  <button
                    key={index}
                    onClick={() =>
                      setCurrent(index)
                    }
                    className={`
                      h-3
                      rounded-full
                      transition-all

                      ${current === index
                        ? "w-12 bg-red-500"
                        : "w-3 bg-white/40"
                      }
                    `}
                  />

                )
              )}

            </div>

          </div>

        </div>

        {/* RIGHT */}

        <div
          className="
            hidden
            xl:flex
            flex-col
            gap-4
            w-[320px]
          "
        >

          {posts
            .slice(0, 3)
            .map((item, index) => (

              <button
                key={item.id}
                onClick={() =>
                  setCurrent(index)
                }
                className={`
                  relative
                  overflow-hidden
                  rounded-2xl
                  border
                  transition
                  text-left
                  p-5
                  backdrop-blur-md

                  ${current === index
                    ? "border-red-500 bg-black/60"
                    : "border-white/10 bg-black/30 hover:border-red-800"
                  }
                `}
              >

                <div className="space-y-3">

                  <span
                    className="
                      text-xs
                      uppercase
                      tracking-widest
                      text-red-400
                      font-bold
                    "
                  >
                    Destaque
                  </span>

                  <h3
                    className="
                      text-white
                      font-black
                      text-lg
                      leading-snug
                    "
                  >
                    {item.title}
                  </h3>

                </div>

              </button>

            ))}

        </div>

      </div>

    </section>
  );
}