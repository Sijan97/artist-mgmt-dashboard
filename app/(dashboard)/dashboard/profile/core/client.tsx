"use client";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { UserProfile, profileColumns } from ".";

interface ProfilesClientProps {
  data: UserProfile[];
  totalProfiles: number;
  nextPage: any;
  previousPage: any;
  previousEnabled: boolean;
  nextEnabled: boolean;
  page: number;
  pageCount: number;
}

export const ProfileClient: React.FC<ProfilesClientProps> = ({
  data,
  totalProfiles,
  nextPage,
  previousPage,
  previousEnabled,
  nextEnabled,
  page,
  pageCount,
}) => {
  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Profiles (${totalProfiles})`}
          description="Manage profiles"
        />
      </div>
      <Separator />
      <DataTable
        searchKey="name"
        columns={profileColumns}
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
