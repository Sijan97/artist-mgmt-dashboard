"use client";

import BreadCrumb from "@/components/breadcrumb";
import { ScrollArea } from "@/components/ui/scroll-area";
import React from "react";
import { __noop } from "@/lib/utils";
import { ArtistForm } from "@/components/forms/artist_form";

export default function Page() {
  const breadcrumbItems = [
    { title: "Artists", link: "/dashboard/artists" },
    { title: "New", link: "/dashboard/artists/new" },
  ];

  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-5">
        <BreadCrumb items={breadcrumbItems} />
        <ArtistForm initialData={null} />
      </div>
    </ScrollArea>
  );
}
