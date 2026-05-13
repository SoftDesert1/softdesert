"use client";

interface CommentListProps {

  comments: any[];
}

export function CommentList({
  comments,
}: CommentListProps) {

  return (

    <div className="space-y-4">

      <h2
        className="
          text-3xl
          font-bold
          text-red-500
        "
      >
        Comentários
      </h2>

      {comments.length === 0 && (

        <p className="text-gray-400">
          Nenhum comentário ainda.
        </p>

      )}

      {comments.map((comment) => (

        <div
          key={comment.id}
          className="
            bg-[#111]
            border
            border-red-900
            rounded-xl
            p-4
            flex
            gap-4
          "
        >

          <img
            src={comment.avatar}
            alt={comment.username}
            className="
              w-12
              h-12
              rounded-full
              border
              border-red-500
            "
          />

          <div className="flex-1">

            <div
              className="
                flex
                items-center
                gap-2
                mb-2
              "
            >

              <h3
                className="
                  text-white
                  font-bold
                "
              >
                {comment.username}
              </h3>

              <span
                className="
                  text-xs
                  text-gray-500
                "
              >
                {new Date(
                  comment.created_at
                ).toLocaleDateString()}
              </span>

            </div>

            <p className="text-gray-300">
              {comment.content}
            </p>

          </div>

        </div>

      ))}

    </div>
  );
}