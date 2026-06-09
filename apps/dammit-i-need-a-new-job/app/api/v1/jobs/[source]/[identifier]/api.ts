import { templateFetch } from "@kavita-likes-fajitas/next-utils";
import { z } from "zod";
import type { validCompanies } from "./constants";

// Greenhouse Job Board API response (content=false).
// Schema is the single source of truth — the TS types below are inferred from it.
const greenhouseJobSchema = z.object({
  id: z.number(),
  internal_job_id: z.number(),
  title: z.string(),
  updated_at: z.string(),
  requisition_id: z.string().nullable(),
  absolute_url: z.url(),
  location: z.object({ name: z.string() }).nullable(),
});

const greenhouseJobsResponseSchema = z.object({
  jobs: z.array(greenhouseJobSchema),
  meta: z.object({ total: z.number() }),
});

export type GreenhouseJob = z.infer<typeof greenhouseJobSchema>;
export type GreenhouseJobsResponse = z.infer<
  typeof greenhouseJobsResponseSchema
>;

const greenHouseApi = (identifier: validCompanies, includeContent = false) =>
  `https://boards-api.greenhouse.io/v1/boards/${identifier}/jobs?content=${includeContent}`;

export const fetchGreenHouseJobsForCompany = async (
  identifier: validCompanies,
  includeContent = false,
): Promise<GreenhouseJobsResponse> => {
  const data = await templateFetch(greenHouseApi(identifier, includeContent), {
    next: { revalidate: 3600, tags: ["jobs", `jobs:${identifier}`] },
  });

  // Don't throw on an unexpected shape — log and fall back to an empty result
  // so the route stays up if Greenhouse changes its response.
  const parsed = greenhouseJobsResponseSchema.safeParse(data);
  if (!parsed.success) {
    console.error(
      `Unexpected Greenhouse response for "${identifier}":`,
      z.treeifyError(parsed.error),
    );
    return { jobs: [], meta: { total: 0 } };
  }

  return parsed.data;
};
