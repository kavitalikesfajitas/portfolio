/**
 * Greenhouse board tokens for the companies we surface under /companies.
 *
 * Each token doubles as the route identifier (/companies/[identifier]), so this
 * is the single source of truth: add a token here and it appears in the listing
 * and — via generateStaticParams — gets a prebuilt static detail page.
 */
export const COMPANY_BOARD_TOKENS = [
  "vercel",
  "stripe",
  "discord",
  "figma",
  "datadog",
] as const;
