import Link
from "next/link";

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

    <Link
      href={`/post/${slug}`}
      className="
        group
        bg-[#111]
        border
        border-red-900
        rounded-3xl
        overflow-hidden
        hover:border-red-500
        transition
        block
      "
    >

      {/* IMAGE */}

      <div
        className="
          relative
          h-64
          overflow-hidden
        "
      >

        <img
          src={image}
          alt={title}
          className="
            w-full
            h-full
            object-cover
            group-hover:scale-105
            transition
            duration-500
          "
        />

      </div>

      {/* CONTENT */}

      <div className="p-6 space-y-4">

        <h2
          className="
            text-2xl
            font-black
            text-white
            line-clamp-2
          "
        >
          {title}
        </h2>

        <p
          className="
            text-gray-400
            line-clamp-3
          "
        >
          {description}
        </p>

      </div>

    </Link>

  );
}