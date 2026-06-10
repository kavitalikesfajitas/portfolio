import { CompanyJobListingRow } from "@/app/components/CompanyJobListingRow";
import { COMPANY_BOARD_TOKENS } from "../companyBoards";
import { getCompanyRow } from "./CompanyRow";

export async function CompaniesUnderInvestigation() {
  const companies = (
    await Promise.allSettled(
      COMPANY_BOARD_TOKENS.map((token) => getCompanyRow(token)),
    )
  ).flatMap((result) =>
    result.status === "fulfilled" && result.value ? [result.value] : [],
  );

  return (
    <section className="flex w-full flex-col gap-6 font-overpass-mono">
      <div>
        <h1 className="mb-3 text-2xl font-bold uppercase tracking-tighter text-cream-1000">
          Companies Under Investigation
        </h1>
        <p className="max-w-4xl text-base leading-relaxed text-foreground-900">
          Finding companies with active engineering hiring.
        </p>
      </div>

      {companies.length > 0 ? (
        companies.map((company) => (
          <CompanyJobListingRow key={company.href} {...company} />
        ))
      ) : (
        <div className="rounded-lg border border-divider-1000 bg-neutral-910/80 px-5 py-4 text-sm text-foreground-900">
          Greenhouse is being dramatic. Try again in a bit.
        </div>
      )}
    </section>
  );
}
