import { supabase }
from "@/lib/supabase/client";

export async function getRelatedPosts(
  category: string,
  currentPostId: string
) {

  const { data } =
    await supabase

      .from("posts")

      .select("*")

      .neq(
        "id",
        currentPostId
      )

      .limit(3);

  if (
    data &&
    data.length > 0
  ) {

    return data;
  }

  const {
    data: fallbackPosts,
  } =
    await supabase

      .from("posts")

      .select("*")

      .neq(
        "id",
        currentPostId
      )

      .limit(3);

  return fallbackPosts || [];
}