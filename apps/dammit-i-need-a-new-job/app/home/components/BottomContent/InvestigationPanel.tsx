import { getCompanyRow } from "@/app/companies/components/CompanyRow";
import { DividedPanel } from "@kavita-likes-fajitas/ui-library";
import { InvestigationCard } from "./InvestigationCard";

const FEATURED_COMPANIES = ["vercel", "stripe", "discord", "figma"] as const;

export async function InvestigationPanel() {
  const investigations = (
    await Promise.all(
      FEATURED_COMPANIES.map(async (token) => {
        const company = await getCompanyRow(token);
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
    <DividedPanel contentClassName="sm:grid-cols-2 lg:grid-cols-4">
      {investigations.map((investigation) => (
        <InvestigationCard key={investigation.name} {...investigation} />
      ))}
    </DividedPanel>
  );
}
