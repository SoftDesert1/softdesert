import { supabase } from "@/lib/supabase/client";

export async function getTrendingPosts() {

  const { data } = await supabase
    .from("likes")
    .select(`
      post_id,
      posts (
        id,
        title,
        slug,
        image,
        content,
        category
      )
    `);

  if (!data) return [];

  const countMap: Record<
    number,
    {
      likes: number;
      post: any;
    }
  > = {};

  data.forEach((like: any) => {

    const post = like.posts;

    if (!post) return;

    if (!countMap[post.id]) {

      countMap[post.id] = {
        likes: 0,
        post,
      };
    }

    countMap[post.id].likes++;
  });

  return Object.values(countMap)
    .sort(
      (a, b) =>
        b.likes - a.likes
    )
    .slice(0, 5);
}