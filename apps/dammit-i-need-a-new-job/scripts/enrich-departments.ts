/**
 * Manual LLM department enrichment spike.
 *
 * Usage:
 *   ANTHROPIC_API_KEY=sk-ant-... node scripts/enrich-departments.ts stripe
 *
 * The app only reads the generated artifact when
 * ENABLE_LLM_DEPARTMENT_ENRICHMENT=true.
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import {
  buildDepartmentEnrichmentInput,
  departmentEnrichmentArtifactSchema,
  enrichDepartmentsWithLlm,
  type DepartmentEnrichmentArtifact,
} from "../lib/jobs/department-enrichment.ts";
import { fetchGreenhouseDepartments } from "../lib/jobs/providers/greenhouse/client.ts";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const defaultOutputFile = path.join(
  scriptDir,
  "..",
  "lib",
  "jobs",
  "department-enrichment.generated.json",
);

async function readExistingArtifact(outputFile: string) {
  try {
    const parsed = JSON.parse(await readFile(outputFile, "utf8"));
    return departmentEnrichmentArtifactSchema.parse(parsed);
  } catch {
    return { companies: {} } satisfies DepartmentEnrichmentArtifact;
  }
}

export async function enrichCompanyDepartments({
  companyToken,
  outputFile = defaultOutputFile,
}: {
  companyToken: string;
  outputFile?: string;
}) {
  const departmentsResponse = await fetchGreenhouseDepartments(companyToken);
  const enriched = await enrichDepartmentsWithLlm({
    input: buildDepartmentEnrichmentInput({
      companyToken,
      departments: departmentsResponse.departments,
    }),
  });
  const existing = await readExistingArtifact(outputFile);

  const nextArtifact: DepartmentEnrichmentArtifact = {
    companies: {
      ...existing.companies,
      [companyToken]: {
        departments: Object.fromEntries(
          enriched.departments.map(({ departmentId, ...department }) => [
            String(departmentId),
            department,
          ]),
        ),
      },
    },
  };

  await mkdir(path.dirname(outputFile), { recursive: true });
  await writeFile(outputFile, `${JSON.stringify(nextArtifact, null, 2)}\n`);

  return nextArtifact.companies[companyToken];
}

const invokedDirectly =
  process.argv[1] !== undefined &&
  import.meta.url === pathToFileURL(process.argv[1]).href;

if (invokedDirectly) {
  const companyToken = process.argv[2] ?? "stripe";

  try {
    const result = await enrichCompanyDepartments({ companyToken });
    const count = Object.keys(result?.departments ?? {}).length;
    console.log(`Enriched ${count} ${companyToken} departments.`);
  } catch (error) {
    console.error(error);
    process.exitCode = 1;
  }
}
