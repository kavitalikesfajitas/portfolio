import Fuse from "fuse.js";
import type { GreenhouseDepartment, GreenhouseJob } from "./schema";

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

const DEPARTMENT_CATEGORY_TERMS = {
  engineering: ENGINEERING_DEPARTMENT_TERMS,
  product: ["product", "program management", "product management"],
  design: ["design", "creative", "brand studio"],
  data: ["data", "analytics", "machine learning", "ml", "ai"],
  security: ["security", "trust", "privacy", "risk"],
  sales: [
    "sales",
    "account executive",
    "business development",
    "revenue",
    "go-to-market",
    "sales development",
  ],
  customerSuccess: [
    "customer success",
    "customer support",
    "support",
    "training",
    "certification",
    "implementation",
    "solutions",
  ],
  marketing: ["marketing", "communications", "growth"],
  people: ["people", "human resources", "hr", "talent", "recruiting"],
  finance: ["finance", "accounting", "tax", "treasury"],
  legal: ["legal", "compliance", "policy"],
  operations: ["operations", "strategy", "business operations"],
} as const;

export type DepartmentCategory =
  | keyof typeof DEPARTMENT_CATEGORY_TERMS
  | "unspecified";

export type DepartmentCategoryConfidence = "high" | "medium" | "low";

// 0.30 keeps typo tolerance ("Enginering" ~0.18) while rejecting near-misses
// like "developer" against "Development" (~0.35), which over-tagged corporate,
// policy, and talent teams as engineering.
const DEPARTMENT_MATCH_THRESHOLD = 0.3;

export type NormalizedJob = {
  id: string;
  provider: "ashby" | "greenhouse";
  providerJobId: number | string;
  internalJobId: number | null;
  title: string;
  location: string | null;
  absoluteUrl: string;
  updatedAt: string;
  requisitionId: string | null;
  language: string | null;
  companyName: string | null;
  firstPublishedAt: string | null;
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
    normalizedName: string;
    category: DepartmentCategory;
    categoryConfidence: DepartmentCategoryConfidence;
    categoryMatchedTerms: string[];
  };
  jobs: NormalizedJob[];
};

// Greenhouse fields come straight from each company's ATS, so they arrive with
// trailing whitespace and double spaces. Collapse runs of whitespace to a
// single space and trim the ends.
export function normalizeWhitespace(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

export function normalizeDepartmentName(name: string) {
  return normalizeWhitespace(
    name.replace(/^\d+\s+/, "").replace(/\s+\[[^\]]+\]$/, ""),
  );
}

// Values companies drop into a free-text field when they have nothing real to
// put there. Treated as absent rather than displayed verbatim.
const TEXT_PLACEHOLDERS = new Set([
  "location",
  "see opening id",
  "tbd",
  "n/a",
  "na",
]);

export function normalizeFreeText(value: string | null | undefined) {
  if (value == null) {
    return null;
  }

  const cleaned = normalizeWhitespace(value);

  if (cleaned.length === 0 || TEXT_PLACEHOLDERS.has(cleaned.toLowerCase())) {
    return null;
  }

  return cleaned;
}

// Greenhouse timestamps arrive with mixed UTC offsets (-04:00, -05:00, ...).
// Collapse them to canonical ISO 8601 UTC so they sort and compare correctly.
export function normalizeTimestamp(value: string | null | undefined) {
  if (value == null) {
    return null;
  }

  const parsed = new Date(value);

  return Number.isNaN(parsed.getTime()) ? null : parsed.toISOString();
}

export function findMatchingTerms(name: string, terms: readonly string[]) {
  const normalizedName = name.toLowerCase();
  const departmentNameFuse = new Fuse([{ name }], {
    keys: ["name"],
    includeScore: true,
    ignoreLocation: true,
    isCaseSensitive: false,
    minMatchCharLength: 2,
    threshold: DEPARTMENT_MATCH_THRESHOLD,
  });

  return terms.filter((term) => {
    if (term.length <= 3) {
      return new RegExp(`(^|[^a-z0-9])${term}($|[^a-z0-9])`).test(
        normalizedName,
      );
    }

    const [match] = departmentNameFuse.search(term);

    return (
      match !== undefined &&
      (match.score ?? Number.POSITIVE_INFINITY) <= DEPARTMENT_MATCH_THRESHOLD
    );
  });
}

export function classifyDepartment(name: string) {
  const normalizedName = normalizeDepartmentName(name);
  const matches = Object.entries(DEPARTMENT_CATEGORY_TERMS)
    .map(([category, terms]) => ({
      category: category as keyof typeof DEPARTMENT_CATEGORY_TERMS,
      matchedTerms: findMatchingTerms(normalizedName, terms),
    }))
    .filter((match) => match.matchedTerms.length > 0)
    .sort((a, b) => b.matchedTerms.length - a.matchedTerms.length);

  const [bestMatch] = matches;

  if (!bestMatch) {
    return {
      normalizedName,
      category: "unspecified" as const,
      categoryConfidence: "low" as const,
      categoryMatchedTerms: [],
    };
  }

  return {
    normalizedName,
    category: bestMatch.category,
    categoryConfidence:
      bestMatch.matchedTerms.length > 1
        ? ("high" as const)
        : ("medium" as const),
    categoryMatchedTerms: bestMatch.matchedTerms,
  };
}

function withDepartmentReference(
  job: GreenhouseJob,
  department: GreenhouseDepartment,
) {
  const departmentsById = new Map(
    (job.departments ?? []).map((jobDepartment) => [
      jobDepartment.id,
      jobDepartment,
    ]),
  );

  departmentsById.set(department.id, {
    id: department.id,
    name: department.name,
    parent_id: department.parent_id ?? null,
    child_ids: department.child_ids ?? [],
  });

  return {
    ...job,
    departments: [...departmentsById.values()],
  };
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
      title: normalizeWhitespace(job.title),
      location: normalizeFreeText(job.location?.name),
      absoluteUrl: job.absolute_url,
      updatedAt: normalizeTimestamp(job.updated_at) ?? job.updated_at,
      requisitionId: normalizeFreeText(job.requisition_id),
      language: job.language ?? null,
      companyName: job.company_name ?? null,
      firstPublishedAt: normalizeTimestamp(job.first_published),
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
    const classification = classifyDepartment(department.name);
    const matchedTerms = findMatchingTerms(
      classification.normalizedName,
      ENGINEERING_DEPARTMENT_TERMS,
    );

    return {
      id: department.id,
      name: department.name,
      parentId: department.parent_id ?? null,
      childIds: department.child_ids ?? [],
      jobCount: department.jobs.length,
      signals: {
        likelyEngineering: classification.category === "engineering",
        matchedTerms,
        ...classification,
      },
      jobs: normalizeGreenhouseJobs(
        department.jobs.map((job) => withDepartmentReference(job, department)),
      ),
    };
  });
}
