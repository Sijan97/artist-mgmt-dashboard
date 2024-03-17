"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import BreadCrumb from "@/components/breadcrumb";

import { ArtistClient } from "./core/client";
import { Artist, getArtists } from "./core";

const breadcrumbItems = [{ title: "Artists", link: "/dashboard/artists" }];

type paramsProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

export default function Page({ searchParams }: paramsProps) {
  const page = Number(searchParams.page) || 1;
  const pageLimit = Number(searchParams.limit) || 10;

  const { data: session, status } = useSession();
  const [artists, setArtists] = useState<Array<Artist>>([]);
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

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  const totalArtists = artists.length;
  const pageCount = Math.ceil(totalArtists / pageLimit);

  return (
    <>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />
        <ArtistClient data={artists} />
      </div>
    </>
  );
}
