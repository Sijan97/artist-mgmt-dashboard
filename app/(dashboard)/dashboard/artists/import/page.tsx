"use client";

import BreadCrumb from "@/components/breadcrumb";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { __noop } from "@/lib/utils";
import React from "react";
import { Importer, ImporterField } from "react-csv-importer";

import "react-csv-importer/dist/index.css";
import { toast } from "react-toastify";
import { createArtist } from "../core";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function ImportArtist() {
  const breadcrumbItems = [{ title: "Artists", link: "/dashboard/artists" }];

  const session = useSession();
  const router = useRouter();
  let token = "";

  if (session) {
    token = session.data?.user.token as string;
  }

  return (
    <>
      <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />

        <div className="flex items-start justify-between">
          <Heading title={`Import Artist Data`} description="Manage artist" />
        </div>
      </div>
      <Separator />

      <div className="mt-2 w-1/2 mx-auto">
        <Importer
          dataHandler={async (rows) => {
            rows.map((data) => createArtist(data, __noop, __noop, token));
          }}
          chunkSize={10000}
          defaultNoHeader={false}
          restartable={false}
          onStart={({ file, fields }): void => {
            toast.info(`Importing artist data from ${file.name}`);
          }}
          onComplete={({ file, fields }) => {
            toast.success("Import Complete");
          }}
          onClose={() => {
            router.refresh();
            router.push("/dashboard/artists");
          }}
        >
          <ImporterField name="name" label="Name" />
          <ImporterField name="first_release_year" label="First Release Year" />
          <ImporterField
            name="no_of_albums_released"
            label="No of Albums Released"
          />
          <ImporterField name="date_of_birth" label="Date of Birth" />
          <ImporterField name="gender" label="Gender" />
          <ImporterField name="address" label="Address" />
        </Importer>
      </div>
    </>
  );
}
