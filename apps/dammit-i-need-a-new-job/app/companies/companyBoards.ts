export type CompanyBoardProvider = "ashby" | "greenhouse";

export type CompanyBoard = {
  slug: string;
  provider: CompanyBoardProvider;
  identifier: string;
  name: string;
  logoDomain: string;
};

function normalizeBoardSlug(value: string) {
  return value.trim().toLowerCase();
}

function formatCompanyName(slug: string) {
  return slug.charAt(0).toUpperCase() + slug.slice(1);
}

function companyBoard(
  provider: CompanyBoardProvider,
  slug: string,
  options: Partial<
    Pick<CompanyBoard, "identifier" | "logoDomain" | "name">
  > = {},
): CompanyBoard {
  const normalizedSlug = normalizeBoardSlug(slug);
  const identifier = normalizeBoardSlug(options.identifier ?? slug);

  return {
    slug: normalizedSlug,
    provider,
    identifier,
    name: options.name ?? formatCompanyName(normalizedSlug),
    logoDomain: options.logoDomain ?? `${normalizedSlug}.com`,
  };
}

function greenhouseBoard(
  slug: string,
  options?: Partial<Pick<CompanyBoard, "identifier" | "logoDomain" | "name">>,
) {
  return companyBoard("greenhouse", slug, options);
}

function ashbyBoard(
  slug: string,
  options?: Partial<Pick<CompanyBoard, "identifier" | "logoDomain" | "name">>,
) {
  return companyBoard("ashby", slug, options);
}

// Keyed by slug so lookups are O(1) and the slug can't drift from its entry.
// Enumeration is derived below (COMPANY_BOARD_LIST / COMPANY_BOARD_TOKENS).
export const COMPANY_BOARDS = {
  vercel: greenhouseBoard("vercel"),
  stripe: greenhouseBoard("stripe"),
  discord: greenhouseBoard("discord"),
  figma: greenhouseBoard("figma"),
  datadog: greenhouseBoard("datadog"),
  affirm: greenhouseBoard("affirm"),
  ashby: ashbyBoard("ashby", { logoDomain: "ashbyhq.com" }),
} as const satisfies Record<string, CompanyBoard>;

export type CompanyBoardSlug = keyof typeof COMPANY_BOARDS;

export const COMPANY_BOARD_LIST = Object.values(COMPANY_BOARDS);
export const COMPANY_BOARD_TOKENS = Object.keys(COMPANY_BOARDS);

export function getCompanyBoard(slug: string) {
  return COMPANY_BOARDS[normalizeBoardSlug(slug) as CompanyBoardSlug] ?? null;
}
