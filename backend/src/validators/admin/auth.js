import { z } from "zod";

export const adminLogin = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password can't be empty"),
});
