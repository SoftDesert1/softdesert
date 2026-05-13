import { supabase } from "@/lib/supabase/client";

export async function getTrendingPosts() {

  const { data: likes } =
    await supabase
      .from("likes")
      .select("*");

  if (!likes || likes.length === 0) {
    return [];
  }

  const postIds = [
    ...new Set(
      likes.map((like) => like.post_id)
    ),
  ];

  const { data: posts } =
    await supabase
      .from("posts")
      .select("*")
      .in("id", postIds);

  if (!posts) return [];

  const trending = posts.map((post) => {

    const likesCount =
      likes.filter(
        (like) =>
          like.post_id === post.id
      ).length;

    return {
      post,
      likes: likesCount,
    };
  });

  return trending.sort(
    (a, b) =>
      b.likes - a.likes
  );
}