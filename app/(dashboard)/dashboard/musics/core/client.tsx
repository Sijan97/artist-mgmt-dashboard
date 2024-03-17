"use client";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { Music, musicColumns } from ".";

interface MusicsClientProps {
  data: Music[];
  page: number;
  pageCount: number;
}

export const MusicClient: React.FC<MusicsClientProps> = ({
  data,
  page,
  pageCount,
}) => {
  const router = useRouter();

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Musics (${data.length})`}
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
        pageNo={page}
        searchKey="title"
        columns={musicColumns}
        data={data}
        totalUsers={0}
        pageCount={pageCount}
      />
    </>
  );
};
