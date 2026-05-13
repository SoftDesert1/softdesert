interface PostsListProps {

  posts: any[];

  deletePost: (
    id: string
  ) => void;

  setEditingPost: (
    post: any
  ) => void;
}

export function PostsList({
  posts,
  deletePost,
  setEditingPost,
}: PostsListProps) {

  return (

    <div className="space-y-4 pt-10">

      <h2 className="text-2xl font-bold text-white">
        Posts Criados
      </h2>

      {posts.map((post) => (

        <div
          key={post.id}
          className="
            bg-[#111]
            border
            border-red-900
            rounded-xl
            p-4
            flex
            items-center
            justify-between
            gap-4
          "
        >

          <div className="flex items-center gap-4">

            <img
              src={post.image}
              alt={post.title}
              className="
                w-24
                h-24
                object-cover
                rounded-lg
              "
            />

            <div>

              <h3 className="text-white font-bold">
                {post.title}
              </h3>

              <p className="text-gray-400 text-sm">
                {post.category}
              </p>

            </div>

          </div>

          <button
  onClick={() =>
    setEditingPost(post)
  }
  className="
    bg-blue-600
    hover:bg-blue-700
    transition
    px-4
    py-2
    rounded-lg
    text-white
  "
>
  Editar
</button>

          <button
            onClick={() =>
              deletePost(post.id)
            }
            className="
              bg-red-600
              hover:bg-red-700
              transition
              px-4
              py-2
              rounded-lg
              text-white
            "
          >
            Deletar
          </button>

        </div>

      ))}

    </div>
  );
}