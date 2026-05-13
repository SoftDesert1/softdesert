import { supabase } from "@/lib/supabase/client";

export async function getClassBySlug(
  slug: string
) {

  const { data } =
    await supabase

      .from("classes")

      .select("*")

      .eq("slug", slug)

      .single();

  return data;
}