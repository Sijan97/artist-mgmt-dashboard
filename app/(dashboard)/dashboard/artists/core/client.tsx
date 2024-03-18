"use client";

import { Plus } from "lucide-react";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";

import { Artist, artistColumns } from ".";

interface ArtistsClientProps {
  data: Artist[];
  nextPage: any;
  previousPage: any;
  previousEnabled: boolean;
  nextEnabled: boolean;
  totalArtists: number;
  page: number;
  pageCount: number;
}

export const ArtistClient: React.FC<ArtistsClientProps> = ({
  data,
  nextPage,
  previousPage,
  previousEnabled,
  nextEnabled,
  totalArtists,
  page,
  pageCount,
}) => {
  const router = useRouter();

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Artists (${totalArtists})`}
          description="Manage artists"
        />
        <Button
          className="text-xs md:text-sm"
          onClick={() => router.push(`/dashboard/artists/new`)}
        >
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable
        searchKey="name"
        columns={artistColumns}
        previousEnabled={previousEnabled}
        nextEnabled={nextEnabled}
        data={data}
        previousPage={previousPage}
        nextPage={nextPage}
        page={page}
        pageCount={pageCount}
      />
    </>
  );
};
