"use client";

import { useEffect } from "react";

import { useRouter } from "next/navigation";

import { supabase } from "@/lib/supabase/client";

export default function AuthCallbackPage() {

  const router = useRouter();

  useEffect(() => {

    async function getSession() {

      await supabase.auth.getSession();

      const params =
        new URLSearchParams(
          window.location.search
        );

      const next =
        params.get("next")
        || "/";

      router.push(next);
    }

    getSession();

  }, [router]);

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