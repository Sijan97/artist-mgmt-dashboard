import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

interface Props {
  children: React.ReactNode;
}

export default async function RequireAuth({ children }: Props) {
  const session = await getServerSession();

  if (!session?.user) {
    redirect("/login");
  }

  return <>{children}</>;
}
