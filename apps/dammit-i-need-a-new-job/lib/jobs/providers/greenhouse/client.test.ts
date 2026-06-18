import { afterEach, describe, expect, it, vi } from "vitest";
import {
  fetchGreenhouseDepartments,
  fetchGreenhouseJobs,
  GREENHOUSE_DEPARTMENTS_REVALIDATE_SECONDS,
  GREENHOUSE_JOBS_REVALIDATE_SECONDS,
} from "./client";

describe("Greenhouse client", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
    vi.useRealTimers();
  });

  it("percent-encodes board tokens before building departments paths", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ departments: [] }), {
        status: 200,
      }),
    );
    vi.stubGlobal("fetch", fetchMock);

    await fetchGreenhouseDepartments("acme/jobs");

    expect(fetchMock).toHaveBeenCalledWith(
      "https://boards-api.greenhouse.io/v1/boards/acme%2Fjobs/departments",
      expect.objectContaining({
        next: { revalidate: GREENHOUSE_DEPARTMENTS_REVALIDATE_SECONDS },
        signal: expect.any(AbortSignal),
      }),
    );
  });

  it("percent-encodes board tokens before building jobs paths", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ jobs: [], meta: { total: 0 } }), {
        status: 200,
      }),
    );
    vi.stubGlobal("fetch", fetchMock);

    await fetchGreenhouseJobs("acme/jobs");

    expect(fetchMock).toHaveBeenCalledWith(
      "https://boards-api.greenhouse.io/v1/boards/acme%2Fjobs/jobs",
      expect.objectContaining({
        next: { revalidate: GREENHOUSE_JOBS_REVALIDATE_SECONDS },
        signal: expect.any(AbortSignal),
      }),
    );
  });

  it("times out slow upstream requests", async () => {
    vi.useFakeTimers();
    vi.stubGlobal(
      "fetch",
      vi.fn((_url: string, init?: RequestInit) => {
        return new Promise((_resolve, reject) => {
          init?.signal?.addEventListener("abort", () => {
            reject(new DOMException("Aborted", "AbortError"));
          });
        });
      }),
    );

    const request = fetchGreenhouseJobs("vercel");
    const assertion = expect(request).rejects.toThrow(
      "Greenhouse request timed out",
    );
    await vi.advanceTimersByTimeAsync(10_000);

    await assertion;
  });
});
