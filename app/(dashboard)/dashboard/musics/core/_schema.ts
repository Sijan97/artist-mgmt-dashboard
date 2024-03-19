import * as z from "zod";

export const musicSchema = z.object({
  title: z.string().optional(),
  album_name: z.string().optional(),
  release_date: z.coerce.date().optional(),
  genre: z.string().optional(),
  artist_ids: z.string().array().optional(),
});
