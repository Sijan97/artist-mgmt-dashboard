"use client";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { Artist, artistColumns } from ".";

interface ArtistsClientProps {
  data: Artist[];
}

export const ArtistClient: React.FC<ArtistsClientProps> = ({ data }) => {
  const router = useRouter();

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Artists (${data.length})`}
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
      <DataTable searchKey="name" columns={artistColumns} data={data} />
    </>
  );
};
