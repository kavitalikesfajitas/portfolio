import { z } from "zod";
import { JOB_PROVIDER_IDS } from "@/lib/jobs/providers";

export const departmentsRouteParamsSchema = z.object({
  provider: z.enum(JOB_PROVIDER_IDS),
  identifier: z
    .string()
    .trim()
    .min(1)
    .max(120)
    .regex(/^[a-z0-9][a-z0-9._-]*$/i, "Invalid provider identifier"),
});

export type DepartmentsRouteParams = z.infer<
  typeof departmentsRouteParamsSchema
>;
