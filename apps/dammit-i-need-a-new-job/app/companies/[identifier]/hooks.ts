import {
  type ColumnFiltersState,
  type ColumnDef,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { useState, useMemo } from "react";
import type { CompanyJob } from "./types";
import { arrayIncludesSome, globalJobSearch } from "./utils";

const JOBS_PAGE_SIZE = 25;

export const useCompanyJobsTable = ({ jobs }: { jobs: CompanyJob[] }) => {
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [visibleJobCount, setVisibleJobCount] = useState(JOBS_PAGE_SIZE);

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
        header: "Team",
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
  const visibleRows = filteredRows.slice(0, visibleJobCount);
  const hiddenRowCount = Math.max(0, filteredRows.length - visibleRows.length);
  const hasMoreRows = hiddenRowCount > 0;

  function resetVisibleRows() {
    setVisibleJobCount(JOBS_PAGE_SIZE);
  }

  function updateGlobalFilter(value: string) {
    resetVisibleRows();
    setGlobalFilter(value);
  }

  function toggleDepartment(name: string) {
    resetVisibleRows();

    const nextDepartments = selectedDepartments.includes(name)
      ? selectedDepartments.filter((department) => department !== name)
      : [...selectedDepartments, name];

    departmentColumn?.setFilterValue(nextDepartments);
  }

  function clearFilters() {
    resetVisibleRows();
    setGlobalFilter("");
    setColumnFilters([]);
  }

  function showMoreRows() {
    setVisibleJobCount((count) => count + JOBS_PAGE_SIZE);
  }

  return {
    globalFilter,
    setGlobalFilter: updateGlobalFilter,
    selectedDepartments,
    toggleDepartment,
    clearFilters,
    filteredRows,
    visibleRows,
    hiddenRowCount,
    hasMoreRows,
    showMoreRows,
  };
};
