import { fetchGreenhouseDepartments } from "@/lib/jobs/providers/greenhouse/client";
import { normalizeGreenhouseDepartments } from "@/lib/jobs/providers/greenhouse/normalize";
import logoManifest from "@/public/images/logos/manifest.json";
import { formatCompanyName, formatUpdatedLabel } from "../utils";

const MAX_VISIBLE_DEPARTMENTS = 3;

// Maps board token -> public logo path, populated by `pnpm logos`.
const logos = logoManifest as Record<string, string>;

//TODO: run through this logo
export async function getCompanyRow(boardToken: string) {
  try {
    const response = await fetchGreenhouseDepartments(boardToken);
    const engineeringDepartments = normalizeGreenhouseDepartments(
      response.departments,
    )
      .filter(
        (department) =>
          department.signals.likelyEngineering && department.jobCount > 0,
      )
      .sort((a, b) => b.jobCount - a.jobCount);

    const engineeringJobIds = new Set(
      engineeringDepartments.flatMap((department) =>
        department.jobs.map((job) => job.id),
      ),
    );
    const latestUpdatedAt =
      engineeringDepartments
        .flatMap((department) => department.jobs.map((job) => job.updatedAt))
        .filter((updatedAt) => !Number.isNaN(new Date(updatedAt).getTime()))
        .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())[0] ??
      null;
    const visibleDepartments = engineeringDepartments.slice(
      0,
      MAX_VISIBLE_DEPARTMENTS,
    );

    return {
      companyName: formatCompanyName(boardToken),
      logoSrc: logos[boardToken] ?? null,
      href: `/companies/${boardToken}`,
      updatedLabel: formatUpdatedLabel(latestUpdatedAt),
      engineeringDepartmentCount: engineeringDepartments.length,
      engineeringJobCount: engineeringJobIds.size,
      departments: visibleDepartments.map((department, index) => ({
        id: department.id,
        name: department.signals.normalizedName,
        count: department.jobCount,
        isPrimary: index === 0,
      })),
      extraDepartmentCount: Math.max(
        0,
        engineeringDepartments.length - visibleDepartments.length,
      ),
    };
  } catch (error) {
    console.error(
      `Unable to load Greenhouse departments for ${boardToken}`,
      error,
    );
    return null;
  }
}
