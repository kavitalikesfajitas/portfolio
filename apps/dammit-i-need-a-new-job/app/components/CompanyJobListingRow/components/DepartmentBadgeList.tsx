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
    <div className="mt-4 flex flex-wrap gap-2">
      {departments.map((department) => (
        <DepartmentBadge key={department.id} {...department} />
      ))}
      {extraDepartmentCount > 0 ? (
        <Badge
          variant="outline"
          className="h-7 rounded-md border border-divider-1000 bg-neutral-950/35 px-3 font-overpass-mono text-xs font-semibold text-cream-800"
        >
          +{extraDepartmentCount} more
        </Badge>
      ) : null}
    </div>
  );
}
