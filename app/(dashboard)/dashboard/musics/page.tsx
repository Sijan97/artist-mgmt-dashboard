"use client";

import BreadCrumb from "@/components/breadcrumb";
import { buttonVariants } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Music, getMusics, musicColumns } from "./core";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";

const breadcrumbItems = [{ title: "Employee", link: "/dashboard/employee" }];

type paramsProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

export default function Page({ searchParams }: paramsProps) {
  const page = Number(searchParams.page) || 1;
  const pageLimit = Number(searchParams.limit) || 10;
  const country = searchParams.search || null;
  const offset = (page - 1) * pageLimit;

  const { data: session, status } = useSession();
  const [musics, setMusics] = useState<Array<Music>>([]);
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
          await getMusics(handleSuccess, handleFailure, token);
        } catch (error) {
          handleFailure;
        }
      };

      fetchData();
    }
  }, [token]);

  const handleSuccess = (data: any) => {
    setMusics(data);
  };

  const handleFailure = (error: AxiosError) => {
    console.error("Error fetching musics:", error);
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  const totalMusics = musics.length;
  const pageCount = Math.ceil(totalMusics / pageLimit);
  return (
    <>
      <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />

        <div className="flex items-start justify-between">
          <Heading
            title={`Musics (${totalMusics})`}
            description="Manage music"
          />

          <Link
            href={"/dashboard/musics/new"}
            className={cn(buttonVariants({ variant: "default" }))}
          >
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Link>
        </div>
        <Separator />

        <DataTable
          searchKey="title"
          pageNo={page}
          columns={musicColumns}
          totalUsers={totalMusics}
          data={musics}
          pageCount={pageCount}
        />
      </div>
    </>
  );
}
