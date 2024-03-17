"use client";

import React from "react";
import ThemeProvider from "./ThemeToggle/theme-provider";
import { SessionProvider, SessionProviderProps } from "next-auth/react";

interface Props {
  children: React.ReactNode;
  session: SessionProviderProps["session"];
}

export default function Providers({ children, session }: Props) {
  return (
    <>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <SessionProvider session={session}>{children}</SessionProvider>
      </ThemeProvider>
    </>
  );
}
