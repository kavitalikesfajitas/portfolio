import type { NormalizedDepartment } from "@/lib/jobs/providers/greenhouse/normalize";

export type DepartmentsApiResponse = {
  provider: "greenhouse";
  identifier: string;
  resource: "departments";
  endpoint: "departments";
  departments: NormalizedDepartment[];
  meta: {
    totalDepartments: number;
    totalNestedJobs: number;
    likelyEngineeringDepartments: number;
    cache: { revalidate: number };
  };
};

export function departmentsQueryKey(provider: string, identifier: string) {
  return ["jobs", "departments", provider, identifier] as const;
}

export async function fetchDepartments(
  provider: string,
  identifier: string,
): Promise<DepartmentsApiResponse> {
  const response = await fetch(`/api/v1/departments/${provider}/${identifier}`);

  if (!response.ok) {
    throw new Error(`Unable to load departments (${response.status})`);
  }

  return response.json() as Promise<DepartmentsApiResponse>;
}
