"use client";

import { useEffect, useState } from "react";

import { AxiosError } from "axios";

import { useSession } from "next-auth/react";
import BreadCrumb from "@/components/breadcrumb";

import { MusicClient } from "./core/client";
import { getMusics, Music, musicColumns } from "./core";
import { MusicResultData } from "@/constants/data";

const breadcrumbItems = [{ title: "Musics", link: "/dashboard/musics" }];

type paramsProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

export default function Page({ searchParams }: paramsProps) {
  const [page, setPage] = useState(1);
  const pageLimit = Number(searchParams.limit) || 10;
  const [totalMusics, setTotalMusics] = useState(0);
  const { data: session, status } = useSession();
  const [musics, setMusics] = useState<Array<Music>>([]);
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
          await getMusics(handleSuccess, handleFailure, token, query);
        } catch (error) {
          handleFailure;
        }
      };

      fetchData(query);
    }
  }, [query, token]);

  const handleSuccess = (data: MusicResultData) => {
    setTotalMusics(data.count);
    setMusics(data.results);
  };

  const handleFailure = (error: AxiosError) => {
    console.error("Error fetching musics:", error);
  };

  const pageCount = Math.ceil(totalMusics / pageLimit);

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

  useEffect(() => {
    setEnableNext(pageCount > 1);
  }, [pageCount]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />

        <MusicClient
          data={musics}
          totalMusics={totalMusics}
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
