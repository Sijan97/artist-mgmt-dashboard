import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "@/styles/globals.css";
import { Setup } from "@/components/utils";
import Providers from "@/components/layout/providers";
import { getServerSession } from "next-auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Artist Management System",
  description: "Artist Management System Dashboard",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers session={session}>
          <Setup />
          <div>{children}</div>
        </Providers>
      </body>
    </html>
  );
}
