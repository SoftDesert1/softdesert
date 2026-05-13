import Link from "next/link";

import Image from "next/image";

interface TrendingPostsProps {

  posts: any[];
}

export function TrendingPosts({
  posts,
}: TrendingPostsProps) {

  if (!posts.length) return null;

  return (

    <section className="space-y-6">

      <div className="flex items-center gap-3">

        <span className="text-3xl">
          🔥
        </span>

        <h2
          className="
            text-4xl
            font-black
            text-white
          "
        >
          Trending Agora
        </h2>

      </div>

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-5
          gap-6
        "
      >

        {posts.map((item) => (

          <Link
            key={item.post.id}
            href={`/post/${item.post.slug}`}
            className="
              group
              bg-[#111]
              border
              border-red-900
              rounded-2xl
              overflow-hidden
              hover:border-red-500
              transition
            "
          >

            <div
              className="
                relative
                w-full
                h-52
              "
            >

              <Image
                src={item.post.image}
                alt={item.post.title}
                fill
                className="
                  object-cover
                  group-hover:scale-105
                  transition
                  duration-500
                "
              />

            </div>

            <div className="p-4 space-y-3">

              <div
                className="
                  flex
                  items-center
                  justify-between
                "
              >

                <span
                  className="
                    text-red-500
                    text-sm
                    uppercase
                    font-bold
                  "
                >
                  Trending
                </span>

                <span
                  className="
                    text-white
                    text-sm
                  "
                >
                  ♥ {item.likes}
                </span>

              </div>

              <h3
                className="
                  text-white
                  font-bold
                  line-clamp-2
                "
              >
                {item.post.title}
              </h3>

            </div>

          </Link>

        ))}

      </div>

    </section>
  );
}