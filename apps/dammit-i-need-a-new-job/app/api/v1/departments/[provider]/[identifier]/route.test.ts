import { describe, expect, it, vi } from "vitest";
import { fetchGreenhouseDepartments } from "@/lib/jobs/providers/greenhouse/client";
import { dynamic, GET, revalidate } from "./route";

vi.mock("@/lib/jobs/providers/greenhouse/client", () => ({
  GREENHOUSE_DEPARTMENTS_REVALIDATE_SECONDS: 86_400,
  fetchGreenhouseDepartments: vi.fn(),
}));

describe("departments route", () => {
  const mockedFetchGreenhouseDepartments = vi.mocked(
    fetchGreenhouseDepartments,
  );

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
});
