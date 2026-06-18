import { z } from "zod";

export const jobsRouteParamsSchema = z.object({
  provider: z.enum(["greenhouse"]),
  identifier: z
    .string()
    .trim()
    .min(1)
    .max(120)
    .regex(/^[a-z0-9][a-z0-9._-]*$/i, "Invalid provider identifier"),
});

export const jobsRouteQuerySchema = z
  .object({
    term: z.string().trim().min(1).max(120).optional(),
  })
  .strict();

export type JobsRouteParams = z.infer<typeof jobsRouteParamsSchema>;
export type JobsRouteQuery = z.infer<typeof jobsRouteQuerySchema>;
