import Image from "next/image";

interface PostHeroProps {

  post: any;
}

export function PostHero({
  post,
}: PostHeroProps) {

  return (

    <section
      className="
        relative
        w-full
        aspect-[21/9]
        overflow-hidden
        rounded-3xl
        border
        border-red-900
      "
    >

      <Image
        src={post.image}
        alt={post.title}
        fill
        className="
          object-contain
          scale-105
        "
        priority
      />

      <div
        className="
          absolute
          inset-0
          bg-gradient-to-t
          from-black
          via-black/70
          to-transparent
        "
      />

      <div
        className="
          absolute
          bottom-0
          left-0
          p-10
          max-w-4xl
          space-y-6
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
            font-bold
            uppercase
            tracking-wider
          "
        >
          {post.category}
        </span>

        <h1
          className="
            text-6xl
            font-black
            leading-tight
            text-white
          "
        >
          {post.title}
        </h1>

        <p
          className="
            text-xl
            text-gray-300
            leading-relaxed
            max-w-3xl
          "
        >
          {post.content.slice(0, 180)}...
        </p>

      </div>

    </section>
  );
}