/**
 * Downloads a logo for every company in COMPANY_BOARD_TOKENS into
 * public/images/logos/ and writes a manifest.json mapping each board token to
 * its public path.
 *
 * A company that already has a logo on disk is left alone — only companies
 * without one are fetched. Pass `--force` (or call with `{ force: true }`) to
 * re-download every logo.
 *
 * Runs two ways:
 *   - `node scripts/fetch-company-logos.ts [--force]` (CLI) for a manual run.
 *   - `next.config.ts` starts the CLI during a production build if any curated
 *     company is missing a logo, which fails the build if the list still ends
 *     up incomplete.
 *
 * Logos come from public favicon/logo services (no API key). Sources are tried
 * in order and the first real image wins, so a single flaky service can't break
 * the run. If every source is unreachable but a logo already exists on disk
 * from a previous run, that one is kept rather than failing.
 */
import { mkdir, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { COMPANY_BOARD_TOKENS } from "../app/companies/companyBoards.ts";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const defaultOutputDir = path.join(
  scriptDir,
  "..",
  "public",
  "images",
  "logos",
);
const defaultPublicPrefix = "/images/logos";
const manifestFileName = "manifest.json";
const LOGO_FETCH_TIMEOUT_MS = 5_000;

// Greenhouse board tokens usually match the company's primary domain. Add an
// entry here for any token that doesn't.
const DOMAIN_OVERRIDES: Record<string, string> = {};

function domainFor(token: string) {
  return DOMAIN_OVERRIDES[token] ?? `${token}.com`;
}

// Tried in order; the first source returning a real image wins. PNG-returning
// services come first so output stays uniform; DuckDuckGo is the high-res .ico
// backstop because it answers for essentially every domain.
function sourcesFor(domain: string) {
  const site = encodeURIComponent(`https://${domain}`);
  return [
    `https://icon.horse/icon/${domain}`,
    `https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${site}&size=128`,
    `https://icons.duckduckgo.com/ip3/${domain}.ico`,
  ];
}

const EXTENSION_BY_TYPE: Record<string, string> = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/svg+xml": "svg",
  "image/webp": "webp",
  "image/x-icon": "ico",
  "image/vnd.microsoft.icon": "ico",
};

export type LogoResult = {
  token: string;
  domain: string;
  ok: boolean;
  path?: string;
  source?: string;
  bytes?: number;
};

type FetchCompanyLogosOptions = {
  force?: boolean;
  tokens?: readonly string[];
  outputDirectory?: string;
  publicPathPrefix?: string;
  fetchImpl?: typeof fetch;
  sourcesForDomain?: typeof sourcesFor;
};

async function fetchLogo(
  domain: string,
  {
    fetchImpl,
    sourcesForDomain,
  }: {
    fetchImpl: typeof fetch;
    sourcesForDomain: typeof sourcesFor;
  },
) {
  for (const url of sourcesForDomain(domain)) {
    try {
      const response = await fetchImpl(url, {
        redirect: "follow",
        signal: AbortSignal.timeout(LOGO_FETCH_TIMEOUT_MS),
      });
      const contentType =
        (response.headers.get("content-type") ?? "").split(";")[0]?.trim() ??
        "";
      const extension = EXTENSION_BY_TYPE[contentType];

      if (!response.ok || !extension) {
        continue;
      }

      const bytes = Buffer.from(await response.arrayBuffer());

      // Reject error payloads dressed up as images and 1x1 tracking pixels.
      if (bytes.byteLength < 100) {
        continue;
      }

      return { bytes, extension, source: new URL(url).host };
    } catch {
      // Network hiccup on this source — fall through to the next one.
    }
  }

  return null;
}

async function readExistingLogos(outputDirectory: string) {
  const byToken = new Map<string, string>();

  try {
    for (const entry of await readdir(outputDirectory)) {
      if (entry === manifestFileName) {
        continue;
      }
      byToken.set(entry.replace(/\.[^.]+$/, ""), entry);
    }
  } catch {
    // Directory doesn't exist yet — nothing to reuse.
  }

  return byToken;
}

export async function fetchCompanyLogos({
  force = false,
  tokens = COMPANY_BOARD_TOKENS,
  outputDirectory = defaultOutputDir,
  publicPathPrefix = defaultPublicPrefix,
  fetchImpl = fetch,
  sourcesForDomain = sourcesFor,
}: FetchCompanyLogosOptions = {}): Promise<LogoResult[]> {
  await mkdir(outputDirectory, { recursive: true });
  const existing = await readExistingLogos(outputDirectory);

  const results = await Promise.all(
    tokens.map(async (token): Promise<LogoResult> => {
      const domain = domainFor(token);
      const priorFile = existing.get(token);

      // Already have it on disk — keep it, no network call (unless --force).
      if (priorFile && !force) {
        return {
          token,
          domain,
          ok: true,
          path: `${publicPathPrefix}/${priorFile}`,
          source: "existing",
        };
      }

      const logo = await fetchLogo(domain, { fetchImpl, sourcesForDomain });

      if (logo) {
        const fileName = `${token}.${logo.extension}`;
        await writeFile(path.join(outputDirectory, fileName), logo.bytes);
        return {
          token,
          domain,
          ok: true,
          path: `${publicPathPrefix}/${fileName}`,
          source: logo.source,
          bytes: logo.bytes.byteLength,
        };
      }

      // Fetch failed — fall back to a logo from a previous run if we have one.
      if (priorFile) {
        return {
          token,
          domain,
          ok: true,
          path: `${publicPathPrefix}/${priorFile}`,
          source: "existing",
        };
      }

      return { token, domain, ok: false };
    }),
  );

  const manifest = Object.fromEntries(
    results
      .filter((result) => result.ok && result.path)
      .map((result) => [result.token, result.path]),
  );
  await writeFile(
    path.join(outputDirectory, manifestFileName),
    `${JSON.stringify(manifest, null, 2)}\n`,
  );

  return results;
}

function reportAndExit(results: LogoResult[]) {
  for (const result of results) {
    if (!result.ok) {
      console.warn(
        `✗ ${result.token.padEnd(10)} no logo found for ${result.domain}`,
      );
      continue;
    }

    const detail =
      result.source === "existing"
        ? "kept existing"
        : `${((result.bytes ?? 0) / 1024).toFixed(1)}kb  ${result.source}`;
    console.log(`✓ ${result.token.padEnd(10)} ${detail}`);
  }

  const missing = results.filter((result) => !result.ok).map((r) => r.token);
  if (missing.length > 0) {
    console.error(`\nMissing logos for: ${missing.join(", ")}`);
    process.exitCode = 1;
  }
}

// Run as a CLI (`node scripts/fetch-company-logos.ts`) but stay importable.
const invokedDirectly =
  process.argv[1] !== undefined &&
  import.meta.url === pathToFileURL(process.argv[1]).href;

if (invokedDirectly) {
  const force = process.argv
    .slice(2)
    .some((arg) => arg === "--force" || arg === "-f");
  reportAndExit(await fetchCompanyLogos({ force }));
}
