"use client";

import Link from "next/link";

import {
  useEffect,
  useState,
} from "react";

import { supabase }
from "@/lib/supabase/client";

import { MainLayout }
from "@/components/layout/MainLayout";

export default function AdminLivesPage() {

  const [lives, setLives] =
    useState<any[]>([]);

  useEffect(() => {

    fetchLives();

  }, []);

  async function fetchLives() {

    const { data } =
      await supabase

        .from("lives")

        .select("*")

        .order(
          "created_at",
          {
            ascending: false,
          }
        );

    setLives(data || []);
  }

  async function deleteLive(
    id: number
  ) {

    const confirmed =
      confirm(
        "Excluir live?"
      );

    if (!confirmed) return;

    await supabase

      .from("lives")

      .delete()

      .eq("id", id);

    fetchLives();
  }

  return (

    <MainLayout>

<div
  className="
    max-w-7xl
    mx-auto
  "
>