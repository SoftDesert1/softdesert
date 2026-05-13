import { supabase } from "../supabase/client";

export async function getPostBySlug(
  slug: string
) {

  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error(error);
    return null;
  }

  return data;
}