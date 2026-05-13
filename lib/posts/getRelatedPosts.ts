import { supabase } from "@/lib/supabase/client";

export async function getRelatedPosts(
  category: string,
  currentPostId: number
) {

  const { data } = await supabase

    .from("posts")

    .select("*")

    .eq("category", category)

    .neq("id", currentPostId)

    .limit(3);

  return data || [];
}