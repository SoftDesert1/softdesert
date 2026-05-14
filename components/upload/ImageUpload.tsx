"use client";

import { supabase }
from "@/lib/supabase/client";

interface ImageUploadProps {

  onUpload:
    (url: string) => void;
}

export function ImageUpload({
  onUpload,
}: ImageUploadProps) {

  async function handleUpload(
    e: React.ChangeEvent<HTMLInputElement>
  ) {

    const file =
      e.target.files?.[0];

    if (!file) return;

    const fileName =
      `${Date.now()}-${file.name}`;

    const {
      error,
    } = await supabase

      .storage

      .from("posts")

      .upload(
        fileName,
        file
      );

    if (error) {

      console.log(error);

      alert(
        "Erro upload"
      );

      return;
    }

    const { data } =
      supabase

        .storage

        .from("posts")

        .getPublicUrl(
          fileName
        );

    onUpload(
      data.publicUrl
    );
  }

  return (

    <div className="space-y-3">

      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        className="
          w-full
          bg-black
          border
          border-red-900
          rounded-xl
          p-4
          text-white
        "
      />

    </div>

  );
}