import { Artist } from "../../artists/core";

export type Music = {
  id: string;
  artists: Artist[];
  title: string;
  album_name: string;
  release_date: Date;
  genre: string;
};
