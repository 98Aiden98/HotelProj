import { z } from "zod";

export const zUpdateProfileTrpcInput = z.object({
  nick: z
    .string()
    .min(1, "Nick is required")
    .regex(/^[a-z0-9-]+$/, "Nick can only contain letters, numbers and dashes"),
  name: z.string().max(50).min(1),
});
