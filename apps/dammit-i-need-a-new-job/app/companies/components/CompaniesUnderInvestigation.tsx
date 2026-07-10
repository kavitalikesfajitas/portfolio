import { CompanyJobListingRow } from "@/app/components/CompanyJobListingRow";
import Link from "next/link";
import { COMPANY_BOARDS } from "../companyBoards";
import { getCompanyRow } from "./CompanyRow";

export async function CompaniesUnderInvestigation() {
  const companies = (
    await Promise.allSettled(
      COMPANY_BOARDS.map((board) => getCompanyRow(board)),
    )
  ).flatMap((result) =>
    result.status === "fulfilled" && result.value ? [result.value] : [],
  );

  return (
    <section className="flex w-full flex-col gap-6 font-overpass-mono">
      <div>
        <h1 className="mb-2 text-xl font-bold uppercase tracking-tighter text-cream-1000 sm:mb-3 sm:text-2xl">
          Companies Under Investigation
        </h1>
        <p className="max-w-4xl text-sm leading-relaxed text-foreground-900 sm:text-base">
          Finding companies with active engineering hiring.
        </p>
        <Link
          href="/learn-more/decisions/job-api"
          className="mt-2 inline-block text-xs font-bold text-orange-1000 underline-offset-4 hover:underline sm:text-sm"
        >
          Why these companies? Read the decisions -&gt;
        </Link>
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
