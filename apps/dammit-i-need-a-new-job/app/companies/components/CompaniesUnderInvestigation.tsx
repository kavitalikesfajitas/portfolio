import { CompanyJobListingRow } from "@/app/components/CompanyJobListingRow";
import { fetchGreenhouseDepartments } from "@/lib/jobs/providers/greenhouse/client";
import { normalizeGreenhouseDepartments } from "@/lib/jobs/providers/greenhouse/normalize";

const VERCEL_BOARD_TOKEN = "vercel";
const MAX_VISIBLE_DEPARTMENTS = 3;

function formatUpdatedLabel(updatedAt: string | null) {
  if (!updatedAt) {
    return "recently";
  }

  const updatedTime = new Date(updatedAt).getTime();

  if (Number.isNaN(updatedTime)) {
    return "recently";
  }

  const elapsedMinutes = Math.max(
    1,
    Math.floor((Date.now() - updatedTime) / 60_000),
  );

  if (elapsedMinutes < 60) {
    return `${elapsedMinutes}m ago`;
  }

  const elapsedHours = Math.floor(elapsedMinutes / 60);

  if (elapsedHours < 24) {
    return `${elapsedHours}h ago`;
  }

  const elapsedDays = Math.floor(elapsedHours / 24);

  return `${elapsedDays}d ago`;
}

async function getVercelCompanyRow() {
  try {
    const response = await fetchGreenhouseDepartments(VERCEL_BOARD_TOKEN);
    const engineeringDepartments = normalizeGreenhouseDepartments(
      response.departments,
    )
      .filter((department) => department.signals.likelyEngineering)
      .sort((a, b) => b.jobCount - a.jobCount);

    const engineeringJobIds = new Set(
      engineeringDepartments.flatMap((department) =>
        department.jobs.map((job) => job.id),
      ),
    );
    const latestUpdatedAt =
      engineeringDepartments
        .flatMap((department) => department.jobs.map((job) => job.updatedAt))
        .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())[0] ??
      null;
    const visibleDepartments = engineeringDepartments.slice(
      0,
      MAX_VISIBLE_DEPARTMENTS,
    );

    return {
      companyName: "Vercel",
      href: "/companies/vercel",
      updatedLabel: formatUpdatedLabel(latestUpdatedAt),
      engineeringDepartmentCount: engineeringDepartments.length,
      engineeringJobCount: engineeringJobIds.size,
      departments: visibleDepartments.map((department, index) => ({
        name: department.name,
        count: department.jobCount,
        isPrimary: index === 0,
      })),
      extraDepartmentCount: Math.max(
        0,
        engineeringDepartments.length - visibleDepartments.length,
      ),
    };
  } catch (error) {
    console.error("Unable to load Greenhouse departments for Vercel", error);
    return null;
  }
}

export async function CompaniesUnderInvestigation() {
  const company = await getVercelCompanyRow();

  return (
    <section className="flex w-full flex-col gap-6 font-overpass-mono">
      <div>
        <h1 className="mb-3 text-2xl font-bold uppercase tracking-tighter text-cream-1000">
          Companies Under Investigation
        </h1>
        <p className="max-w-4xl text-base leading-relaxed text-foreground-900">
          Finding companies with active engineering hiring.
        </p>
      </div>

      {company ? (
        <CompanyJobListingRow {...company} />
      ) : (
        <div className="rounded-lg border border-divider-1000 bg-neutral-910/80 px-5 py-4 text-sm text-foreground-900">
          Greenhouse is being dramatic. Try again in a bit.
        </div>
      )}
    </section>
  );
}
