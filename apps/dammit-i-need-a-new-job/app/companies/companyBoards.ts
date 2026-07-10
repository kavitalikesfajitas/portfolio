export type CompanyBoardProvider = "ashby" | "greenhouse";

export type CompanyBoard = {
  slug: string;
  provider: CompanyBoardProvider;
  identifier: string;
  name: string;
};

function greenhouseBoard(identifier: string): CompanyBoard {
  return {
    slug: identifier,
    provider: "greenhouse",
    identifier,
    name: identifier.charAt(0).toUpperCase() + identifier.slice(1),
  };
}

export const COMPANY_BOARDS = [
  greenhouseBoard("vercel"),
  greenhouseBoard("stripe"),
  greenhouseBoard("discord"),
  greenhouseBoard("figma"),
  greenhouseBoard("datadog"),
  greenhouseBoard("affirm"),
  {
    slug: "ashby",
    provider: "ashby",
    identifier: "ashby",
    name: "Ashby",
  },
] as const satisfies readonly CompanyBoard[];

export const COMPANY_BOARD_TOKENS = COMPANY_BOARDS.map((board) => board.slug);

export function getCompanyBoard(slug: string) {
  return COMPANY_BOARDS.find((board) => board.slug === slug) ?? null;
}
