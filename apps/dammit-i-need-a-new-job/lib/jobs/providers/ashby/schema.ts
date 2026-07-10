import { z } from "zod";

export const ashbyJobSchema = z
  .object({
    id: z.string(),
    title: z.string(),
    department: z.string().nullable().optional(),
    team: z.string().nullable().optional(),
    location: z.string().nullable().optional(),
    publishedDate: z.string().nullable().optional(),
    isListed: z.boolean().optional(),
    jobUrl: z.url().optional(),
    applyUrl: z.url().optional(),
  })
  .passthrough();

export const ashbyJobsResponseSchema = z.object({
  jobs: z.array(ashbyJobSchema),
});

export type AshbyJob = z.infer<typeof ashbyJobSchema>;
export type AshbyJobsResponse = z.infer<typeof ashbyJobsResponseSchema>;
