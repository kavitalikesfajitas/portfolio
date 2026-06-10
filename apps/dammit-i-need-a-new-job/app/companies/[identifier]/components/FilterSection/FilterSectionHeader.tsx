import { Button } from "@kavita-likes-fajitas/shadcn-ui-lib/components/ui/button";
import { CollapsibleTrigger } from "@kavita-likes-fajitas/shadcn-ui-lib/components/ui/collapsible";

type FilterSectionHeaderProps = {
  filtersOpen: boolean;
  filterContentId: string;
};

export function FilterSectionHeader({
  filtersOpen,
  filterContentId,
}: FilterSectionHeaderProps) {
  return (
    <div className="flex items-center justify-between gap-3">
      <h2 className="text-lg font-bold uppercase tracking-tighter text-orange-1000">
        Filters
      </h2>

      <CollapsibleTrigger asChild className="lg:hidden">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          aria-controls={filterContentId}
          className="h-8 border border-divider-1000 bg-neutral-950 px-3 font-overpass-mono text-xs font-semibold uppercase tracking-tighter text-cream-800 hover:bg-orange-1000 hover:text-neutral-950"
        >
          {filtersOpen ? "Hide" : "Show"}
        </Button>
      </CollapsibleTrigger>
    </div>
  );
}
