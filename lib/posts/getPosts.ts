import { supabase }
from "../supabase/client";

export async function getPosts() {

  const {
    data,
    error,
  } = await supabase

    .from("posts")

    .select("*")

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

  return data || [];
}