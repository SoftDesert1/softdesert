import { supabase } from "@/lib/supabase/client";

export async function searchPosts(
  query: string
) {

  if (!query.trim()) {
    return [];
  }

  const { data, error } =
    await supabase

      .from("posts")

      .select("*")

      .ilike(
        "title",
        `%${query}%`
      );

  if (error) {

    console.error(error);

    return [];
  }

  return data || [];
}