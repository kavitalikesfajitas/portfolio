"use client";

import { Button } from "@kavita-likes-fajitas/shadcn-ui-lib/components/ui/button";
import { Card } from "@kavita-likes-fajitas/shadcn-ui-lib/components/ui/card";
import { useCompanyJobsTableContext } from "../context";

export function FilterSection() {
  const {
    globalFilter,
    setGlobalFilter,
    selectedDepartments,
    toggleDepartment,
    clearFilters,
    departmentOptions,
  } = useCompanyJobsTableContext();

  return (
    <Card className="rounded-lg border border-divider-1000 bg-neutral-910/80 px-5 py-5">
      <h2 className="text-lg font-bold uppercase tracking-tighter text-orange-1000">
        Filters
      </h2>

      <label className="mt-4 flex flex-col gap-3 text-sm text-cream-1000">
        <span>Search jobs</span>
        <input
          value={globalFilter}
          onChange={(event) => setGlobalFilter(event.target.value)}
          placeholder="Search by title, keyword..."
          className="h-10 rounded-md border border-divider-1000 bg-neutral-950 px-3 text-sm text-cream-1000 outline-none transition-colors placeholder:text-foreground-900 focus:border-orange-1000"
        />
      </label>

      <div className="mt-6">
        <h3 className="mb-3 text-sm font-bold text-orange-1000">Team</h3>
        <div className="flex flex-col gap-3">
          {departmentOptions.map((option) => (
            <label
              key={option.name}
              className="flex items-center gap-3 text-sm text-cream-800"
            >
              <input
                type="checkbox"
                checked={selectedDepartments.includes(option.name)}
                onChange={() => toggleDepartment(option.name)}
                className="size-4 accent-orange-1000"
              />
              <span>
                {option.name} ({option.count})
              </span>
            </label>
          ))}
        </div>
      </div>

      <Button
        onClick={clearFilters}
        className="mt-6 h-10 rounded-md border border-divider-1000 bg-transparent font-overpass-mono text-sm text-cream-800 hover:bg-orange-1000 hover:text-neutral-950"
      >
        Clear all filters
      </Button>
    </Card>
  );
}
