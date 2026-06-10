import Link from "next/link";
import {
  fetchGreenhouseDepartments,
  fetchGreenhouseJobs,
} from "@/lib/jobs/providers/greenhouse/client";
import { COMPANY_BOARD_TOKENS } from "../companyBoards";
import { formatCompanyName } from "../utils";

import { CompanyJobsTable } from "./components/CompanyJobsTable";
import { buildCompanyJobsView } from "./utils";

type CompanyPageProps = {
  params: Promise<{ identifier: string }>;
};

export const dynamicParams = false;
export const revalidate = 900;

export function generateStaticParams() {
  return COMPANY_BOARD_TOKENS.map((identifier) => ({ identifier }));
}

export default async function CompanyPage({ params }: CompanyPageProps) {
  const { identifier } = await params;

  const [departmentsResponse, jobsResponse] = await Promise.all([
    fetchGreenhouseDepartments(identifier),
    fetchGreenhouseJobs(identifier, { includeContent: true }),
  ]);
  const { jobs, departmentOptions, totalEngineeringJobs } =
    buildCompanyJobsView(departmentsResponse.departments, jobsResponse.jobs);

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-neutral-950 text-cream-1000">
      <main className="flex w-full md:max-w-7xl flex-col gap-6 font-overpass-mono px-10 py-10">
        <section className="rounded-lg border border-divider-1000 bg-neutral-910/80 p-6">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-4xl font-extrabold text-cream-1000">
                  {formatCompanyName(identifier)}
                </h1>
                <span className="size-2 rounded-full bg-green-500" />
              </div>
              <p className="mt-2 text-sm text-foreground-900">
                {totalEngineeringJobs} engineering jobs across{" "}
                {departmentOptions.length} teams.
              </p>
            </div>
            <Link
              href="/companies"
              className="rounded-md border border-orange-1000 px-5 py-3 text-sm font-bold text-orange-1000 transition-colors hover:bg-orange-1000 hover:text-neutral-950"
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
