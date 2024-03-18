"use client";

import { useEffect, useState } from "react";

import { AxiosError } from "axios";

import { useSession } from "next-auth/react";
import BreadCrumb from "@/components/breadcrumb";

import { Artist, getArtists } from "./core";
import { ArtistClient } from "./core/client";

const breadcrumbItems = [{ title: "Artists", link: "/dashboard/artists" }];

type paramsProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

interface ResultData {
  count: number;
  next: string;
  previous: string | null;
  results: Artist[];
}

export default function Page({ searchParams }: paramsProps) {
  const [page, setPage] = useState(1);
  const pageLimit = Number(searchParams.limit) || 10;
  const [totalArtists, setTotalArtists] = useState(0);
  const { data: session, status } = useSession();
  const [artists, setArtists] = useState<Array<Artist>>([]);
  const [token, setToken] = useState("");
  const [query, setQuery] = useState("");
  const [enableNext, setEnableNext] = useState(true);
  const [enablePrevious, setEnablePrevious] = useState(false);

  useEffect(() => {
    if (session) {
      setToken(session.user.token);
    }
  }, [session]);

  useEffect(() => {
    if (token) {
      const fetchData = async (query: string) => {
        try {
          await getArtists(handleSuccess, handleFailure, token, query);
        } catch (error) {
          handleFailure;
        }
      };

      fetchData(query);
    }
  }, [query, token]);

  const handleSuccess = (data: ResultData) => {
    setTotalArtists(data.count);
    setArtists(data.results);
  };

  const handleFailure = (error: AxiosError) => {
    console.error("Error fetching artists:", error);
  };

  const pageCount = Math.ceil(totalArtists / pageLimit);

  const nextPageHandler = () => {
    const nextPage = page + 1;

    if (nextPage <= pageCount) {
      setPage(nextPage);
      setQuery(`?page=${nextPage}`);
    }

    setEnableNext(nextPage < pageCount);
    setEnablePrevious(true);
  };

  const previousPageHandler = () => {
    const prevPage = page - 1;

    if (prevPage >= 1) {
      setPage(prevPage);
      setQuery(`?page=${prevPage}`);
    }

    setEnablePrevious(prevPage > 1);
    setEnableNext(true);
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />
        <ArtistClient
          data={artists}
          totalArtists={totalArtists}
          previousPage={previousPageHandler}
          previousEnabled={enablePrevious}
          nextEnabled={enableNext}
          nextPage={nextPageHandler}
          page={page}
          pageCount={pageCount}
        />
      </div>
    </>
  );
}
