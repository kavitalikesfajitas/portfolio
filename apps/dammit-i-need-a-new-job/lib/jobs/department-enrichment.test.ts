import { afterEach, describe, expect, test, vi } from "vitest";
import {
  buildDepartmentEnrichmentInput,
  enrichDepartmentsWithLlm,
  isLlmDepartmentEnrichmentEnabled,
} from "./department-enrichment";
import type { GreenhouseDepartment } from "./providers/greenhouse/schema";

function jsonResponse(body: unknown, status = 200) {
  return {
    ok: status >= 200 && status < 300,
    status,
    json: async () => body,
  } as Response;
}

describe("department enrichment", () => {
  const originalFlag = process.env.ENABLE_LLM_DEPARTMENT_ENRICHMENT;

  afterEach(() => {
    vi.restoreAllMocks();
    process.env.ENABLE_LLM_DEPARTMENT_ENRICHMENT = originalFlag;
  });

  test("is disabled unless the env var is exactly true", () => {
    delete process.env.ENABLE_LLM_DEPARTMENT_ENRICHMENT;
    expect(isLlmDepartmentEnrichmentEnabled()).toBe(false);

    process.env.ENABLE_LLM_DEPARTMENT_ENRICHMENT = "false";
    expect(isLlmDepartmentEnrichmentEnabled()).toBe(false);

    process.env.ENABLE_LLM_DEPARTMENT_ENRICHMENT = "true";
    expect(isLlmDepartmentEnrichmentEnabled()).toBe(true);
  });

  test("builds a compact department payload without descriptions", () => {
    const departments: GreenhouseDepartment[] = [
      {
        id: 12,
        name: "Payins - Eng",
        parent_id: null,
        child_ids: [13],
        jobs: Array.from({ length: 10 }, (_, index) => ({
          id: index + 1,
          internal_job_id: null,
          title: `Payments Engineer ${index + 1}`,
          updated_at: "2026-06-01T00:00:00.000Z",
          absolute_url: `https://example.com/jobs/${index + 1}`,
        })),
      },
    ];

    expect(
      buildDepartmentEnrichmentInput({
        companyToken: "stripe",
        departments,
        sampleJobTitleLimit: 2,
      }),
    ).toEqual({
      companyToken: "stripe",
      departments: [
        {
          id: 12,
          name: "Payins - Eng",
          parentId: null,
          childIds: [13],
          sampleJobTitles: ["Payments Engineer 1", "Payments Engineer 2"],
        },
      ],
    });
  });

  test("parses valid LLM JSON", async () => {
    const fetchImpl = vi.fn<typeof fetch>().mockResolvedValue(
      jsonResponse({
        content: [
          {
            type: "text",
            text: JSON.stringify({
              companyToken: "stripe",
              departments: [
                {
                  departmentId: 12,
                  displayName: "Payins",
                  category: "engineering",
                  aliases: ["payments", "money movement"],
                  confidence: "high",
                  reasoning: "Department suffix and job titles indicate eng.",
                },
              ],
            }),
          },
        ],
      }),
    );

    await expect(
      enrichDepartmentsWithLlm({
        apiKey: "test-key",
        fetchImpl,
        input: { companyToken: "stripe", departments: [] },
      }),
    ).resolves.toEqual({
      companyToken: "stripe",
      departments: [
        {
          departmentId: 12,
          displayName: "Payins",
          category: "engineering",
          aliases: ["payments", "money movement"],
          confidence: "high",
          reasoning: "Department suffix and job titles indicate eng.",
        },
      ],
    });
  });

  test("rejects invalid model output", async () => {
    const fetchImpl = vi.fn<typeof fetch>().mockResolvedValue(
      jsonResponse({
        content: [
          {
            type: "text",
            text: JSON.stringify({
              companyToken: "stripe",
              departments: [{ departmentId: 12, displayName: "" }],
            }),
          },
        ],
      }),
    );

    await expect(
      enrichDepartmentsWithLlm({
        apiKey: "test-key",
        fetchImpl,
        input: { companyToken: "stripe", departments: [] },
      }),
    ).rejects.toThrow();
  });

  test("surfaces upstream failures", async () => {
    const fetchImpl = vi
      .fn<typeof fetch>()
      .mockResolvedValue(jsonResponse({ error: "nope" }, 502));

    await expect(
      enrichDepartmentsWithLlm({
        apiKey: "test-key",
        fetchImpl,
        input: { companyToken: "stripe", departments: [] },
      }),
    ).rejects.toThrow("Anthropic request failed with 502");
  });
});
