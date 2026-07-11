import {
  classifyDepartment,
  findMatchingTerms,
  normalizeDepartmentName,
  normalizeFreeText,
  normalizeTimestamp,
  normalizeWhitespace,
  type NormalizedDepartment,
  type NormalizedJob,
} from "../greenhouse/normalize";
import type { AshbyJob } from "./schema";

const ENGINEERING_DEPARTMENT_TERMS = [
  "engineering",
  "engineer",
  "software",
  "infrastructure",
  "eng",
  "developer",
  "devops",
  "r&d",
  "research and development",
];

function stablePositiveId(value: string) {
  let hash = 0;

  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) | 0;
  }

  return Math.abs(hash) || 1;
}

function getDepartmentName(job: AshbyJob) {
  return (
    normalizeFreeText(job.team) ??
    normalizeFreeText(job.department) ??
    "Unspecified"
  );
}

export function normalizeAshbyJobs(jobs: AshbyJob[]): NormalizedJob[] {
  const dedupedJobs = new Map<string, NormalizedJob>();

  for (const job of jobs) {
    const departmentName = getDepartmentName(job);
    const departmentId = stablePositiveId(departmentName.toLowerCase());
    const absoluteUrl = job.jobUrl ?? job.applyUrl;

    if (!absoluteUrl) {
      continue;
    }

    dedupedJobs.set(job.id, {
      id: `ashby:${job.id}`,
      provider: "ashby",
      providerJobId: job.id,
      internalJobId: null,
      title: normalizeWhitespace(job.title),
      location: normalizeFreeText(job.location),
      absoluteUrl,
      updatedAt: normalizeTimestamp(job.publishedAt) ?? job.publishedAt ?? "",
      requisitionId: null,
      language: null,
      companyName: null,
      firstPublishedAt: normalizeTimestamp(job.publishedAt),
      departments: [
        {
          id: departmentId,
          name: departmentName,
          parentId: null,
          childIds: [],
        },
      ],
      offices: [],
    });
  }

  return [...dedupedJobs.values()];
}

export function normalizeAshbyDepartments(
  jobs: AshbyJob[],
): NormalizedDepartment[] {
  const jobsByDepartment = new Map<
    string,
    { id: number; name: string; jobs: NormalizedJob[] }
  >();

  for (const job of normalizeAshbyJobs(
    jobs.filter((job) => job.isListed !== false),
  )) {
    const [department] = job.departments;

    if (!department) {
      continue;
    }

    const key = normalizeDepartmentName(department.name).toLowerCase();
    const existingDepartment = jobsByDepartment.get(key);

    if (existingDepartment) {
      existingDepartment.jobs.push(job);
    } else {
      jobsByDepartment.set(key, {
        id: department.id,
        name: department.name,
        jobs: [job],
      });
    }
  }

  return [...jobsByDepartment.values()].map((department) => {
    const classification = classifyDepartment(department.name);
    const matchedTerms = findMatchingTerms(
      classification.normalizedName,
      ENGINEERING_DEPARTMENT_TERMS,
    );

    return {
      id: department.id,
      name: department.name,
      parentId: null,
      childIds: [],
      jobCount: department.jobs.length,
      signals: {
        likelyEngineering: classification.category === "engineering",
        matchedTerms,
        ...classification,
      },
      jobs: department.jobs,
    };
  });
}
