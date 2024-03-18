"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import BreadCrumb from "@/components/breadcrumb";

import { ProfileClient } from "./core/client";
import { UserProfile, getProfiles } from "./core";

const breadcrumbItems = [{ title: "Profiles", link: "/dashboard/profiles" }];

type paramsProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

interface ResultData {
  count: number;
  next: string;
  previous: string | null;
  results: UserProfile[];
}

export default function Page({ searchParams }: paramsProps) {
  const [page, setPage] = useState(1);
  const pageLimit = Number(searchParams.limit) || 10;
  const [totalProfiles, setTotalProfiles] = useState(0);
  const { data: session, status } = useSession();
  const [profiles, setProfiles] = useState<Array<UserProfile>>([]);
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
          await getProfiles(handleSuccess, handleFailure, token, query);
        } catch (error) {
          handleFailure;
        }
      };

      fetchData(query);
    }
  }, [query, token]);

  const handleSuccess = (data: ResultData) => {
    setTotalProfiles(data.count);
    setProfiles(data.results);
  };

  const handleFailure = (error: AxiosError) => {
    console.error("Error fetching profiles:", error);
  };

  const pageCount = Math.ceil(totalProfiles / pageLimit);

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
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />
        <ProfileClient
          data={profiles}
          totalProfiles={totalProfiles}
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
