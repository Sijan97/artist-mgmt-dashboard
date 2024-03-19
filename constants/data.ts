import { Artist } from "@/app/(dashboard)/dashboard/artists/core";
import { Music } from "@/app/(dashboard)/dashboard/musics/core";
import { UserProfile } from "@/app/(dashboard)/dashboard/profile/core";
import { NavItem } from "@/types";

export const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: "dashboard",
    label: "Dashboard",
  },
  {
    title: "Profile",
    href: "/dashboard/profile",
    icon: "circleuser",
    label: "profile",
  },
  {
    title: "Artists",
    href: "/dashboard/artists",
    icon: "media",
    label: "artists",
  },
  {
    title: "Musics",
    href: "/dashboard/musics",
    icon: "music",
    label: "musics",
  },
];

export interface ProfileResultData {
  count: number;
  next: string;
  previous: string | null;
  results: UserProfile[];
}

export interface ArtistResultData {
  count: number;
  next: string;
  previous: string | null;
  results: Artist[];
}

export interface MusicResultData {
  count: number;
  next: string;
  previous: string | null;
  results: Music[];
}
