"use client";

import { DownloadIcon, ImportIcon, Plus } from "lucide-react";

import { useRouter } from "next/navigation";
import { CSVLink } from "react-csv";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";

import { Artist, artistColumns } from ".";
import { Music, musicColumns } from "../../musics/core";

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

interface ArtistMusicsClientProps {
  data: Music[];
  artistId: string;
  nextPage: any;
  previousPage: any;
  previousEnabled: boolean;
  nextEnabled: boolean;
  totalMusics: number;
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
  const csvData = [
    [
      "NAME",
      "FIRST RELEASE YEAR",
      "ALBUMS COUNT",
      "DATE OF BIRTH",
      "GENDER",
      "ADDRESS",
    ],
    ...data.map(
      ({
        name,
        first_release_year,
        no_of_albums_released,
        date_of_birth,
        gender,
        address,
      }) => [
        name,
        first_release_year,
        no_of_albums_released,
        date_of_birth,
        gender,
        address,
      ]
    ),
  ];

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Artists (${totalArtists})`}
          description="Manage artists"
        />

        <div className="flex gap-2">
          <Button
            className="text-xs md:text-sm"
            onClick={() => router.push(`/dashboard/artists/new`)}
          >
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Button>
          <Button
            className="text-xs md:text-sm"
            onClick={() => router.push(`/dashboard/artists/import`)}
          >
            <ImportIcon className="mr-2 h-4 w-4" /> Import Artists
          </Button>
          <Button className="text-xs md:text-sm">
            <DownloadIcon className="mr-2 h-4 w-4" />{" "}
            <CSVLink data={csvData} filename="artists.csv">
              Export Artists
            </CSVLink>
          </Button>
        </div>
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

export const ArtistMusicClient: React.FC<ArtistMusicsClientProps> = ({
  data,
  artistId,
  nextPage,
  previousPage,
  previousEnabled,
  nextEnabled,
  totalMusics,
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
          onClick={() =>
            router.push(`/dashboard/artists/${artistId}/musics/new`)
          }
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
