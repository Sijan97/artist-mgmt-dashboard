"use client";

import BreadCrumb from "@/components/breadcrumb";
import { ScrollArea } from "@/components/ui/scroll-area";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { AxiosError } from "axios";
import { __noop } from "@/lib/utils";
import { Artist, getArtist } from "../../../core";
import { ArtistMusicForm } from "@/components/forms/artist_musics.form";

export default function Page({ params }: { params: { id: string } }) {
  const breadcrumbItems = [
    { title: "Artists", link: `/dashboard/artists/${params.id}/musics/` },
    { title: "Add", link: "/dashboard/artists/music/new" },
  ];

  const id = params.id;
  const { data: session, status } = useSession();
  const [artist, setArtist] = useState<Artist>();
  const [token, setToken] = useState("");

  useEffect(() => {
    if (session) {
      setToken(session.user.token);
    }
  }, [session]);

  useEffect(() => {
    if (token) {
      const fetchArtistData = async () => {
        try {
          await getArtist(id, handleSuccess, handleFailure, token);
        } catch (error) {
          handleFailure;
        }
      };
      fetchArtistData();
    }
  }, [id, token]);

  const handleSuccess = (data: Artist) => {
    setArtist(data);
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
        <ArtistMusicForm initial_data={null} artist_id={artist?.id as string} />
      </div>
    </ScrollArea>
  );
}
