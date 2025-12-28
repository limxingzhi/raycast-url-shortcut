import { z } from "zod";

export const keyListSchema = z.array(
  z.object({
    key: z.string(),
    value: z.string(),
  }),
);

export type KeyList = z.input<typeof keyListSchema>;
