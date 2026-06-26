import generatedEnrichment from "./department-enrichment.generated.json";
import {
  departmentEnrichmentArtifactSchema,
  isLlmDepartmentEnrichmentEnabled,
  type DepartmentEnrichmentById,
} from "./department-enrichment";

export function getCompanyDepartmentEnrichment(
  companyToken: string,
): DepartmentEnrichmentById | undefined {
  if (!isLlmDepartmentEnrichmentEnabled()) {
    return undefined;
  }

  const parsed =
    departmentEnrichmentArtifactSchema.safeParse(generatedEnrichment);

  if (!parsed.success) {
    console.warn("department enrichment artifact is invalid", parsed.error);
    return undefined;
  }

  return parsed.data.companies[companyToken]?.departments;
}
