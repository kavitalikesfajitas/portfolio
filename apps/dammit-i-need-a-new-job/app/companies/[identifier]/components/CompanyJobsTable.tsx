"use client";

import { Button } from "@kavita-likes-fajitas/shadcn-ui-lib/components/ui/button";
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
  const {
    filteredRows,
    visibleRows,
    hiddenRowCount,
    hasMoreRows,
    showMoreRows,
  } = useCompanyJobsTableContext();

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
          {visibleRows.map((row) => {
            const job = row.original;
            return <CompanyJobListing key={job.id} job={job} />;
          })}
        </div>

        {hasMoreRows ? (
          <div className="flex flex-col items-center gap-3 rounded-lg border border-divider-1000 bg-neutral-910/50 px-5 py-5 text-center">
            <div className="text-sm text-cream-800">
              Showing {visibleRows.length} of {filteredRows.length} jobs.
            </div>
            <Button
              type="button"
              onClick={showMoreRows}
              className="h-10 rounded-md border border-orange-1000 bg-transparent px-6 font-overpass-mono text-sm font-bold text-orange-1000 hover:bg-orange-1000 hover:text-neutral-950"
            >
              Load {Math.min(25, hiddenRowCount)} more
            </Button>
          </div>
        ) : null}
      </section>
    </div>
  );
}
