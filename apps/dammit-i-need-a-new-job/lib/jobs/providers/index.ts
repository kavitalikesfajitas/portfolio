import {
  ASHBY_DEPARTMENTS_REVALIDATE_SECONDS,
  ASHBY_JOBS_REVALIDATE_SECONDS,
  fetchAshbyJobs,
} from "./ashby/client";
import {
  normalizeAshbyDepartments,
  normalizeAshbyJobs,
} from "./ashby/normalize";
import {
  fetchGreenhouseDepartments,
  fetchGreenhouseJobs,
  GREENHOUSE_DEPARTMENTS_REVALIDATE_SECONDS,
  GREENHOUSE_JOBS_REVALIDATE_SECONDS,
} from "./greenhouse/client";
import {
  normalizeGreenhouseDepartments,
  normalizeGreenhouseJobs,
  type NormalizedDepartment,
  type NormalizedJob,
} from "./greenhouse/normalize";

export const JOB_PROVIDER_IDS = ["ashby", "greenhouse"] as const;

export type JobProviderId = (typeof JOB_PROVIDER_IDS)[number];

type FetchJobsResult = {
  jobs: NormalizedJob[];
  upstreamTotal: number;
  revalidate: number;
};

type FetchDepartmentsResult = {
  departments: NormalizedDepartment[];
  revalidate: number;
};

type JobProviderAdapter = {
  fetchJobs(identifier: string): Promise<FetchJobsResult>;
  fetchDepartments(identifier: string): Promise<FetchDepartmentsResult>;
};

export const JOB_PROVIDERS = {
  ashby: {
    async fetchJobs(identifier) {
      const response = await fetchAshbyJobs(identifier);
      const jobs = normalizeAshbyJobs(response.jobs);

      return {
        jobs,
        upstreamTotal: response.jobs.length,
        revalidate: ASHBY_JOBS_REVALIDATE_SECONDS,
      };
    },
    async fetchDepartments(identifier) {
      const response = await fetchAshbyJobs(identifier);

      return {
        departments: normalizeAshbyDepartments(response.jobs),
        revalidate: ASHBY_DEPARTMENTS_REVALIDATE_SECONDS,
      };
    },
  },
  greenhouse: {
    async fetchJobs(identifier) {
      const response = await fetchGreenhouseJobs(identifier);

      return {
        jobs: normalizeGreenhouseJobs(response.jobs),
        upstreamTotal: response.meta.total,
        revalidate: GREENHOUSE_JOBS_REVALIDATE_SECONDS,
      };
    },
    async fetchDepartments(identifier) {
      const response = await fetchGreenhouseDepartments(identifier);

      return {
        departments: normalizeGreenhouseDepartments(response.departments),
        revalidate: GREENHOUSE_DEPARTMENTS_REVALIDATE_SECONDS,
      };
    },
  },
} satisfies Record<JobProviderId, JobProviderAdapter>;
