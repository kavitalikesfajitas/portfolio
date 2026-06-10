import type { DepartmentSummary } from "@/app/companies/types";
import { Badge } from "@kavita-likes-fajitas/shadcn-ui-lib/components/ui/badge";
import { DepartmentBadge } from "./CompanyMark";

export function DepartmentBadgeList({
  departments,
  extraDepartmentCount,
}: {
  departments: DepartmentSummary[];
  extraDepartmentCount: number;
}) {
  return (
    <div className="mt-3 flex flex-wrap gap-1.5 sm:mt-4 sm:gap-2">
      {departments.map((department) => (
        <DepartmentBadge key={department.id} {...department} />
      ))}
      {extraDepartmentCount > 0 ? (
        <Badge
          variant="outline"
          className="h-6 rounded-md border border-divider-1000 bg-neutral-950/35 px-2 font-overpass-mono text-[10px] font-semibold text-cream-800 sm:h-7 sm:px-3 sm:text-xs"
        >
          +{extraDepartmentCount} more
        </Badge>
      ) : null}
    </div>
  );
}
