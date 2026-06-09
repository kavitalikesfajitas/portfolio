import { Badge } from "@kavita-likes-fajitas/shadcn-ui-lib/components/ui/badge";
import { Button } from "@kavita-likes-fajitas/shadcn-ui-lib/components/ui/button";
import { Card } from "@kavita-likes-fajitas/shadcn-ui-lib/components/ui/card";

export type DepartmentSummary = {
  name: string;
  count: number;
  isPrimary?: boolean;
};

export type CompanyJobListingRowProps = {
  companyName: string;
  updatedLabel: string;
  engineeringDepartmentCount: number;
  engineeringJobCount: number;
  departments: DepartmentSummary[];
  extraDepartmentCount: number;
};

function CompanyMark() {
  return (
    <div className="flex size-16 shrink-0 items-center justify-center rounded-md bg-black shadow-[0_0_18px_rgba(0,0,0,0.45)] sm:size-20">
      <div className="h-0 w-0 border-x-[17px] border-b-[30px] border-x-transparent border-b-white sm:border-x-[23px] sm:border-b-[40px]" />
    </div>
  );
}

function DepartmentBadge({ name, count, isPrimary }: DepartmentSummary) {
  return (
    <Badge
      variant="outline"
      className={[
        "h-7 rounded-md border bg-neutral-950/35 px-3 font-overpass-mono text-xs font-semibold tracking-normal shadow-[inset_0_0_14px_rgba(255,255,255,0.025)]",
        isPrimary
          ? "border-orange-1000 text-orange-1000"
          : "border-border-1000 text-cream-800",
      ].join(" ")}
    >
      <span>{name}</span>
      <span className="text-current/80">{count}</span>
    </Badge>
  );
}

export function CompanyJobListingRow({
  companyName,
  updatedLabel,
  engineeringDepartmentCount,
  engineeringJobCount,
  departments,
  extraDepartmentCount,
}: CompanyJobListingRowProps) {
  return (
    <Card className="w-full rounded-lg border border-border-1000 bg-neutral-910/80 px-5 py-4 text-cream-1000 shadow-[inset_0_1px_0_rgba(255,255,255,0.03),0_18px_60px_rgba(0,0,0,0.35)]">
      <div className="grid grid-cols-[auto_1fr] gap-4 sm:grid-cols-[auto_1fr_auto] sm:items-center">
        <CompanyMark />

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

          <div className="mt-4 flex flex-wrap gap-2">
            {departments.map((department) => (
              <DepartmentBadge key={department.name} {...department} />
            ))}
            <Badge
              variant="outline"
              className="h-7 rounded-md border border-border-1000 bg-neutral-950/35 px-3 font-overpass-mono text-xs font-semibold text-cream-800"
            >
              +{extraDepartmentCount} more
            </Badge>
          </div>
        </div>

        <Button className="col-span-2 h-12 rounded-md border border-orange-1000 bg-transparent px-7 font-overpass-mono text-sm font-bold text-orange-1000 hover:bg-orange-1000 hover:text-neutral-950 sm:col-span-1">
          Explore
          <span aria-hidden="true">-&gt;</span>
        </Button>
      </div>
    </Card>
  );
}
