"use client";

import {
  useEffect,
  useState,
} from "react";

import Link
from "next/link";

import { supabase }
from "@/lib/supabase/client";

interface BreakingPost {

  id: number;

  title: string;

  slug: string;
}

export function BreakingNews() {

  const [news, setNews] =
    useState<
      BreakingPost[]
    >([]);

  useEffect(() => {

    fetchBreakingNews();

  }, []);

  async function fetchBreakingNews() {

    const {
      data,
      error,
    } = await supabase

      .from("posts")

      .select(`
        id,
        title,
        slug
      `)

      .eq(
        "is_breaking",
        true
      )

      .order(
        "created_at",
        {
          ascending: false,
        }
      );

    if (error) {

      console.error(error);

      return;
    }

    setNews(data || []);
  }

  if (!news.length) {

    return null;
  }

  return (

    <div
      className="
        w-full
        overflow-x-hidden
        border-y
        border-red-900
        bg-[#111]
        py-3
      "
    >

      <div
        className="
          inline-flex
          items-center
          gap-16
          whitespace-nowrap
          animate-marquee
          min-w-max
        "
      >

        {[...news, ...news].map(
          (item, index) => (

            <Link
              key={index}

              href={`/post/${item.slug}`}

              className="
                flex
                items-center
                gap-4
                whitespace-nowrap
                hover:opacity-80
                transition
              "
            >

              <span
                className="
                  text-red-500
                  font-black
                "
              >
                BREAKING
              </span>

              <span
                className="
                  text-white
                  font-semibold
                "
              >
                {item.title}
              </span>

            </Link>

          )
        )}

      </div>

    </div>
  );
}