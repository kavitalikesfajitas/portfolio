import type { GreenhouseDepartment, GreenhouseJob } from "./schema";

const ENGINEERING_DEPARTMENT_TERMS = [
  "engineering",
  "engineer",
  "software",
  "platform",
  "infrastructure",
  "developer",
  "devops",
  "security",
  "data",
  "r&d",
  "research and development",
];

export type NormalizedJob = {
  id: string;
  provider: "greenhouse";
  providerJobId: number;
  internalJobId: number | null;
  title: string;
  location: string | null;
  absoluteUrl: string;
  updatedAt: string;
  requisitionId: string | null;
  language: string | null;
  companyName: string | null;
  firstPublishedAt: string | null;
  content?: string;
  departments: Array<{
    id: number;
    name: string;
    parentId: number | null;
    childIds: number[];
  }>;
  offices: Array<{
    id: number;
    name: string;
    location: string | null;
    parentId: number | null;
    childIds: number[];
  }>;
};

export type NormalizedDepartment = {
  id: number;
  name: string;
  parentId: number | null;
  childIds: number[];
  jobCount: number;
  signals: {
    likelyEngineering: boolean;
    matchedTerms: string[];
  };
  jobs: NormalizedJob[];
};

function findEngineeringTerms(name: string) {
  const normalizedName = name.toLowerCase();

  return ENGINEERING_DEPARTMENT_TERMS.filter((term) =>
    normalizedName.includes(term),
  );
}

export function normalizeGreenhouseJobs(
  jobs: GreenhouseJob[],
): NormalizedJob[] {
  const dedupedJobs = new Map<number, NormalizedJob>();

  for (const job of jobs) {
    dedupedJobs.set(job.id, {
      id: `greenhouse:${job.id}`,
      provider: "greenhouse",
      providerJobId: job.id,
      internalJobId: job.internal_job_id,
      title: job.title,
      location: job.location?.name ?? null,
      absoluteUrl: job.absolute_url,
      updatedAt: job.updated_at,
      requisitionId: job.requisition_id ?? null,
      language: job.language ?? null,
      companyName: job.company_name ?? null,
      firstPublishedAt: job.first_published ?? null,
      ...(job.content ? { content: job.content } : {}),
      departments:
        job.departments?.map((department) => ({
          id: department.id,
          name: department.name,
          parentId: department.parent_id ?? null,
          childIds: department.child_ids ?? [],
        })) ?? [],
      offices:
        job.offices?.map((office) => ({
          id: office.id,
          name: office.name,
          location: office.location ?? null,
          parentId: office.parent_id ?? null,
          childIds: office.child_ids ?? [],
        })) ?? [],
    });
  }

  return [...dedupedJobs.values()];
}

export function normalizeGreenhouseDepartments(
  departments: GreenhouseDepartment[],
): NormalizedDepartment[] {
  return departments.map((department) => {
    const matchedTerms = findEngineeringTerms(department.name);

    return {
      id: department.id,
      name: department.name,
      parentId: department.parent_id ?? null,
      childIds: department.child_ids ?? [],
      jobCount: department.jobs.length,
      signals: {
        likelyEngineering: matchedTerms.length > 0,
        matchedTerms,
      },
      jobs: normalizeGreenhouseJobs(
        department.jobs.map((job) => ({
          ...job,
          departments: [
            ...(job.departments ?? []),
            {
              id: department.id,
              name: department.name,
              parent_id: department.parent_id ?? null,
              child_ids: department.child_ids ?? [],
            },
          ],
        })),
      ),
    };
  });
}
