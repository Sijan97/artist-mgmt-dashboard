import * as z from "zod";

export const profileSchema = z.object({
  first_name: z.string().min(2).max(50).optional(),
  last_name: z.string().min(2).max(50).optional(),
  phone: z.string().optional(),
  date_of_birth: z.coerce.date().optional(),
  gender: z.string().optional(),
  address: z.string().optional(),

  user_email: z.string().email("Must be a valid email.").optional(),
});
