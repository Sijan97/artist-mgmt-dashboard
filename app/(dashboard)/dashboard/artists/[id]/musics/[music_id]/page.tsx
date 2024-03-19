"use client";

import BreadCrumb from "@/components/breadcrumb";
import { ScrollArea } from "@/components/ui/scroll-area";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { AxiosError } from "axios";
import { __noop } from "@/lib/utils";
import { Music, getMusic } from "@/app/(dashboard)/dashboard/musics/core";
import { ArtistMusicForm } from "@/components/forms/artist_musics.form";

export default function Page({
  params,
}: {
  params: { id: string; music_id: string };
}) {
  const breadcrumbItems = [
    { title: "Musics", link: `/dashboard/artists/${params.id}/musics` },
    { title: "Update", link: "/dashboard/musics/update" },
  ];

  const id = params.id;
  const music_id = params.music_id;
  const { data: session, status } = useSession();
  const [music, setMusic] = useState<Music>();
  const [token, setToken] = useState("");

  useEffect(() => {
    if (session) {
      setToken(session.user.token);
    }
  }, [session]);

  useEffect(() => {
    if (token) {
      const fetchMusicData = async () => {
        try {
          await getMusic(music_id, handleSuccess, handleFailure, token);
        } catch (error) {
          handleFailure;
        }
      };

      fetchMusicData();
    }
  }, [music_id, token]);

  const handleSuccess = (data: any) => {
    setMusic(data);
  };

  const handleFailure = (error: AxiosError) => {
    console.error("Error fetching musics:", error);
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-5">
        <BreadCrumb items={breadcrumbItems} />
        <ArtistMusicForm initial_data={music as Music} artist_id={id} />
      </div>
    </ScrollArea>
  );
}
