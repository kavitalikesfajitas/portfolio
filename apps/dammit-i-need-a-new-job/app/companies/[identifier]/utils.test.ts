import { describe, expect, it } from "vitest";
import type { GreenhouseDepartment } from "@/lib/jobs/providers/greenhouse/schema";
import { buildCompanyJobsView } from "./utils";

function makeJob(
  id: number,
  title: string,
  updatedAt = "2026-06-01T00:00:00.000Z",
): GreenhouseDepartment["jobs"][number] {
  return {
    id,
    internal_job_id: null,
    title,
    updated_at: updatedAt,
    requisition_id: null,
    location: { name: "Remote" },
    absolute_url: `https://job-boards.greenhouse.io/acme/jobs/${id}`,
    language: "en",
    departments: [],
    offices: [],
  };
}

describe("buildCompanyJobsView", () => {
  it("builds company detail jobs from department-nested jobs", () => {
    const departments: GreenhouseDepartment[] = [
      {
        id: 1,
        name: "Engineering",
        parent_id: null,
        child_ids: [],
        jobs: [
          makeJob(101, "Product Engineer"),
          makeJob(102, "Infrastructure Engineer"),
        ],
      },
      {
        id: 2,
        name: "Marketing",
        parent_id: null,
        child_ids: [],
        jobs: [makeJob(201, "Lifecycle Marketer")],
      },
    ];

    const view = buildCompanyJobsView(departments);

    expect(view.totalEngineeringJobs).toBe(2);
    expect(view.departmentOptions).toEqual([{ name: "Engineering", count: 2 }]);
    expect(view.jobs).toEqual([
      expect.objectContaining({
        id: "greenhouse:101",
        title: "Product Engineer",
        departments: ["Engineering"],
        searchTerms: [],
      }),
      expect.objectContaining({
        id: "greenhouse:102",
        title: "Infrastructure Engineer",
        departments: ["Engineering"],
        searchTerms: [],
      }),
    ]);
  });

  it("dedupes jobs that appear in multiple engineering departments", () => {
    const sharedJob = makeJob(101, "Platform Engineer");
    const departments: GreenhouseDepartment[] = [
      {
        id: 1,
        name: "Engineering",
        parent_id: null,
        child_ids: [],
        jobs: [sharedJob],
      },
      {
        id: 2,
        name: "Infrastructure Engineering",
        parent_id: null,
        child_ids: [],
        jobs: [sharedJob],
      },
    ];

    const view = buildCompanyJobsView(departments);

    expect(view.totalEngineeringJobs).toBe(1);
    expect(view.jobs).toEqual([
      expect.objectContaining({
        id: "greenhouse:101",
        departments: ["Engineering", "Infrastructure Engineering"],
        searchTerms: [],
      }),
    ]);
  });

  it("uses provided enrichment for display names and search terms", () => {
    const departments: GreenhouseDepartment[] = [
      {
        id: 1,
        name: "Payins - Eng",
        parent_id: null,
        child_ids: [],
        jobs: [makeJob(101, "Software Engineer")],
      },
    ];

    const view = buildCompanyJobsView(departments, {
      "1": {
        displayName: "Payins",
        category: "engineering",
        aliases: ["payments", "money movement"],
        confidence: "high",
        reasoning: "Stripe team name with engineering suffix.",
      },
    });

    expect(view.departmentOptions).toEqual([{ name: "Payins", count: 1 }]);
    expect(view.jobs).toEqual([
      expect.objectContaining({
        id: "greenhouse:101",
        departments: ["Payins"],
        searchTerms: [
          "Payins - Eng",
          "Payins",
          "engineering",
          "payments",
          "money movement",
        ],
      }),
    ]);
  });
});
