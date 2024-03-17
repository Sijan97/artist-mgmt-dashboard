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
}

export const ProfileClient: React.FC<ProfilesClientProps> = ({ data }) => {
  const router = useRouter();

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Profiles (${data.length})`}
          description="Manage profiles"
        />
      </div>
      <Separator />
      <DataTable searchKey="name" columns={profileColumns} data={data} />
    </>
  );
};
