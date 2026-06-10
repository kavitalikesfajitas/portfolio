import type { CompanyJobListingRowProps } from "@/app/companies/types";
import { DepartmentBadgeList } from "./DepartmentBadgeList";

export function CompanyJobInfo({
  companyName,
  updatedLabel,
  engineeringDepartmentCount,
  engineeringJobCount,
  departments,
  extraDepartmentCount,
}: CompanyJobListingRowProps) {
  return (
    <div className="min-w-0">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <h3 className="text-2xl font-extrabold leading-tight text-cream-1000">
          {companyName}
        </h3>
        <span className="size-2 rounded-full bg-green-500" />
        <span className="font-overpass-mono text-xs text-cream-800">
          Updated {updatedLabel}
        </span>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-x-8 gap-y-2 font-overpass-mono text-sm text-cream-800">
        <span>{engineeringDepartmentCount} engineering departments</span>
        <span>{engineeringJobCount} engineering jobs</span>
      </div>

      <DepartmentBadgeList
        departments={departments}
        extraDepartmentCount={extraDepartmentCount}
      />
    </div>
  );
}
