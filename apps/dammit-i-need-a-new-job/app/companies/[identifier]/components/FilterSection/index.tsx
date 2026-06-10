"use client";

import { Button } from "@kavita-likes-fajitas/shadcn-ui-lib/components/ui/button";
import { Card } from "@kavita-likes-fajitas/shadcn-ui-lib/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
} from "@kavita-likes-fajitas/shadcn-ui-lib/components/ui/collapsible";
import { useId, useState } from "react";
import { useCompanyJobsTableContext } from "../../context";
import { FilterSectionHeader } from "./FilterSectionHeader";
import { SearchJobsFilter } from "./SearchJobsFilter";
import { TeamFilterList } from "./TeamFilterList";

export function FilterSection() {
  const filterContentId = useId();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const {
    globalFilter,
    setGlobalFilter,
    selectedDepartments,
    toggleDepartment,
    clearFilters,
    departmentOptions,
  } = useCompanyJobsTableContext();

  return (
    <Card className="rounded-lg border border-divider-1000 bg-neutral-910/80 px-4 py-4 md:px-5 md:py-5">
      <Collapsible open={filtersOpen} onOpenChange={setFiltersOpen}>
        <FilterSectionHeader
          filtersOpen={filtersOpen}
          filterContentId={filterContentId}
        />

        <CollapsibleContent
          forceMount
          id={filterContentId}
          className={filtersOpen ? "block" : "hidden lg:block"}
        >
          <SearchJobsFilter
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
          />
          <TeamFilterList
            departmentOptions={departmentOptions}
            selectedDepartments={selectedDepartments}
            toggleDepartment={toggleDepartment}
          />

          <Button
            type="button"
            onClick={clearFilters}
            className="mt-5 h-9 rounded-md border border-divider-1000 bg-transparent font-overpass-mono text-xs text-cream-800 hover:bg-orange-1000 hover:text-neutral-950 md:mt-6 md:h-10 md:text-sm"
          >
            Clear all filters
          </Button>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}
