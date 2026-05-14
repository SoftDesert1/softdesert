"use client";

import { supabase }
from "@/lib/supabase/client";

import Link from "next/link";

import {
  useEffect,
  useState,
} from "react";

import {
  useRouter,
} from "next/navigation";

import { SearchDropdown }
from "./SearchDropdown";

interface HeaderProps {

  onOpenSidebar: () => void;
}

export function Header({
  onOpenSidebar,
}: HeaderProps) {

  const router = useRouter();

  const [user, setUser] =
    useState<any>(null);

  const [search, setSearch] =
    useState("");

  const [results, setResults] =
    useState<any[]>([]);

  const [isMenuOpen,
    setIsMenuOpen] =
      useState(false);

  useEffect(() => {

    async function getUser() {

      const {
        data: { user },
      } = await supabase
        .auth
        .getUser();

      setUser(user);
    }

    getUser();

  }, []);

  useEffect(() => {

    async function searchPosts() {

      if (!search.trim()) {

        setResults([]);

        return;
      }

      const { data } =
        await supabase

          .from("posts")

          .select("*")

          .ilike(
            "title",
            `%${search}%`
          )

          .limit(5);

      setResults(data || []);
    }

    searchPosts();

  }, [search]);

  async function loginWithDiscord() {

    await supabase.auth
      .signInWithOAuth({

        provider: "discord",

        options: {

          redirectTo:
            `${window.location.origin}/auth/callback?next=/admin`,
        },
      });
  }

  async function logout() {

    await supabase.auth
      .signOut();

    window.location.reload();
  }

  function handleSearch(
    e: React.FormEvent
  ) {

    e.preventDefault();

    if (!search.trim()) return;

    setResults([]);

    router.push(
      `/search?q=${search}`
    );
  }

  return (

    <header
      className="
        relative
        z-50
        w-full
        h-20
        border-b
        border-red-900
        bg-black/80
        backdrop-blur-md
        flex
        items-center
        justify-between
        gap-6
        px-6
      "
    >

      {/* LEFT */}

      <div
        className="
          flex
          items-center
          gap-4
          shrink-0
        "
      >

        <button
          onClick={onOpenSidebar}
          className="
            text-white
            text-3xl
            hover:text-red-500
            transition
          "
        >
          ☰
        </button>

        <Link
          href="/"
          className="
            text-3xl
            font-black
            text-red-500
            tracking-wide
          "
        >
          SoftDesert
        </Link>

      </div>

      {/* CENTER */}

      <form
        onSubmit={handleSearch}
        className="
          flex-1
          max-w-2xl
        "
      >

        <div className="relative">

          <input
            type="text"
            placeholder="
              Buscar notícias,
              patches, eventos...
            "
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="
              w-full
              h-12
              bg-[#111]
              border
              border-red-900/50
              rounded-2xl
              px-5
              pr-14
              text-white
              placeholder:text-gray-500
              focus:outline-none
              focus:border-red-500
              transition
            "
          />

          <button
            type="submit"
            className="
              absolute
              right-4
              top-1/2
              -translate-y-1/2
              text-gray-400
              hover:text-red-500
              transition
            "
          >
            🔍
          </button>

          <SearchDropdown
            posts={results}
            onClose={() =>
              setResults([])
            }
          />

        </div>

      </form>

      {/* RIGHT */}

      {user ? (

        <div
          className="
            relative
            shrink-0
          "
        >

          {/* AVATAR */}

          <button
            onClick={() =>
              setIsMenuOpen(
                !isMenuOpen
              )
            }
            className="
              flex
              items-center
              gap-3
            "
          >

            <img
              src={
                user.user_metadata
                  .avatar_url
              }
              alt="avatar"
              className="
                w-11
                h-11
                rounded-full
                border
                border-red-500
                hover:border-red-400
                transition
              "
            />

          </button>

          {/* DROPDOWN */}

          <div
            className={`
              absolute
              right-0
              top-14
              w-56
              bg-[#111]
              border
              border-red-900
              rounded-2xl
              p-3
              space-y-2
              transition
              z-[9999]

              ${isMenuOpen
                ? "opacity-100 visible"
                : "opacity-0 invisible"
              }
            `}
          >

            <div
              className="
                px-3
                py-2
                border-b
                border-red-900
                mb-2
              "
            >

              <p
                className="
                  text-white
                  font-bold
                "
              >
                {
                  user.user_metadata
                    .full_name
                }
              </p>

            </div>

            <Link
              href={`/profile/${user.id}`}
              className="
                flex
                items-center
                px-3
                py-3
                rounded-xl
                hover:bg-red-600/20
                transition
                text-white
                font-medium
              "
            >
              Perfil
            </Link>

            <Link
              href="/settings/profile"
              className="
                flex
                items-center
                px-3
                py-3
                rounded-xl
                hover:bg-red-600/20
                transition
                text-white
                font-medium
              "
            >
              Configurações
            </Link>

            <Link
              href="/admin"
              className="
                flex
                items-center
                px-3
                py-3
                rounded-xl
                hover:bg-red-600/20
                transition
                text-white
                font-medium
              "
            >
              Admin
            </Link>

            <button
              onClick={logout}
              className="
                w-full
                text-left
                px-3
                py-3
                rounded-xl
                hover:bg-red-600/20
                transition
                text-red-500
                font-medium
              "
            >
              Logout
            </button>

          </div>

        </div>

      ) : (

        <button
          onClick={loginWithDiscord}
          className="
            bg-red-600
            hover:bg-red-700
            transition
            px-5
            py-3
            rounded-xl
            text-white
            font-bold
            shrink-0
          "
        >
          Login Discord
        </button>

      )}

    </header>
  );
}