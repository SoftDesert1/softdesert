import Image from "next/image";

import Link from "next/link";

interface PostSidebarProps {

  trendingPosts: any[];

  latestPosts: any[];
}

export function PostSidebar({
  trendingPosts,
  latestPosts,
}: PostSidebarProps) {

  return (

    <aside className="space-y-8">

      {/* TRENDING */}

      <div
        className="
          bg-[#111]
          border
          border-red-900
          rounded-3xl
          p-6
        "
      >

        <h2
          className="
            text-2xl
            font-black
            text-white
            mb-6
          "
        >
          🔥 Trending
        </h2>

        <div className="space-y-5">

          {trendingPosts.map((item) => (

            <Link
              key={item.post.id}
              href={`/post/${item.post.slug}`}
              className="
                flex
                gap-4
                group
              "
            >

              <div
                className="
                  relative
                  w-28
                  h-20
                  rounded-xl
                  overflow-hidden
                  shrink-0
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
                  ♥ {item.likes} curtidas
                </p>

                <h3
                  className="
                    text-white
                    font-bold
                    text-sm
                    line-clamp-2
                    group-hover:text-red-400
                    transition
                  "
                >
                  {item.post.title}
                </h3>

              </div>

            </Link>

          ))}

        </div>

      </div>

      {/* LATEST */}

      <div
        className="
          bg-[#111]
          border
          border-red-900
          rounded-3xl
          p-6
        "
      >

        <h2
          className="
            text-2xl
            font-black
            text-white
            mb-6
          "
        >
          📰 Últimas Notícias
        </h2>

        <div className="space-y-5">

          {latestPosts.map((post) => (

            <Link
              key={post.id}
              href={`/post/${post.slug}`}
              className="
                flex
                gap-4
                group
              "
            >

              <div
                className="
                  relative
                  w-28
                  h-20
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
                    group-hover:scale-105
                    transition
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
                    text-sm
                    line-clamp-2
                    group-hover:text-red-400
                    transition
                  "
                >
                  {post.title}
                </h3>

              </div>

            </Link>

          ))}

        </div>

      </div>

    </aside>
  );
}