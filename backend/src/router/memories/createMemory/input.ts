import { z } from "zod";

export const zCreateMemoryTrpcInput = z.object({
  name: z.string().min(1, "Name is required"),
  nick: z
    .string()
    .regex(/^[a-z0-9-]+$/, "Nick can only contain letters, numbers and dashes")
    .min(1, "Nick is required"),
  description: z.string().min(1, "Description is required"),
  text: z.string().min(100, "Text must be at least 100 characters"),
});
