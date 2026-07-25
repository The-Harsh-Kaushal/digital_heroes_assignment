import { z } from "zod";

const leadStatuses = ["new", "contacted", "closed"];
const objectId = z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid lead id");

export const leadListQuery = z.object({
  status: z.enum(leadStatuses).optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

export const leadIdParams = z.object({
  id: objectId,
});

export const leadStatusUpdate = z.object({
  status: z.enum(leadStatuses),
});
