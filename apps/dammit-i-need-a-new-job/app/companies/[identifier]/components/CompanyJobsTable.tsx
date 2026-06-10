"use client";

import { Card } from "@kavita-likes-fajitas/shadcn-ui-lib/components/ui/card";
import {
  CompanyJobsTableProvider,
  useCompanyJobsTableContext,
} from "../context";
import type { CompanyJobsTableProps } from "../types";
import { CompanyJobListing } from "./CompanyJobListing";
import { FilterSection } from "./FilterSection";

export function CompanyJobsTable({
  jobs,
  departmentOptions,
}: CompanyJobsTableProps) {
  return (
    <CompanyJobsTableProvider jobs={jobs} departmentOptions={departmentOptions}>
      <CompanyJobsTableContent />
    </CompanyJobsTableProvider>
  );
}

function CompanyJobsTableContent() {
  const { filteredRows } = useCompanyJobsTableContext();

  return (
    <div className="grid gap-6 lg:grid-cols-[18rem_1fr]">
      <aside className="flex flex-col gap-4">
        <FilterSection />

        <Card className="rounded-lg border border-orange-1000 bg-neutral-910/80 px-5 py-5">
          <h2 className="text-lg font-bold uppercase tracking-tighter text-orange-1000">
            Cat Tip
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-foreground-900">
            Start with team filters before searching job text. Less hay, fewer
            needles.
          </p>
        </Card>
      </aside>

      <section className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="text-sm text-cream-800">
            {filteredRows.length} jobs found
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {filteredRows.map((row) => {
            const job = row.original;
            return <CompanyJobListing key={job.id} job={job} />;
          })}
        </div>
      </section>
    </div>
  );
}
