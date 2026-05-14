import { supabase }
from "@/lib/supabase/client";

export async function
getPostsByCategory(
  category: string
) {

  const {
    data,
    error,
  } = await supabase

    .from("posts")

    .select("*")

    .eq(
      "category",
      category
    )

    .order(
      "created_at",
      {
        ascending: false,
      }
    );

  if (error) {

    console.error(error);

    return [];
  }

  return data;
}