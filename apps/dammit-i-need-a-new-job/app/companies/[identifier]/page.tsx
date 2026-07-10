import Link from "next/link";
import { notFound } from "next/navigation";
import { JOB_PROVIDERS } from "@/lib/jobs/providers";
import { COMPANY_BOARDS, getCompanyBoard } from "../companyBoards";

import { CompanyJobsTable } from "./components/CompanyJobsTable";
import { buildCompanyJobsView } from "./utils";

type CompanyPageProps = {
  params: Promise<{ identifier: string }>;
};

export const dynamicParams = false;
export const revalidate = 900;

export function generateStaticParams() {
  return COMPANY_BOARDS.map((board) => ({ identifier: board.slug }));
}

export default async function CompanyPage({ params }: CompanyPageProps) {
  const { identifier } = await params;
  const board = getCompanyBoard(identifier);

  if (!board) {
    notFound();
  }

  const { departments } = await JOB_PROVIDERS[board.provider].fetchDepartments(
    board.identifier,
  );
  const { jobs, departmentOptions, totalEngineeringJobs } =
    buildCompanyJobsView(departments);

  return (
    <div className="flex flex-col flex-1 items-center justify-start bg-neutral-950 text-cream-1000">
      <main className="flex w-full flex-col gap-4 px-5 py-6 font-overpass-mono md:max-w-7xl md:gap-6 md:px-10 md:py-10">
        <section className="rounded-lg border border-divider-1000 bg-neutral-910/80 p-4 md:p-6">
          <div className="flex flex-wrap items-start justify-between gap-4 md:gap-6">
            <div>
              <div className="flex items-center gap-2 md:gap-3">
                <h1 className="text-2xl font-extrabold text-cream-1000 md:text-4xl">
                  {board.name}
                </h1>
                <span className="size-1.5 rounded-full bg-green-500 md:size-2" />
              </div>
              <p className="mt-2 text-xs leading-relaxed text-foreground-900 md:text-sm">
                {totalEngineeringJobs} engineering jobs across{" "}
                {departmentOptions.length} teams.
              </p>
            </div>
            <Link
              href="/companies"
              className="rounded-md border border-orange-1000 px-4 py-2 text-xs font-bold text-orange-1000 transition-colors hover:bg-orange-1000 hover:text-neutral-950 md:px-5 md:py-3 md:text-sm"
            >
              Back to companies -&gt;
            </Link>
          </div>
        </section>

        <CompanyJobsTable jobs={jobs} departmentOptions={departmentOptions} />
      </main>
    </div>
  );
}
