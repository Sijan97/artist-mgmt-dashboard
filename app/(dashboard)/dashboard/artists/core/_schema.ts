import * as z from "zod";

export const artistSchema = z.object({
  name: z.string().optional(),
  first_release_year: z.coerce.number().optional(),
  no_of_albums_released: z.coerce.number().optional(),
  date_of_birth: z.coerce.date().optional(),
  gender: z.string().optional(),
  address: z.string().optional(),
});
