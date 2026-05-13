interface PostFormProps {

  title: string;

  setTitle: (value: string) => void;

  content: string;

  setContent: (value: string) => void;

  image: string;

  uploading: boolean;

  uploadImage: (file: File) => void;

  createPost: () => void;
}

export function PostForm({
  title,
  setTitle,
  content,
  setContent,
  image,
  uploading,
  uploadImage,
  createPost,
}: PostFormProps) {

  return (

    <div className="space-y-4">

      {/* TITLE */}

      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
        className="
          w-full
          bg-[#111]
          border
          border-red-900
          rounded-xl
          p-4
          text-white
        "
      />

      {/* CONTENT */}

      <textarea
        placeholder="Conteúdo"
        value={content}
        onChange={(e) =>
          setContent(e.target.value)
        }
        className="
          w-full
          h-40
          bg-[#111]
          border
          border-red-900
          rounded-xl
          p-4
          text-white
        "
      />

      {/* IMAGE */}

      <div className="space-y-2">

        <input
          type="file"
          accept="image/*"
          onChange={(e) => {

            const file =
              e.target.files?.[0];

            if (file) {
              uploadImage(file);
            }

          }}
          className="
            w-full
            bg-[#111]
            border
            border-red-900
            rounded-xl
            p-4
            text-white
          "
        />

        {uploading && (

          <p className="text-gray-400">
            Enviando imagem...
          </p>

        )}

        {image && (

          <img
            src={image}
            alt="preview"
            className="
              w-full
              h-60
              object-cover
              rounded-xl
            "
          />

        )}

      </div>

      {/* BUTTON */}

      <button
        onClick={createPost}
        disabled={uploading}
        className="
          bg-red-600
          hover:bg-red-700
          transition
          px-6
          py-3
          rounded-xl
          text-white
          font-semibold
          disabled:opacity-50
        "
      >
        {uploading
          ? "Enviando..."
          : "Criar Post"}
      </button>

    </div>
  );
}