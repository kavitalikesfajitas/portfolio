import { describe, expect, it, vi } from "vitest";
import { fetchGreenhouseDepartments } from "@/lib/jobs/providers/greenhouse/client";
import { GET, revalidate } from "./route";

vi.mock("@/lib/jobs/providers/greenhouse/client", () => ({
  GREENHOUSE_DEPARTMENTS_REVALIDATE_SECONDS: 86_400,
  fetchGreenhouseDepartments: vi.fn(),
}));

describe("departments route", () => {
  const mockedFetchGreenhouseDepartments = vi.mocked(
    fetchGreenhouseDepartments,
  );

  it("revalidates the route on the same cadence as the departments fetch", () => {
    expect(revalidate).toBe(86_400);
  });

  it("stays public while using the long-lived departments cache", async () => {
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
    expect(mockedFetchGreenhouseDepartments).toHaveBeenCalledWith("vercel");
  });
});
