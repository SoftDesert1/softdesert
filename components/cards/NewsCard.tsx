import Image from "next/image";
import Link from "next/link";

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
    <div
      className="
        group
        bg-[#111]
        border border-red-900/40
        rounded-2xl
        overflow-hidden
        transition-all
        duration-300
        hover:border-red-500
        hover:shadow-[0_0_25px_rgba(255,0,0,0.25)]
      "
    >

      {/* IMAGE */}

      <div className="relative w-full h-56 overflow-hidden">

        <Image
          src={image}
          alt={title}
          fill
          className="
            object-cover
            transition-transform
            duration-500
            group-hover:scale-110
          "
        />

      </div>

      {/* CONTENT */}

      <div className="p-5 space-y-4">

        <h2
          className="
            text-2xl
            font-bold
            text-white
            group-hover:text-red-500
            transition
          "
        >
          {title}
        </h2>

        <p className="text-gray-400">
          {description}
        </p>

        <Link
  href={`/post/${slug}`}
  className="
    inline-block
    bg-red-600
    hover:bg-red-700
    transition
    px-4
    py-2
    rounded-lg
    text-white
  "
>
  Ler mais
</Link>

      </div>

    </div>
  );
}