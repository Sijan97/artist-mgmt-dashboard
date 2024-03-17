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

export default function Page({ searchParams }: paramsProps) {
  const page = Number(searchParams.page) || 1;
  const pageLimit = Number(searchParams.limit) || 10;

  const { data: session, status } = useSession();
  const [profiles, setProfiles] = useState<Array<UserProfile>>([]);
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
          await getProfiles(handleSuccess, handleFailure, token);
        } catch (error) {
          handleFailure;
        }
      };

      fetchData();
    }
  }, [token]);

  const handleSuccess = (data: any) => {
    setProfiles(data);
  };

  const handleFailure = (error: AxiosError) => {
    console.error("Error fetching profiles:", error);
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  const totalProfiles = profiles.length;
  const pageCount = Math.ceil(totalProfiles / pageLimit);

  return (
    <>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />
        <ProfileClient data={profiles} />
      </div>
    </>
  );
}
