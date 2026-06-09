import {
  greenhouseDepartmentsResponseSchema,
  greenhouseJobsResponseSchema,
  type GreenhouseDepartmentsResponse,
  type GreenhouseJobsResponse,
} from "./schema";

const GREENHOUSE_BASE_URL = "https://boards-api.greenhouse.io/v1/boards";
export const GREENHOUSE_JOBS_REVALIDATE_SECONDS = 900;
export const GREENHOUSE_DEPARTMENTS_REVALIDATE_SECONDS = 86_400;
const GREENHOUSE_FETCH_TIMEOUT_MS = 10_000;

type FetchGreenhouseJobsOptions = {
  includeContent?: boolean;
};

async function fetchGreenhouseJson<T>(
  path: string,
  parse: (data: unknown) => T,
  revalidate: number,
): Promise<T> {
  const controller = new AbortController();
  const timeout = setTimeout(
    () => controller.abort(),
    GREENHOUSE_FETCH_TIMEOUT_MS,
  );

  try {
    const response = await fetch(`${GREENHOUSE_BASE_URL}${path}`, {
      next: { revalidate },
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`Greenhouse request failed with ${response.status}`);
    }

    return parse(await response.json());
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "name" in error &&
      error.name === "AbortError"
    ) {
      throw new Error("Greenhouse request timed out");
    }

    throw error;
  } finally {
    clearTimeout(timeout);
  }
}

function encodeBoardToken(boardToken: string) {
  return encodeURIComponent(boardToken);
}

export async function fetchGreenhouseDepartments(
  boardToken: string,
): Promise<GreenhouseDepartmentsResponse> {
  const encodedBoardToken = encodeBoardToken(boardToken);

  return fetchGreenhouseJson(
    `/${encodedBoardToken}/departments`,
    (data) => greenhouseDepartmentsResponseSchema.parse(data),
    GREENHOUSE_DEPARTMENTS_REVALIDATE_SECONDS,
  );
}

export async function fetchGreenhouseJobs(
  boardToken: string,
  { includeContent = false }: FetchGreenhouseJobsOptions = {},
): Promise<GreenhouseJobsResponse> {
  const encodedBoardToken = encodeBoardToken(boardToken);
  const searchParams = new URLSearchParams();

  if (includeContent) {
    searchParams.set("content", "true");
  }

  const query = searchParams.size > 0 ? `?${searchParams.toString()}` : "";

  return fetchGreenhouseJson(
    `/${encodedBoardToken}/jobs${query}`,
    (data) => greenhouseJobsResponseSchema.parse(data),
    GREENHOUSE_JOBS_REVALIDATE_SECONDS,
  );
}
