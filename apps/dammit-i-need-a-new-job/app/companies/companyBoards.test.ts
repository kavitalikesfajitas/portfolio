import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import logoManifest from "@/public/images/logos/manifest.json";
import { COMPANY_BOARD_TOKENS } from "./companyBoards";

const publicDir = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
  "..",
  "public",
);
const logos = logoManifest as Record<string, string>;

describe("company logos", () => {
  it.each(COMPANY_BOARD_TOKENS)(
    "has a logo entry in the manifest for %s",
    (token) => {
      expect(logos[token]).toBeTruthy();
    },
  );

  it.each(COMPANY_BOARD_TOKENS)(
    "points %s at a logo file that exists on disk",
    (token) => {
      const logoPath = logos[token];
      expect(logoPath).toBeTruthy();
      // Manifest paths are public-root-relative (e.g. /images/logos/vercel.png).
      expect(existsSync(path.join(publicDir, logoPath as string))).toBe(true);
    },
  );
});
