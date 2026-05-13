import { supabase } from "@/lib/supabase/client";

export async function getClassSections(
  classId: number
) {

  const { data } =
    await supabase

      .from("class_sections")

      .select("*")

      .eq("class_id", classId)

      .order("order_index");

  return data || [];
}