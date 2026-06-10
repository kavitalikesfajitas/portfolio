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
        <h3 className="text-lg font-extrabold leading-tight text-cream-1000 sm:text-2xl">
          {companyName}
        </h3>
        <span className="size-1.5 rounded-full bg-green-500 sm:size-2" />
        <span className="font-overpass-mono text-[10px] text-cream-800 sm:text-xs">
          Updated {updatedLabel}
        </span>
      </div>

      <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 font-overpass-mono text-xs text-cream-800 sm:mt-3 sm:gap-x-8 sm:gap-y-2 sm:text-sm">
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
