import { getCompanyRow } from "@/app/companies/components/CompanyRow";
import { COMPANY_BOARDS } from "@/app/companies/companyBoards";
import { DividedPanel } from "@kavita-likes-fajitas/ui-library";
import { InvestigationCard } from "./InvestigationCard";

const FEATURED_COMPANIES = ["vercel", "stripe", "discord", "figma"] as const;

export async function InvestigationPanel() {
  const featuredBoards = COMPANY_BOARDS.filter((board) =>
    FEATURED_COMPANIES.includes(
      board.slug as (typeof FEATURED_COMPANIES)[number],
    ),
  );
  const investigations = (
    await Promise.all(
      featuredBoards.map(async (board) => {
        const company = await getCompanyRow(board);
        if (!company) return null;
        return {
          name: company.companyName,
          jobCount: company.engineeringJobCount,
          href: company.href,
          logoSrc: company.logoSrc,
        };
      }),
    )
  ).filter((inv) => inv !== null);

  return (
    <DividedPanel contentClassName="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {investigations.map((investigation) => (
        <InvestigationCard key={investigation.name} {...investigation} />
      ))}
    </DividedPanel>
  );
}
