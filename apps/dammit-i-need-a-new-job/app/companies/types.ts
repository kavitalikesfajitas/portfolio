export type DepartmentSummary = {
  id: number;
  name: string;
  count: number;
  isPrimary?: boolean;
};

export type CompanyJobListingRowProps = {
  companyName: string;
  logoSrc?: string | null;
  updatedLabel: string;
  engineeringDepartmentCount: number;
  engineeringJobCount: number;
  departments: DepartmentSummary[];
  extraDepartmentCount: number;
  href?: string;
};
