import { Metadata } from "next";

import UserRegisterForm from "@/components/forms/register_form";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Artist Management System | Register",
  description: "Sign up to artist management system dashboard.",
};

export default async function Page() {
  const session = await getServerSession();

  if (session) {
    redirect("/dashboard");
  }

  return <UserRegisterForm />;
}
