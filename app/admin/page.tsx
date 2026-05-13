"use client";

import { useEffect, useState } from "react";

import { MainLayout } from "@/components/layout/MainLayout";

import { supabase } from "@/lib/supabase/client";

import { PostForm } from "@/components/admin/PostForm";

import { PostsList } from "@/components/admin/PostsList";

import { EditPostModal } from "@/components/admin/EditPostModal";

export default function AdminPage() {

  const [loading, setLoading] =
    useState(true);

  const [isAdmin, setIsAdmin] =
    useState(false);

  const [title, setTitle] =
    useState("");

  const [content, setContent] =
    useState("");

  const [image, setImage] =
    useState("");

  const [uploading, setUploading] =
    useState(false);

  const [posts, setPosts] =
    useState<any[]>([]);

  const [editingPost, setEditingPost] =
  useState<any>(null);

  // CHECK ADMIN

  useEffect(() => {

    async function checkAdmin() {

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        return;
      }

      const { data: profile } =
        await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

      if (
        !profile ||
        profile.role !== "admin"
      ) {

        setLoading(false);

        return;
      }

      setIsAdmin(true);

      getPosts();

      setLoading(false);
    }

    checkAdmin();

  }, []);

  // GET POSTS

  async function getPosts() {

    const { data } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

    if (data) {
      setPosts(data);
    }
  }

  // UPLOAD IMAGE

  async function uploadImage(
    file: File
  ) {

    try {

      setUploading(true);

      const fileExt =
        file.name.split(".").pop();

      const fileName =
        `${Date.now()}.${fileExt}`;

      const { error } =
        await supabase
          .storage
          .from("posts")
          .upload(fileName, file);

      if (error) {

        console.error(error);

        alert(
          "Erro ao enviar imagem"
        );

        return;
      }

      const { data } = supabase
        .storage
        .from("posts")
        .getPublicUrl(fileName);

      setImage(data.publicUrl);

    } catch (err) {

      console.error(err);

      alert(
        "Erro inesperado upload"
      );

    } finally {

      setUploading(false);

    }
  }

  // CREATE POST

  async function createPost() {

    if (!title || !content) {

      alert(
        "Preencha título e conteúdo"
      );

      return;
    }

    if (!image) {

      alert(
        "Envie uma imagem primeiro"
      );

      return;
    }

    const { error } = await supabase
      .from("posts")
      .insert({
        title,
        content,
        image,
        slug: title
          .toLowerCase()
          .replaceAll(" ", "-"),
        category: "noticias",
      });

    if (error) {

      console.error(error);

      alert(
        "Erro ao criar post"
      );

      return;
    }

    alert("Post criado!");

    getPosts();

    setTitle("");

    setContent("");

    setImage("");
  }

  // DELETE POST

  async function deletePost(
    id: string
  ) {

    const confirmDelete =
      confirm(
        "Deseja deletar este post?"
      );

    if (!confirmDelete) return;

    await supabase
      .from("posts")
      .delete()
      .eq("id", id);

    getPosts();
  }

  async function updatePost(
  id: string,
  title: string,
  content: string
) {

  await supabase
    .from("posts")
    .update({
      title,
      content,
    })
    .eq("id", id);

  setEditingPost(null);

  getPosts();
}

  // LOADING

  if (loading) {

    return (
      <MainLayout>

        <div className="text-white">
          Carregando...
        </div>

        {editingPost && (

  <EditPostModal
    post={editingPost}
    onClose={() =>
      setEditingPost(null)
    }
    onSave={updatePost}
  />

)}

      </MainLayout>
    );
  }

  // BLOQUEADO

  if (!isAdmin) {

    return (
      <MainLayout>

        <div className="text-center mt-20">

          <h1 className="text-5xl font-bold text-red-500">
            Acesso Negado
          </h1>

          <p className="text-gray-400 mt-4">
            Você não possui permissão para acessar o painel admin.
          </p>

        </div>

      </MainLayout>
    );
  }

  // ADMIN

  return (
    <MainLayout>

      <div className="max-w-2xl mx-auto space-y-6">

        <div>

          <h1 className="text-4xl font-bold text-red-500">
            Painel Admin
          </h1>

          <p className="text-gray-400 mt-2">
            Criar nova notícia
          </p>

        </div>

        <PostForm
            title={title}
            setTitle={setTitle}
            content={content}
            setContent={setContent}
            image={image}
            uploading={uploading}
            uploadImage={uploadImage}
            createPost={createPost}
        />

        <PostsList
          posts={posts}
          deletePost={deletePost}
          setEditingPost={setEditingPost}
        />

      </div>

      {editingPost && (

  <EditPostModal
    post={editingPost}
    onClose={() =>
      setEditingPost(null)
    }
    onSave={updatePost}
  />

)}

    </MainLayout>
  );
}