import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import logoManifest from "@/public/images/logos/manifest.json";
import { COMPANY_BOARD_LIST, getCompanyBoard } from "./companyBoards";

const publicDir = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
  "..",
  "public",
);
const logos = logoManifest as Record<string, string>;
const boardsWithLogos = COMPANY_BOARD_LIST.filter(
  (board) => board.provider === "greenhouse",
);

describe("company logos", () => {
  it("resolves company route slugs case-insensitively", () => {
    expect(getCompanyBoard("ASHBY")).toMatchObject({
      slug: "ashby",
      provider: "ashby",
      identifier: "ashby",
      name: "Ashby",
      websiteUrl: "https://www.ashbyhq.com",
    });
  });

  it.each(boardsWithLogos)(
    "has a logo entry in the manifest for $slug",
    (board) => {
      expect(logos[board.slug]).toBeTruthy();
    },
  );

  it.each(boardsWithLogos)(
    "points $slug at a logo file that exists on disk",
    (board) => {
      const logoPath = logos[board.slug];
      expect(logoPath).toBeTruthy();
      // Manifest paths are public-root-relative (e.g. /images/logos/vercel.png).
      expect(existsSync(path.join(publicDir, logoPath as string))).toBe(true);
    },
  );
});
