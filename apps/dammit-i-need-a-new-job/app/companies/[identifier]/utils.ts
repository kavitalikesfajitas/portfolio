import type { FilterFn } from "@tanstack/react-table";
import type { CompanyJob, DepartmentFilterOption } from "./types";
import {
  type NormalizedJob,
  normalizeGreenhouseDepartments,
} from "@/lib/jobs/providers/greenhouse/normalize";
import type { GreenhouseDepartment } from "@/lib/jobs/providers/greenhouse/schema";

export const arrayIncludesSome: FilterFn<CompanyJob> = (
  row,
  columnId,
  filterValue,
) => {
  const selectedValues = Array.isArray(filterValue) ? filterValue : [];

  if (selectedValues.length === 0) {
    return true;
  }

  const rowValues = row.getValue<string[]>(columnId);

  return selectedValues.some((value) => rowValues.includes(value));
};
export const globalJobSearch: FilterFn<CompanyJob> = (
  row,
  _columnId,
  filterValue,
) => {
  const query = String(filterValue ?? "")
    .trim()
    .toLowerCase();

  if (!query) {
    return true;
  }

  const job = row.original;

  return [job.title, job.location ?? "", ...job.departments].some((value) =>
    value.toLowerCase().includes(query),
  );
};

export function formatUpdatedLabel(updatedAt: string) {
  const updatedTime = new Date(updatedAt).getTime();

  if (Number.isNaN(updatedTime) || updatedTime > Date.now()) {
    return "Updated recently";
  }

  const elapsedDays = Math.max(
    1,
    Math.floor((Date.now() - updatedTime) / 86_400_000),
  );

  return `Updated ${elapsedDays}d ago`;
}

// Display-only: drop the redundant "- Eng" / "- Engineering" / "- R&D"
// qualifier some companies append to every engineering team (e.g. Stripe's
// "Payins - Eng"). Classification still runs on the raw name, so detection is
// unaffected. Falls back to the original if stripping would leave it empty.
export function formatTeamName(name: string) {
  const stripped = name
    .replace(/\s*[-–—]\s*(eng|engineering|r&d)\s*$/i, "")
    .trim();

  return stripped.length > 0 ? stripped : name;
}

function uniqueValues<T>(values: T[]) {
  return [...new Set(values)];
}

function mergeDepartmentJobs(jobs: NormalizedJob[]) {
  const jobsById = new Map<string, NormalizedJob>();

  for (const job of jobs) {
    const existingJob = jobsById.get(job.id);

    if (!existingJob) {
      jobsById.set(job.id, job);
      continue;
    }

    const departmentsById = new Map(
      existingJob.departments.map((department) => [department.id, department]),
    );

    for (const department of job.departments) {
      departmentsById.set(department.id, department);
    }

    jobsById.set(job.id, {
      ...existingJob,
      departments: [...departmentsById.values()],
    });
  }

  return [...jobsById.values()];
}

// Same engineering-department definition as the companies list page, so the
// detail page surfaces the exact teams shown on each company card.
export function normalizeEngineeringDepartments(
  departments: GreenhouseDepartment[],
) {
  return normalizeGreenhouseDepartments(departments)
    .filter(
      (department) =>
        department.signals.likelyEngineering && department.jobCount > 0,
    )
    .sort((a, b) => b.jobCount - a.jobCount);
}

// Builds the engineering-only view the detail page renders: the job list (each
// job tagged with the engineering teams it belongs to) plus the team filter
// options. Jobs with no engineering team are dropped.
export function buildCompanyJobsView(departments: GreenhouseDepartment[]): {
  jobs: CompanyJob[];
  departmentOptions: DepartmentFilterOption[];
  totalEngineeringJobs: number;
} {
  const engineeringDepartments = normalizeEngineeringDepartments(departments);
  const engineeringDepartmentNameById = new Map(
    engineeringDepartments.map((department) => [
      department.id,
      formatTeamName(department.signals.normalizedName),
    ]),
  );

  const jobs = mergeDepartmentJobs(
    engineeringDepartments.flatMap((department) => department.jobs),
  )
    .map((job) => ({
      id: job.id,
      title: job.title,
      absoluteUrl: job.absoluteUrl,
      location: job.location,
      departments: uniqueValues(
        job.departments
          .map((department) => engineeringDepartmentNameById.get(department.id))
          .filter((name): name is string => name !== undefined),
      ),
      updatedAt: job.updatedAt,
    }))
    .filter((job) => job.departments.length > 0)
    // updatedAt is already canonical ISO 8601 UTC (see normalizeTimestamp), so a
    // lexicographic compare sorts chronologically without parsing a Date per
    // comparison. Newest first. Runs once at build/ISR time, not per request.
    .sort((a, b) =>
      a.updatedAt < b.updatedAt ? 1 : a.updatedAt > b.updatedAt ? -1 : 0,
    );

  const departmentOptions = uniqueValues(
    engineeringDepartments.map((department) =>
      formatTeamName(department.signals.normalizedName),
    ),
  )
    .map((name) => ({
      name,
      count: jobs.filter((job) => job.departments.includes(name)).length,
    }))
    .filter((option) => option.count > 0);

  return { jobs, departmentOptions, totalEngineeringJobs: jobs.length };
}
