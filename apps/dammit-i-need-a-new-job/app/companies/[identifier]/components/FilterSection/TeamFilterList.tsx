import { Button } from "@kavita-likes-fajitas/shadcn-ui-lib/components/ui/button";
import { useMemo, useState } from "react";
import type { DepartmentFilterOption } from "../../types";

const MAX_VISIBLE_DEPARTMENT_FILTERS = 10;

type TeamFilterListProps = {
  departmentOptions: DepartmentFilterOption[];
  selectedDepartments: string[];
  toggleDepartment: (department: string) => void;
};

export function TeamFilterList({
  departmentOptions,
  selectedDepartments,
  toggleDepartment,
}: TeamFilterListProps) {
  const [showAllDepartments, setShowAllDepartments] = useState(false);
  const visibleDepartmentOptions = useMemo(
    () =>
      showAllDepartments
        ? departmentOptions
        : departmentOptions.slice(0, MAX_VISIBLE_DEPARTMENT_FILTERS),
    [departmentOptions, showAllDepartments],
  );
  const hiddenDepartmentCount = Math.max(
    0,
    departmentOptions.length - MAX_VISIBLE_DEPARTMENT_FILTERS,
  );
  const hasAdditionalDepartments = hiddenDepartmentCount > 0;

  return (
    <div className="mt-6">
      <h3 className="mb-3 text-sm font-bold text-orange-1000">Team</h3>
      <div className="flex flex-col gap-3">
        {visibleDepartmentOptions.map((option) => (
          <label
            key={option.name}
            className="flex items-center gap-3 text-sm text-cream-800"
          >
            <input
              type="checkbox"
              checked={selectedDepartments.includes(option.name)}
              onChange={() => toggleDepartment(option.name)}
              className="size-4 accent-orange-1000"
            />
            <span>
              {option.name} ({option.count})
            </span>
          </label>
        ))}
      </div>

      {hasAdditionalDepartments ? (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => setShowAllDepartments((isShowingAll) => !isShowingAll)}
          className="mt-4 h-8 justify-start px-0 font-overpass-mono text-xs font-semibold uppercase tracking-tighter text-orange-1000 hover:bg-transparent hover:text-cream-1000"
        >
          {showAllDepartments
            ? "Show fewer"
            : `Show ${hiddenDepartmentCount} more`}
        </Button>
      ) : null}
    </div>
  );
}
