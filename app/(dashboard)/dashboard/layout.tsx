import type { Metadata } from "next";

import RequireAuth from "@/components/utils/RequireAuth";
import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";

export const metadata: Metadata = {
  title: "Artist Management System Dashboard",
  description: "Manage artists and music.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <RequireAuth>
      <Header />
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <main className="w-full pt-16">{children}</main>
      </div>
    </RequireAuth>
  );
}
