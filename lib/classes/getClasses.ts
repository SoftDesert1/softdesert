import { supabase } from "@/lib/supabase/client";

export async function getClasses() {

  const { data } =
    await supabase

      .from("classes")

      .select("*")

      .order("name");

  return data || [];
}