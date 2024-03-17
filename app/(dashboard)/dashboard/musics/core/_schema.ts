import * as z from "zod";
import { artistSchema } from "../../artists/core";

export const musicSchema = z.object({
  title: z.string().optional(),
  album_name: z.string().optional(),
  release_date: z.coerce.date().optional(),
  genre: z.string().optional(),
  artist_ids: z.string().optional(),
});
