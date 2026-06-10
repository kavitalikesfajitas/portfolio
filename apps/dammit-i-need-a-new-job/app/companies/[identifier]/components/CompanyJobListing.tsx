import { Button } from "@kavita-likes-fajitas/shadcn-ui-lib/components/ui/button";
import { Card } from "@kavita-likes-fajitas/shadcn-ui-lib/components/ui/card";
import { formatUpdatedLabel } from "../utils";
import type { CompanyJob } from "../types";

export function CompanyJobListing({ job }: { job: CompanyJob }) {
  return (
    <Card
      key={job.id}
      className="rounded-lg border border-divider-1000 bg-neutral-910/80 px-4 py-4 md:px-5 md:py-5"
    >
      <div className="grid gap-3 md:grid-cols-[1fr_auto] md:gap-4">
        <div>
          <h3 className="text-base font-bold leading-snug text-cream-1000 md:text-xl">
            {job.title}
          </h3>
          <div className="mt-1.5 text-xs text-orange-1000 md:mt-2 md:text-sm">
            {job.departments.join(" • ")}
          </div>
          <div className="mt-2 text-xs leading-relaxed text-cream-800 md:mt-3 md:text-sm">
            {job.location ?? "Location not listed"}
          </div>
        </div>

        <div className="flex flex-col gap-3 md:items-end md:gap-4">
          <div className="text-xs text-cream-800 md:text-sm">
            {formatUpdatedLabel(job.updatedAt)}
          </div>
          <ViewJobButton absoluteUrl={job.absoluteUrl} />
        </div>
      </div>
    </Card>
  );
}

function ViewJobButton({ absoluteUrl }: { absoluteUrl: string }) {
  return (
    <Button
      asChild
      className="h-9 rounded-md border border-orange-1000 bg-transparent px-5 font-overpass-mono text-xs font-bold text-orange-1000 hover:bg-orange-1000 hover:text-neutral-950 md:h-10 md:px-6 md:text-sm"
    >
      <a href={absoluteUrl} target="_blank" rel="noreferrer">
        View job -&gt;
      </a>
    </Button>
  );
}
