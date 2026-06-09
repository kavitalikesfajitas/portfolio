import Link from "next/link";
import { notFound } from "next/navigation";
import { NavigationMenu } from "@/app/components/NavigationMenu";
import {
  fetchGreenhouseDepartments,
  fetchGreenhouseJobs,
} from "@/lib/jobs/providers/greenhouse/client";
import {
  normalizeGreenhouseDepartments,
  normalizeGreenhouseJobs,
} from "@/lib/jobs/providers/greenhouse/normalize";
import { CompanyJobsTable } from "./components/CompanyJobsTable";

type CompanyPageProps = {
  params: Promise<{ identifier: string }>;
};

export default async function CompanyPage({ params }: CompanyPageProps) {
  const { identifier } = await params;

  if (identifier !== "vercel") {
    notFound();
  }

  const [departmentsResponse, jobsResponse] = await Promise.all([
    fetchGreenhouseDepartments(identifier),
    fetchGreenhouseJobs(identifier, { includeContent: true }),
  ]);
  const engineeringDepartments = normalizeGreenhouseDepartments(
    departmentsResponse.departments,
  )
    .filter((department) => department.signals.likelyEngineering)
    .sort((a, b) => b.jobCount - a.jobCount);
  const engineeringDepartmentNames = new Set(
    engineeringDepartments.map((department) => department.name),
  );
  const engineeringJobs = normalizeGreenhouseJobs(jobsResponse.jobs)
    .filter((job) =>
      job.departments.some((department) =>
        engineeringDepartmentNames.has(department.name),
      ),
    )
    .map((job) => ({
      id: job.id,
      title: job.title,
      absoluteUrl: job.absoluteUrl,
      location: job.location,
      departments: job.departments
        .map((department) => department.name)
        .filter((departmentName) =>
          engineeringDepartmentNames.has(departmentName),
        ),
      updatedAt: job.updatedAt,
    }));
  const totalEngineeringJobs = new Set(
    engineeringDepartments.flatMap((department) =>
      department.jobs.map((job) => job.id),
    ),
  ).size;

  return (
    <div className="flex min-h-screen flex-col items-center bg-neutral-950 text-cream-1000">
      <NavigationMenu />
      <main className="flex w-full max-w-7xl flex-1 flex-col gap-8 px-10 py-10 font-overpass-mono">
        <Link
          href="/companies"
          className="text-sm font-bold text-orange-1000 transition-colors hover:text-cream-1000"
        >
          &lt;- All companies
        </Link>

        <section className="rounded-lg border border-divider-1000 bg-neutral-910/80 p-6">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-4xl font-extrabold text-cream-1000">
                  Vercel
                </h1>
                <span className="size-2 rounded-full bg-green-500" />
              </div>
              <p className="mt-2 text-sm text-foreground-900">
                {totalEngineeringJobs} engineering jobs across{" "}
                {engineeringDepartments.length} departments.
              </p>
            </div>
            <Link
              href="/companies"
              className="rounded-md border border-orange-1000 px-5 py-3 text-sm font-bold text-orange-1000 transition-colors hover:bg-orange-1000 hover:text-neutral-950"
            >
              Back to companies -&gt;
            </Link>
          </div>
        </section>

        <CompanyJobsTable
          jobs={engineeringJobs}
          departmentOptions={engineeringDepartments.map((department) => ({
            name: department.name,
            count: department.jobCount,
          }))}
        />
      </main>
    </div>
  );
}
