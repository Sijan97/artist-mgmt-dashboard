"use client";

import { Plus } from "lucide-react";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";

import { Music, musicColumns } from ".";

interface MusicsClientProps {
  data: Music[];
  totalMusics: number;
  nextPage: any;
  previousPage: any;
  previousEnabled: boolean;
  nextEnabled: boolean;
  page: number;
  pageCount: number;
}

export const MusicClient: React.FC<MusicsClientProps> = ({
  data,
  totalMusics,
  nextPage,
  previousPage,
  previousEnabled,
  nextEnabled,
  page,
  pageCount,
}) => {
  const router = useRouter();

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Musics (${totalMusics})`}
          description="Manage musics"
        />
        <Button
          className="text-xs md:text-sm"
          onClick={() => router.push(`/dashboard/musics/new`)}
        >
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable
        searchKey="title"
        columns={musicColumns}
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
