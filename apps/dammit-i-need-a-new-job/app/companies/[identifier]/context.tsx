"use client";

import { createContext, useContext, type ReactNode } from "react";
import { useCompanyJobsTable } from "./hooks";
import type { CompanyJobsTableProps } from "./types";

type CompanyJobsTableContextValue = ReturnType<typeof useCompanyJobsTable> & {
  departmentOptions: CompanyJobsTableProps["departmentOptions"];
};

const CompanyJobsTableContext =
  createContext<CompanyJobsTableContextValue | null>(null);

export function CompanyJobsTableProvider({
  jobs,
  departmentOptions,
  children,
}: CompanyJobsTableProps & { children: ReactNode }) {
  const table = useCompanyJobsTable({ jobs });

  return (
    <CompanyJobsTableContext.Provider value={{ ...table, departmentOptions }}>
      {children}
    </CompanyJobsTableContext.Provider>
  );
}

export function useCompanyJobsTableContext() {
  const context = useContext(CompanyJobsTableContext);

  if (context === null) {
    throw new Error(
      "useCompanyJobsTableContext must be used within a CompanyJobsTableProvider",
    );
  }

  return context;
}
