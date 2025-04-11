import { z } from "zod";

export const zSignUpTrpcInput = z.object({
  nick: z
    .string()
    .min(1)
    .regex(/^[a-z0-9-]+$/, "Nick can only contain letters, numbers and dashes"),
  password: z.string().min(1),
});
