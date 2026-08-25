import { ashbyJobsResponseSchema, type AshbyJobsResponse } from "./schema";

const ASHBY_BASE_URL = "https://api.ashbyhq.com/posting-api/job-board";
export const ASHBY_JOBS_REVALIDATE_SECONDS = 900;
export const ASHBY_DEPARTMENTS_REVALIDATE_SECONDS = 86_400;
const ASHBY_FETCH_TIMEOUT_MS = 10_000;

async function fetchAshbyJson<T>(
  path: string,
  parse: (data: unknown) => T,
  revalidate: number,
): Promise<T> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), ASHBY_FETCH_TIMEOUT_MS);

  try {
    const response = await fetch(`${ASHBY_BASE_URL}${path}`, {
      next: { revalidate },
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`Ashby request failed with ${response.status}`);
    }

    return parse(await response.json());
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "name" in error &&
      error.name === "AbortError"
    ) {
      throw new Error("Ashby request timed out");
    }

    throw error;
  } finally {
    clearTimeout(timeout);
  }
}

function encodeBoardName(boardName: string) {
  return encodeURIComponent(boardName);
}

export async function fetchAshbyJobs(
  boardName: string,
): Promise<AshbyJobsResponse> {
  const encodedBoardName = encodeBoardName(boardName);

  return fetchAshbyJson(
    `/${encodedBoardName}`,
    (data) => ashbyJobsResponseSchema.parse(data),
    ASHBY_JOBS_REVALIDATE_SECONDS,
  );
}
