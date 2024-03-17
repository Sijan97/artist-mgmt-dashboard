"use client";

import BreadCrumb from "@/components/breadcrumb";
import { ProfileForm } from "@/components/forms/profile_form";
import { ScrollArea } from "@/components/ui/scroll-area";
import React, { useEffect, useState } from "react";
import { UserProfile, getProfile } from "../core";
import { useSession } from "next-auth/react";
import { AxiosError } from "axios";
import { __noop } from "@/lib/utils";

export default function Page({ params }: { params: { id: string } }) {
  const breadcrumbItems = [
    { title: "Profiles", link: "/dashboard/profile" },
    { title: "Update", link: "/dashboard/profile/update" },
  ];

  const id = params.id;
  const { data: session, status } = useSession();
  const [profile, setProfile] = useState<UserProfile>();
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
          await getProfile(id, handleSuccess, handleFailure, token);
        } catch (error) {
          handleFailure;
        }
      };

      fetchData();
    }
  }, [id, token]);

  const handleSuccess = (data: any) => {
    setProfile(data);
  };

  const handleFailure = (error: AxiosError) => {
    console.error("Error fetching profiles:", error);
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-5">
        <BreadCrumb items={breadcrumbItems} />
        <ProfileForm initialData={profile as UserProfile} />
      </div>
    </ScrollArea>
  );
}
