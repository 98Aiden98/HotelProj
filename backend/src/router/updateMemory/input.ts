import { z } from "zod";
import { zCreateMemoryTrpcInput } from "../createMemory/input";

export const zUpdateMemoryTrpcInput = zCreateMemoryTrpcInput.extend({
  memoryId: z.string().min(1),
});
