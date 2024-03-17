"use client";

import BreadCrumb from "@/components/breadcrumb";
import { ScrollArea } from "@/components/ui/scroll-area";
import React, { useEffect, useState } from "react";
import { Artist, getArtist } from "../core";
import { useSession } from "next-auth/react";
import { AxiosError } from "axios";
import { __noop } from "@/lib/utils";
import { ArtistForm } from "@/components/forms/artist_form";

export default function Page({ params }: { params: { id: string } }) {
  const breadcrumbItems = [
    { title: "Artists", link: "/dashboard/artists" },
    { title: "Update", link: "/dashboard/artists/update" },
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
      const fetchData = async () => {
        try {
          await getArtist(id, handleSuccess, handleFailure, token);
        } catch (error) {
          handleFailure;
        }
      };

      fetchData();
    }
  }, [id, token]);

  const handleSuccess = (data: any) => {
    setArtist(data);
  };

  const handleFailure = (error: AxiosError) => {
    console.error("Error fetching profiles:", error);
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-5">
        <BreadCrumb items={breadcrumbItems} />
        <ArtistForm initialData={artist as Artist} />
      </div>
    </ScrollArea>
  );
}
