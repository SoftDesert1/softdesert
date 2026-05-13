"use client";

import { supabase } from "@/lib/supabase/client";

import { useEffect, useState } from "react";

interface HeaderProps {
  onOpenSidebar: () => void;
}

export function Header({
  onOpenSidebar,
}: HeaderProps) {

  const [user, setUser] = useState<any>(null);

  useEffect(() => {

    async function getUser() {

      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);
    }

    getUser();

  }, []);

  async function loginWithDiscord() {

    await supabase.auth.signInWithOAuth({
      provider: "discord",
      options: {
        redirectTo:
  `${window.location.origin}/auth/callback?next=/admin`,
      },
    });

  }

  async function logout() {

    await supabase.auth.signOut();

    window.location.reload();

  }

  return (
    <header className="w-full h-16 border-b border-red-900 bg-black/80 backdrop-blur-md flex items-center justify-between px-6">

      <div className="flex items-center gap-4">

        <button
          onClick={onOpenSidebar}
          className="text-white text-2xl hover:text-red-500 transition"
        >
          ☰
        </button>

        <h1 className="text-2xl font-bold text-red-500">
          SoftDesert
        </h1>

      </div>

      {user ? (

        <div className="flex items-center gap-4">

          <img
            src={user.user_metadata.avatar_url}
            alt="avatar"
            className="
              w-10
              h-10
              rounded-full
              border
              border-red-500
            "
          />

          <span className="text-white font-medium">
            {user.user_metadata.full_name}
          </span>

          <button
            onClick={logout}
            className="
              bg-red-600
              hover:bg-red-700
              transition
              px-4
              py-2
              rounded-lg
              text-white
            "
          >
            Logout
          </button>

        </div>

      ) : (

        <button
          onClick={loginWithDiscord}
          className="
            bg-red-600
            hover:bg-red-700
            transition
            px-4
            py-2
            rounded-lg
            text-white
          "
        >
          Login Discord
        </button>

      )}

    </header>
  );
}