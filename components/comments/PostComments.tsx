"use client";

import {
  useEffect,
  useState,
} from "react";

import { supabase } from "@/lib/supabase/client";

import { CommentForm } from "./CommentForm";

import { CommentList } from "./CommentList";

interface PostCommentsProps {

  postId: string;
}

export function PostComments({
  postId,
}: PostCommentsProps) {

  const [comments, setComments] =
    useState<any[]>([]);

  async function getComments() {

    const { data } = await supabase
      .from("comments")
      .select("*")
      .eq("post_id", postId)
      .order("created_at", {
        ascending: false,
      });

    if (data) {

      setComments(data);

    }
  }

  useEffect(() => {

    getComments();

  }, []);

  return (

    <div className="space-y-8">

      <CommentForm
        postId={postId}
        onCommentAdded={getComments}
      />

      <CommentList
        comments={comments}
        isAdmin={true}
        onDelete={getComments}
      />

    </div>
  );
}