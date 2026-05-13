"use client";

import Image from "next/image";

import Link from "next/link";

interface SearchDropdownProps {

  posts: any[];

  onClose: () => void;
}

export function SearchDropdown({
  posts,
  onClose,
}: SearchDropdownProps) {

  if (!posts.length) return null;

  return (

    <div
      className="
        absolute
        top-16
        left-0
        w-full
        bg-[#111]
        border
        border-red-900
        rounded-2xl
        overflow-hidden
        shadow-[0_0_35px_rgba(255,0,0,0.15)]
        z-50
      "
    >

      {posts.map((post) => (

        <Link
          key={post.id}
          href={`/post/${post.slug}`}
          onClick={onClose}
          className="
            flex
            items-center
            gap-4
            p-4
            border-b
            border-red-900/20
            hover:bg-red-950/20
            transition
          "
        >

          <div
            className="
              relative
              w-24
              h-16
              rounded-xl
              overflow-hidden
              shrink-0
            "
          >

            <Image
              src={post.image}
              alt={post.title}
              fill
              className="
                object-cover
              "
            />

          </div>

          <div className="space-y-2">

            <p
              className="
                text-red-500
                text-xs
                uppercase
                font-bold
              "
            >
              {post.category}
            </p>

            <h3
              className="
                text-white
                font-bold
                line-clamp-1
              "
            >
              {post.title}
            </h3>

          </div>

        </Link>

      ))}

    </div>
  );
}