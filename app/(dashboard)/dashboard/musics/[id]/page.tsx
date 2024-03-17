"use client";

import BreadCrumb from "@/components/breadcrumb";
import { ScrollArea } from "@/components/ui/scroll-area";
import React, { useEffect, useState } from "react";
import { Music, getMusic } from "../core";
import { useSession } from "next-auth/react";
import { AxiosError } from "axios";
import { __noop } from "@/lib/utils";
import { MusicForm } from "@/components/forms/music_form";
import { Artist, getArtists } from "../../artists/core";

export default function Page({ params }: { params: { id: string } }) {
  const breadcrumbItems = [
    { title: "Musics", link: "/dashboard/musics" },
    { title: "Update", link: "/dashboard/musics/update" },
  ];

  const id = params.id;
  const { data: session, status } = useSession();
  const [music, setMusic] = useState<Music>();
  const [artists, setArtists] = useState<Artist[]>();
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
          await getMusic(id, handleSuccess, handleFailure, token);
        } catch (error) {
          handleFailure;
        }
      };

      const fetchArtistData = async () => {
        try {
          await getArtists(handleArtistSuccess, handleArtistFailure, token);
        } catch (error) {
          handleFailure;
        }
      };

      fetchMusicData();
      fetchArtistData();
    }
  }, [id, token]);

  const handleSuccess = (data: any) => {
    setMusic(data);
  };

  const handleArtistSuccess = (data: any) => {
    setArtists(data);
  };

  const handleFailure = (error: AxiosError) => {
    console.error("Error fetching musics:", error);
  };

  const handleArtistFailure = (error: AxiosError) => {
    console.error("Error fetching artists:", error);
  };

  if (status === "loading" && !music) {
    return <div>Loading...</div>;
  }

  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-5">
        <BreadCrumb items={breadcrumbItems} />
        <MusicForm initialData={music as Music} artists={artists as Artist[]} />
      </div>
    </ScrollArea>
  );
}
