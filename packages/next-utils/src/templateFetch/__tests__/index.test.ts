import { afterEach, describe, expect, it, vi } from "vitest";
import { TemplateFetchError, templateFetch } from "..";

describe("templateFetch", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns parsed JSON and forwards Next cache options", async () => {
    const payload = { title: "Senior Chaos Coordinator" };
    const fetchMock = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValue(new Response(JSON.stringify(payload)));

    await expect(
      templateFetch<typeof payload>("https://example.com/jobs", {
        next: {
          revalidate: 300,
          tags: ["jobs"],
        },
      }),
    ).resolves.toEqual(payload);

    expect(fetchMock).toHaveBeenCalledWith("https://example.com/jobs", {
      next: {
        revalidate: 300,
        tags: ["jobs"],
      },
    });
  });

  it("forwards standard fetch options", async () => {
    const fetchMock = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValue(new Response(JSON.stringify({ ok: true })));

    await templateFetch("https://example.com/jobs", {
      headers: {
        authorization: "Bearer token",
      },
      method: "POST",
      next: {
        tags: ["jobs"],
      },
    });

    expect(fetchMock).toHaveBeenCalledWith("https://example.com/jobs", {
      headers: {
        authorization: "Bearer token",
      },
      method: "POST",
      next: {
        tags: ["jobs"],
      },
    });
  });

  it("throws a TemplateFetchError for non-ok responses", async () => {
    const response = new Response(JSON.stringify({ error: "Nope" }), {
      status: 404,
      statusText: "Not Found",
    });
    vi.spyOn(globalThis, "fetch").mockResolvedValue(response);

    await expect(templateFetch("https://example.com/missing")).rejects.toThrow(
      TemplateFetchError,
    );

    await expect(
      templateFetch("https://example.com/missing"),
    ).rejects.toMatchObject({
      message: "Fetch failed: 404 Not Found",
      response,
    });
  });
});
