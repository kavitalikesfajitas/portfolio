import {
  greenhouseDepartmentsResponseSchema,
  greenhouseJobsResponseSchema,
  type GreenhouseDepartmentsResponse,
  type GreenhouseJobsResponse,
} from "./schema";

const GREENHOUSE_BASE_URL = "https://boards-api.greenhouse.io/v1/boards";
export const GREENHOUSE_JOBS_REVALIDATE_SECONDS = 900;
export const GREENHOUSE_DEPARTMENTS_REVALIDATE_SECONDS = 86_400;

type FetchGreenhouseJobsOptions = {
  includeContent?: boolean;
};

async function fetchGreenhouseJson<T>(
  path: string,
  parse: (data: unknown) => T,
  revalidate: number,
): Promise<T> {
  const response = await fetch(`${GREENHOUSE_BASE_URL}${path}`, {
    next: { revalidate },
  });

  if (!response.ok) {
    throw new Error(`Greenhouse request failed with ${response.status}`);
  }

  return parse(await response.json());
}

export async function fetchGreenhouseDepartments(
  boardToken: string,
): Promise<GreenhouseDepartmentsResponse> {
  return fetchGreenhouseJson(
    `/${boardToken}/departments`,
    (data) => greenhouseDepartmentsResponseSchema.parse(data),
    GREENHOUSE_DEPARTMENTS_REVALIDATE_SECONDS,
  );
}

export async function fetchGreenhouseJobs(
  boardToken: string,
  { includeContent = false }: FetchGreenhouseJobsOptions = {},
): Promise<GreenhouseJobsResponse> {
  const searchParams = new URLSearchParams();

  if (includeContent) {
    searchParams.set("content", "true");
  }

  const query = searchParams.size > 0 ? `?${searchParams.toString()}` : "";

  return fetchGreenhouseJson(
    `/${boardToken}/jobs${query}`,
    (data) => greenhouseJobsResponseSchema.parse(data),
    GREENHOUSE_JOBS_REVALIDATE_SECONDS,
  );
}
