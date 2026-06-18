import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterEach, describe, expect, test, vi } from "vitest";
import { fetchCompanyLogos } from "./fetch-company-logos.ts";

const tempDirs: string[] = [];

async function makeTempLogoDir() {
  const dir = await mkdtemp(path.join(tmpdir(), "dammit-logos-"));
  tempDirs.push(dir);
  return dir;
}

function imageResponse(contentType = "image/png") {
  return {
    ok: true,
    headers: {
      get: (name: string) => (name === "content-type" ? contentType : null),
    },
    arrayBuffer: async () => new Uint8Array(128).buffer,
  } as Response;
}

describe("fetchCompanyLogos", () => {
  afterEach(async () => {
    vi.restoreAllMocks();
    await Promise.all(
      tempDirs
        .splice(0)
        .map((dir) => rm(dir, { recursive: true, force: true })),
    );
  });

  test("falls back to an existing logo when fetching fails", async () => {
    const outputDirectory = await makeTempLogoDir();
    await writeFile(path.join(outputDirectory, "stripe.png"), "existing");
    const fetchImpl = vi
      .fn<typeof fetch>()
      .mockRejectedValue(new Error("nope"));

    const results = await fetchCompanyLogos({
      tokens: ["stripe"],
      outputDirectory,
      fetchImpl,
      sourcesForDomain: (domain: string) => [`https://logos.example/${domain}`],
    });

    expect(fetchImpl).toHaveBeenCalledOnce();
    expect(results).toEqual([
      {
        token: "stripe",
        domain: "stripe.com",
        ok: true,
        path: "/images/logos/stripe.png",
        source: "existing",
      },
    ]);
    await expect(
      readFile(path.join(outputDirectory, "manifest.json"), "utf8"),
    ).resolves.toBe('{\n  "stripe": "/images/logos/stripe.png"\n}\n');
  });

  test("downloads a logo and writes the manifest", async () => {
    const outputDirectory = await makeTempLogoDir();
    await writeFile(path.join(outputDirectory, "stripe.png"), "existing");
    const fetchImpl = vi.fn<typeof fetch>().mockResolvedValue(imageResponse());

    const results = await fetchCompanyLogos({
      tokens: ["stripe"],
      outputDirectory,
      fetchImpl,
      sourcesForDomain: (domain: string) => [`https://logos.example/${domain}`],
    });

    expect(fetchImpl).toHaveBeenCalledOnce();
    expect(results).toEqual([
      {
        token: "stripe",
        domain: "stripe.com",
        ok: true,
        path: "/images/logos/stripe.png",
        source: "logos.example",
        bytes: 128,
      },
    ]);
    await expect(
      readFile(path.join(outputDirectory, "manifest.json"), "utf8"),
    ).resolves.toBe('{\n  "stripe": "/images/logos/stripe.png"\n}\n');
  });
});
