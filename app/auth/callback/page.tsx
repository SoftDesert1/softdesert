"use client";

import { useEffect } from "react";

import {
  useRouter,
  useSearchParams,
} from "next/navigation";

import { supabase } from "@/lib/supabase/client";

export default function AuthCallbackPage() {

  const router = useRouter();

  const searchParams =
    useSearchParams();

  useEffect(() => {

    async function getSession() {

      await supabase.auth.getSession();

      const next =
        searchParams.get("next")
        || "/";

      router.push(next);
    }

    getSession();

  }, [router, searchParams]);

  return (

    <div
      className="
        min-h-screen
        bg-black
        flex
        items-center
        justify-center
        text-white
      "
    >
      Entrando...
    </div>

  );
}