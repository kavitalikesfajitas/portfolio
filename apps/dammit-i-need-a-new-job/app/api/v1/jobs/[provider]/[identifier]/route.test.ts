import { NextRequest } from "next/server";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { API_KEY_HEADER } from "@/lib/auth/api-key";
import { fetchGreenhouseJobs } from "@/lib/jobs/providers/greenhouse/client";
import { GET } from "./route";

vi.mock("@/lib/jobs/providers/greenhouse/client", () => ({
  GREENHOUSE_JOBS_REVALIDATE_SECONDS: 900,
  fetchGreenhouseJobs: vi.fn(),
}));

const VALID_KEY = "super-secret-key";

function createRequest(key?: string) {
  const headers = new Headers();

  if (key) {
    headers.set(API_KEY_HEADER, key);
  }

  return new NextRequest(
    "https://example.com/api/v1/jobs/greenhouse/vercel?term=engineer",
    { headers },
  );
}

describe("jobs route", () => {
  const originalKey = process.env.JOBS_API_KEY;
  const mockedFetchGreenhouseJobs = vi.mocked(fetchGreenhouseJobs);

  beforeEach(() => {
    process.env.JOBS_API_KEY = VALID_KEY;
    mockedFetchGreenhouseJobs.mockReset();
  });

  afterEach(() => {
    process.env.JOBS_API_KEY = originalKey;
  });

  it("rejects requests without the jobs API key before fetching Greenhouse", async () => {
    const response = await GET(createRequest(), {
      params: Promise.resolve({ provider: "greenhouse", identifier: "vercel" }),
    });

    expect(response.status).toBe(401);
    expect(mockedFetchGreenhouseJobs).not.toHaveBeenCalled();
  });

  it("allows matching API keys and keeps the upstream jobs fetch cached", async () => {
    mockedFetchGreenhouseJobs.mockResolvedValue({
      jobs: [],
      meta: { total: 0 },
    });

    const response = await GET(createRequest(VALID_KEY), {
      params: Promise.resolve({ provider: "greenhouse", identifier: "vercel" }),
    });

    await expect(response.json()).resolves.toMatchObject({
      resource: "jobs",
      jobs: [],
      meta: { cache: { revalidate: 900 } },
    });
    expect(response.status).toBe(200);
    expect(mockedFetchGreenhouseJobs).toHaveBeenCalledWith("vercel", {
      includeContent: false,
    });
  });
});
