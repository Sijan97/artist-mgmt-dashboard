"use client";

import BreadCrumb from "@/components/breadcrumb";
import { ScrollArea } from "@/components/ui/scroll-area";
import React, { useEffect, useState } from "react";
import { __noop } from "@/lib/utils";
import { MusicForm } from "@/components/forms/music_form";
import { useSession } from "next-auth/react";
import { Artist, getArtists } from "../../artists/core";
import { AxiosError } from "axios";

export default function Page() {
  const breadcrumbItems = [
    { title: "Artists", link: "/dashboard/artists" },
    { title: "New", link: "/dashboard/artists/new" },
  ];

  const { data: session, status } = useSession();
  const [artists, setArtists] = useState<Artist[]>();
  const [token, setToken] = useState("");

  useEffect(() => {
    if (session) {
      setToken(session.user.token);
    }
  }, [session]);

  useEffect(() => {
    if (token) {
      const fetchData = async () => {
        try {
          await getArtists(handleSuccess, handleFailure, token);
        } catch (error) {
          handleFailure;
        }
      };

      fetchData();
    }
  }, [token]);

  const handleSuccess = (data: any) => {
    setArtists(data);
  };

  const handleFailure = (error: AxiosError) => {
    console.error("Error fetching artists:", error);
  };

  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-5">
        <BreadCrumb items={breadcrumbItems} />
        <MusicForm initialData={null} artists={artists as Artist[]} />
      </div>
    </ScrollArea>
  );
}
