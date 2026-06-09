"use client";

import {
  type ColumnDef,
  type ColumnFiltersState,
  type FilterFn,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "@kavita-likes-fajitas/shadcn-ui-lib/components/ui/button";
import { Card } from "@kavita-likes-fajitas/shadcn-ui-lib/components/ui/card";
import { useMemo, useState } from "react";

export type CompanyJob = {
  id: string;
  title: string;
  absoluteUrl: string;
  location: string | null;
  departments: string[];
  updatedAt: string;
};

type DepartmentFilterOption = {
  name: string;
  count: number;
};

type CompanyJobsTableProps = {
  jobs: CompanyJob[];
  departmentOptions: DepartmentFilterOption[];
};

const arrayIncludesSome: FilterFn<CompanyJob> = (
  row,
  columnId,
  filterValue,
) => {
  const selectedValues = Array.isArray(filterValue) ? filterValue : [];

  if (selectedValues.length === 0) {
    return true;
  }

  const rowValues = row.getValue<string[]>(columnId);

  return selectedValues.some((value) => rowValues.includes(value));
};

const globalJobSearch: FilterFn<CompanyJob> = (row, _columnId, filterValue) => {
  const query = String(filterValue ?? "")
    .trim()
    .toLowerCase();

  if (!query) {
    return true;
  }

  const job = row.original;

  return [job.title, job.location ?? "", ...job.departments].some((value) =>
    value.toLowerCase().includes(query),
  );
};

function formatUpdatedLabel(updatedAt: string) {
  const updatedTime = new Date(updatedAt).getTime();

  if (Number.isNaN(updatedTime)) {
    return "Updated recently";
  }

  const elapsedDays = Math.max(
    1,
    Math.floor((Date.now() - updatedTime) / 86_400_000),
  );

  return `Updated ${elapsedDays}d ago`;
}

export function CompanyJobsTable({
  jobs,
  departmentOptions,
}: CompanyJobsTableProps) {
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([
    {
      id: "departments",
      value: departmentOptions
        .filter((department) => department.name === "Engineering")
        .map((department) => department.name),
    },
  ]);

  const columns = useMemo<ColumnDef<CompanyJob>[]>(
    () => [
      {
        accessorKey: "title",
        header: "Title",
      },
      {
        accessorKey: "location",
        header: "Location",
      },
      {
        accessorKey: "departments",
        header: "Department",
        filterFn: arrayIncludesSome,
      },
    ],
    [],
  );

  const table = useReactTable({
    data: jobs,
    columns,
    state: {
      columnFilters,
      globalFilter,
    },
    filterFns: {
      arrayIncludesSome,
      globalJobSearch,
    },
    globalFilterFn: globalJobSearch,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const departmentColumn = table.getColumn("departments");
  const selectedDepartments =
    (departmentColumn?.getFilterValue() as string[] | undefined) ?? [];
  const filteredRows = table.getRowModel().rows;

  function toggleDepartment(name: string) {
    const nextDepartments = selectedDepartments.includes(name)
      ? selectedDepartments.filter((department) => department !== name)
      : [...selectedDepartments, name];

    departmentColumn?.setFilterValue(nextDepartments);
  }

  function clearFilters() {
    setGlobalFilter("");
    setColumnFilters([]);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[18rem_1fr]">
      <aside className="flex flex-col gap-4">
        <Card className="rounded-lg border border-border-1000 bg-neutral-910/80 px-5 py-5">
          <h2 className="text-lg font-bold uppercase tracking-tighter text-orange-1000">
            Filters
          </h2>

          <label className="mt-4 flex flex-col gap-3 text-sm text-cream-1000">
            <span>Search jobs</span>
            <input
              value={globalFilter}
              onChange={(event) => setGlobalFilter(event.target.value)}
              placeholder="Search by title, keyword..."
              className="h-10 rounded-md border border-border-1000 bg-neutral-950 px-3 text-sm text-cream-1000 outline-none transition-colors placeholder:text-text-900 focus:border-orange-1000"
            />
          </label>

          <div className="mt-6">
            <h3 className="mb-3 text-sm font-bold text-orange-1000">
              Department
            </h3>
            <div className="flex flex-col gap-3">
              {departmentOptions.map((department) => (
                <label
                  key={department.name}
                  className="flex items-center gap-3 text-sm text-cream-800"
                >
                  <input
                    type="checkbox"
                    checked={selectedDepartments.includes(department.name)}
                    onChange={() => toggleDepartment(department.name)}
                    className="size-4 accent-orange-1000"
                  />
                  <span>
                    {department.name} ({department.count})
                  </span>
                </label>
              ))}
            </div>
          </div>

          <Button
            onClick={clearFilters}
            className="mt-6 h-10 rounded-md border border-border-1000 bg-transparent font-overpass-mono text-sm text-cream-800 hover:bg-orange-1000 hover:text-neutral-950"
          >
            Clear all filters
          </Button>
        </Card>

        <Card className="rounded-lg border border-orange-1000 bg-neutral-910/80 px-5 py-5">
          <h2 className="text-lg font-bold uppercase tracking-tighter text-orange-1000">
            Cat Tip
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-text-900">
            Start with department filters before searching job text. Less hay,
            fewer needles.
          </p>
        </Card>
      </aside>

      <section className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="text-sm text-cream-800">
            {filteredRows.length} jobs found
          </div>
          <div className="rounded-md border border-border-1000 bg-neutral-950 px-4 py-3 text-sm text-cream-800">
            Sort: Most relevant
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {filteredRows.map((row) => {
            const job = row.original;

            return (
              <Card
                key={job.id}
                className="rounded-lg border border-border-1000 bg-neutral-910/80 px-5 py-5"
              >
                <div className="grid gap-4 md:grid-cols-[1fr_auto]">
                  <div>
                    <h3 className="text-xl font-bold text-cream-1000">
                      {job.title}
                    </h3>
                    <div className="mt-2 text-sm text-orange-1000">
                      {job.departments.join(" • ")}
                    </div>
                    <div className="mt-3 text-sm text-cream-800">
                      {job.location ?? "Location not listed"}
                    </div>
                  </div>

                  <div className="flex flex-col gap-4 md:items-end">
                    <div className="text-sm text-cream-800">
                      {formatUpdatedLabel(job.updatedAt)}
                    </div>
                    <Button
                      asChild
                      className="h-10 rounded-md border border-orange-1000 bg-transparent px-6 font-overpass-mono text-sm font-bold text-orange-1000 hover:bg-orange-1000 hover:text-neutral-950"
                    >
                      <a
                        href={job.absoluteUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        View job -&gt;
                      </a>
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </section>
    </div>
  );
}
