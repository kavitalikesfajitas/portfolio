import { JOB_PROVIDERS } from "@/lib/jobs/providers";
import logoManifest from "@/public/images/logos/manifest.json";
import type { CompanyBoard } from "../companyBoards";
import { formatUpdatedLabel } from "../utils";

const MAX_VISIBLE_DEPARTMENTS = 3;

// Maps board token -> public logo path, populated by `pnpm logos`.
const logos = logoManifest as Record<string, string>;

export async function getCompanyRow(board: CompanyBoard) {
  try {
    const { departments } = await JOB_PROVIDERS[
      board.provider
    ].fetchDepartments(board.identifier);
    const engineeringDepartments = departments
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
      companyName: board.name,
      logoSrc: logos[board.slug] ?? null,
      href: `/companies/${board.slug}`,
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
      `Unable to load ${board.provider} departments for ${board.identifier}`,
      error,
    );
    return null;
  }
}
