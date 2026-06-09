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

const booleanQuerySchema = z
  .enum(["true", "false"])
  .optional()
  .transform((value) => value === "true");

export const jobsRouteQuerySchema = z.object({
  content: booleanQuerySchema,
  term: z.string().trim().min(1).max(120).optional(),
});

export type JobsRouteParams = z.infer<typeof jobsRouteParamsSchema>;
export type JobsRouteQuery = z.infer<typeof jobsRouteQuerySchema>;
