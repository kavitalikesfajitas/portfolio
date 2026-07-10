import { beforeEach, describe, expect, it, vi } from "vitest";
import { fetchAshbyJobs } from "@/lib/jobs/providers/ashby/client";
import { fetchGreenhouseDepartments } from "@/lib/jobs/providers/greenhouse/client";
import { dynamic, GET, revalidate } from "./route";

vi.mock("@/lib/jobs/providers/ashby/client", () => ({
  ASHBY_DEPARTMENTS_REVALIDATE_SECONDS: 86_400,
  fetchAshbyJobs: vi.fn(),
}));

vi.mock("@/lib/jobs/providers/greenhouse/client", () => ({
  GREENHOUSE_DEPARTMENTS_REVALIDATE_SECONDS: 86_400,
  fetchGreenhouseDepartments: vi.fn(),
}));

describe("departments route", () => {
  const mockedFetchAshbyJobs = vi.mocked(fetchAshbyJobs);
  const mockedFetchGreenhouseDepartments = vi.mocked(
    fetchGreenhouseDepartments,
  );

  beforeEach(() => {
    mockedFetchAshbyJobs.mockReset();
    mockedFetchGreenhouseDepartments.mockReset();
  });

  it("force-statics the route so each board is prerendered/ISR-cached", () => {
    expect(dynamic).toBe("force-static");
  });

  it("revalidates the route on the same cadence as the departments fetch", () => {
    expect(revalidate).toBe(86_400);
  });

  it("delegates response caching headers to Next (no hand-rolled Cache-Control)", async () => {
    mockedFetchGreenhouseDepartments.mockResolvedValue({
      departments: [],
    });

    const response = await GET(
      new Request("https://example.com/api/v1/departments/greenhouse/vercel"),
      {
        params: Promise.resolve({
          provider: "greenhouse",
          identifier: "vercel",
        }),
      },
    );

    await expect(response.json()).resolves.toMatchObject({
      resource: "departments",
      departments: [],
      meta: { cache: { revalidate: 86_400 } },
    });
    expect(response.status).toBe(200);
    // With force-static, Next emits s-maxage/stale-while-revalidate based on
    // `revalidate` at build/runtime, so the handler no longer sets one itself.
    expect(response.headers.get("Cache-Control")).toBeNull();
    expect(mockedFetchGreenhouseDepartments).toHaveBeenCalledWith("vercel");
  });

  it("synthesizes departments from Ashby jobs", async () => {
    mockedFetchAshbyJobs.mockResolvedValue({
      jobs: [
        {
          id: "job_123",
          title: "Product Engineer",
          team: "Engineering",
          location: "Remote",
          publishedDate: "2026-06-01T00:00:00.000Z",
          jobUrl: "https://jobs.ashbyhq.com/acme/job_123",
        },
      ],
    });

    const response = await GET(
      new Request("https://example.com/api/v1/departments/ashby/acme"),
      {
        params: Promise.resolve({
          provider: "ashby",
          identifier: "acme",
        }),
      },
    );

    await expect(response.json()).resolves.toMatchObject({
      provider: "ashby",
      identifier: "acme",
      departments: [
        {
          name: "Engineering",
          jobCount: 1,
        },
      ],
    });
    expect(response.status).toBe(200);
    expect(mockedFetchAshbyJobs).toHaveBeenCalledWith("acme");
    expect(mockedFetchGreenhouseDepartments).not.toHaveBeenCalled();
  });
});
