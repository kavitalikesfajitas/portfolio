import { z } from "zod";
import type { GreenhouseDepartment } from "./providers/greenhouse/schema";

export const departmentEnrichmentCategorySchema = z.enum([
  "engineering",
  "product",
  "design",
  "data",
  "security",
  "sales",
  "customerSuccess",
  "marketing",
  "people",
  "finance",
  "legal",
  "operations",
  "unknown",
]);

export const departmentEnrichmentSchema = z.object({
  departmentId: z.number(),
  displayName: z.string().trim().min(1),
  category: departmentEnrichmentCategorySchema,
  aliases: z.array(z.string().trim().min(1)).max(12),
  confidence: z.enum(["high", "medium", "low"]),
  reasoning: z.string().trim().min(1).max(240),
});

export const companyDepartmentEnrichmentSchema = z.object({
  companyToken: z.string().trim().min(1),
  departments: z.array(departmentEnrichmentSchema),
});

export const departmentEnrichmentArtifactSchema = z.object({
  companies: z.record(
    z.string(),
    z.object({
      departments: z.record(
        z.string(),
        departmentEnrichmentSchema.omit({ departmentId: true }),
      ),
    }),
  ),
});

export type DepartmentEnrichment = z.infer<typeof departmentEnrichmentSchema>;
export type DepartmentEnrichmentArtifact = z.infer<
  typeof departmentEnrichmentArtifactSchema
>;
export type DepartmentEnrichmentById = NonNullable<
  DepartmentEnrichmentArtifact["companies"][string]
>["departments"];

export type DepartmentEnrichmentInput = {
  companyToken: string;
  departments: Array<{
    id: number;
    name: string;
    parentId: number | null;
    childIds: number[];
    sampleJobTitles: string[];
  }>;
};

type AnthropicTextBlock = {
  type: "text";
  text: string;
};

const anthropicMessagesResponseSchema = z.object({
  content: z.array(
    z
      .object({
        type: z.string(),
        text: z.string().optional(),
      })
      .passthrough(),
  ),
});

const SYSTEM_PROMPT = [
  "You normalize messy applicant-tracking-system department names.",
  "Use only the provided department names, hierarchy, and sample job titles.",
  "Do not invent job-description details.",
  "Respond with ONLY JSON and no markdown fences.",
  "For each department, return a concise display name, a broad category, search aliases, confidence, and a short reasoning note.",
  "Use unknown when the signal is unclear.",
].join("\n");

export function isLlmDepartmentEnrichmentEnabled() {
  return process.env.ENABLE_LLM_DEPARTMENT_ENRICHMENT === "true";
}

export function buildDepartmentEnrichmentInput({
  companyToken,
  departments,
  sampleJobTitleLimit = 8,
}: {
  companyToken: string;
  departments: GreenhouseDepartment[];
  sampleJobTitleLimit?: number;
}): DepartmentEnrichmentInput {
  return {
    companyToken,
    departments: departments.map((department) => ({
      id: department.id,
      name: department.name,
      parentId: department.parent_id ?? null,
      childIds: department.child_ids ?? [],
      sampleJobTitles: department.jobs
        .slice(0, sampleJobTitleLimit)
        .map((job) => job.title),
    })),
  };
}

function extractTextContent(content: unknown[]): string {
  const textBlock = content.find(
    (block): block is AnthropicTextBlock =>
      typeof block === "object" &&
      block !== null &&
      "type" in block &&
      block.type === "text" &&
      "text" in block &&
      typeof block.text === "string",
  );

  return textBlock?.text ?? "";
}

function cleanJsonText(value: string) {
  return value.replace(/```json|```/g, "").trim();
}

export async function enrichDepartmentsWithLlm({
  input,
  apiKey = process.env.ANTHROPIC_API_KEY,
  fetchImpl = fetch,
}: {
  input: DepartmentEnrichmentInput;
  apiKey?: string;
  fetchImpl?: typeof fetch;
}) {
  if (!apiKey) {
    throw new Error("Missing ANTHROPIC_API_KEY");
  }

  const response = await fetchImpl("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
      "x-api-key": apiKey,
    },
    body: JSON.stringify({
      model: "claude-haiku-4-5",
      max_tokens: 4096,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: JSON.stringify(input, null, 2),
        },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error(`Anthropic request failed with ${response.status}`);
  }

  const message = anthropicMessagesResponseSchema.parse(await response.json());
  const raw = cleanJsonText(extractTextContent(message.content));

  return companyDepartmentEnrichmentSchema.parse(JSON.parse(raw));
}
