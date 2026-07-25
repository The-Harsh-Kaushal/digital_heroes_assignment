import { z } from "zod";

const leadSchema = z.object({
  name: z.string().min(1, "Name can't be empty"),
  email: z.string().email("Invalid email address"),
  message: z.string(),
  budget: z.enum(["< $500", "$500 - $1000", "$1000 - $5000", "> $5000"]),
});

export const leadCreation = leadSchema;
