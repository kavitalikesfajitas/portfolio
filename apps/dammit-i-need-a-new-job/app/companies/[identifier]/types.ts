export type CompanyJob = {
  id: string;
  title: string;
  absoluteUrl: string;
  location: string | null;
  departments: string[];
  searchTerms: string[];
  updatedAt: string;
};

export type DepartmentFilterOption = {
  name: string;
  count: number;
};

export type CompanyJobsTableProps = {
  jobs: CompanyJob[];
  departmentOptions: DepartmentFilterOption[];
};
