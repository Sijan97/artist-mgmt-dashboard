import { Artist } from "../../artists/core";

export type Music = {
  id: string;
  artist_ids: Artist[];
  title: string;
  album_name: string;
  release_date: Date;
  genre: string;
};
