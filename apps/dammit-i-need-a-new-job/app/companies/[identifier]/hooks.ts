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

export const useCompanyJobsTable = ({ jobs }: { jobs: CompanyJob[] }) => {
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

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
  return {
    globalFilter,
    setGlobalFilter,
    selectedDepartments,
    toggleDepartment,
    clearFilters,
    filteredRows,
  };
};
