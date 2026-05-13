import Image from "next/image";

import Link from "next/link";

interface HeroSectionProps {

  post: any;
}

export function HeroSection({
  post,
}: HeroSectionProps) {

  if (!post) return null;

  return (

    <section
      className="
        relative
        w-full
        h-[700px]
        rounded-3xl
        overflow-hidden
        border
        border-red-900
      "
    >

      <Image
        src={post.image}
        alt={post.title}
        fill
        className="
          object-cover
          scale-105
          hover:scale-110
          transition
          duration-700
        "
      />

      <div
        className="
          absolute
          inset-0
          bg-gradient-to-t
          from-black
          via-black/60
          to-transparent
        "
      />

      <div
        className="
          absolute
          bottom-0
          left-0
          p-10
          max-w-3xl
          space-y-6
        "
      >

        <span
          className="
            bg-red-600
            px-4
            py-2
            rounded-full
            text-sm
            font-bold
            uppercase
          "
        >
          Destaque
        </span>

        <h1
          className="
            text-6xl
            font-black
            text-white
            leading-tight
          "
        >
          {post.title}
        </h1>

        <p
          className="
            text-gray-300
            text-xl
          "
        >
          {post.content.slice(0, 180)}...
        </p>

        <Link
          href={`/post/${post.slug}`}
          className="
            inline-flex
            bg-red-600
            hover:bg-red-700
            transition
            px-8
            py-4
            rounded-xl
            text-white
            font-bold
          "
        >
          Ler Agora
        </Link>

      </div>

    </section>
  );
}