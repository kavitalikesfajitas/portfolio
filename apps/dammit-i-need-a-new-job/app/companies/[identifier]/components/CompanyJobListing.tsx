import { Button } from "@kavita-likes-fajitas/shadcn-ui-lib/components/ui/button";
import { Card } from "@kavita-likes-fajitas/shadcn-ui-lib/components/ui/card";
import { formatUpdatedLabel } from "../utils";
import type { CompanyJob } from "../types";

export function CompanyJobListing({ job }: { job: CompanyJob }) {
  return (
    <Card
      key={job.id}
      className="rounded-lg border border-divider-1000 bg-neutral-910/80 px-5 py-5"
    >
      <div className="grid gap-4 md:grid-cols-[1fr_auto]">
        <div>
          <h3 className="text-xl font-bold text-cream-1000">{job.title}</h3>
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
      className="h-10 rounded-md border border-orange-1000 bg-transparent px-6 font-overpass-mono text-sm font-bold text-orange-1000 hover:bg-orange-1000 hover:text-neutral-950"
    >
      <a href={absoluteUrl} target="_blank" rel="noreferrer">
        View job -&gt;
      </a>
    </Button>
  );
}
