import { describe, expect, it } from "vitest";
import {
  normalizeGreenhouseDepartments,
  normalizeGreenhouseJobs,
} from "./normalize";

describe("normalizeGreenhouseJobs", () => {
  it("maps Greenhouse jobs into the internal job shape", () => {
    expect(
      normalizeGreenhouseJobs([
        {
          id: 123,
          internal_job_id: 456,
          title: "Senior Product Engineer",
          updated_at: "2026-06-01T15:20:00-04:00",
          requisition_id: "ENG-1",
          location: { name: "Remote - United States" },
          absolute_url: "https://job-boards.greenhouse.io/acme/jobs/123",
          language: "en",
          departments: [
            {
              id: 1,
              name: "Engineering",
              parent_id: null,
              child_ids: [],
            },
          ],
          offices: [],
        },
      ]),
    ).toEqual([
      {
        id: "greenhouse:123",
        provider: "greenhouse",
        providerJobId: 123,
        internalJobId: 456,
        title: "Senior Product Engineer",
        location: "Remote - United States",
        absoluteUrl: "https://job-boards.greenhouse.io/acme/jobs/123",
        updatedAt: "2026-06-01T19:20:00.000Z",
        requisitionId: "ENG-1",
        language: "en",
        companyName: null,
        firstPublishedAt: null,
        departments: [
          {
            id: 1,
            name: "Engineering",
            parentId: null,
            childIds: [],
          },
        ],
        offices: [],
      },
    ]);
  });
});

describe("normalizeGreenhouseDepartments", () => {
  it("keeps departments heuristic-only and nests normalized jobs", () => {
    const [department] = normalizeGreenhouseDepartments([
      {
        id: 1,
        name: "Customer Success Engineering",
        parent_id: null,
        child_ids: [],
        jobs: [
          {
            id: 123,
            internal_job_id: null,
            title: "Support Engineer",
            updated_at: "2026-06-01T15:20:00-04:00",
            requisition_id: null,
            location: null,
            absolute_url: "https://job-boards.greenhouse.io/acme/jobs/123",
            language: "en",
          },
        ],
      },
    ]);

    if (!department) {
      throw new Error("Expected department to be defined");
    }

    expect(department.signals).toEqual({
      likelyEngineering: true,
      matchedTerms: ["engineering", "engineer"],
      normalizedName: "Customer Success Engineering",
      category: "engineering",
      categoryConfidence: "high",
      categoryMatchedTerms: ["engineering", "engineer"],
    });
    expect(department.jobs[0]?.departments).toEqual([
      {
        id: 1,
        name: "Customer Success Engineering",
        parentId: null,
        childIds: [],
      },
    ]);
  });

  it("classifies company-specific department labels into coarse categories", () => {
    const departments = normalizeGreenhouseDepartments([
      {
        id: 1,
        name: "1133 EMEA Sales Development Reps",
        parent_id: null,
        child_ids: [],
        jobs: [],
      },
      {
        id: 2,
        name: "1120 Training & Certification",
        parent_id: null,
        child_ids: [],
        jobs: [],
      },
      {
        id: 3,
        name: "1098 Project Elsewhere",
        parent_id: null,
        child_ids: [],
        jobs: [],
      },
    ]);

    expect(departments.map((department) => department.signals)).toEqual([
      {
        likelyEngineering: false,
        matchedTerms: [],
        normalizedName: "EMEA Sales Development Reps",
        category: "sales",
        categoryConfidence: "high",
        categoryMatchedTerms: ["sales", "sales development"],
      },
      {
        likelyEngineering: false,
        matchedTerms: [],
        normalizedName: "Training & Certification",
        category: "customerSuccess",
        categoryConfidence: "high",
        categoryMatchedTerms: ["training", "certification"],
      },
      {
        likelyEngineering: false,
        matchedTerms: [],
        normalizedName: "Project Elsewhere",
        category: "unspecified",
        categoryConfidence: "low",
        categoryMatchedTerms: [],
      },
    ]);
  });

  it("does not tag '... Development' teams as engineering via 'developer'", () => {
    const departments = normalizeGreenhouseDepartments(
      ["Corporate Development", "Policy Development", "Talent Development"].map(
        (name, index) => ({
          id: index + 1,
          name,
          parent_id: null,
          child_ids: [],
          jobs: [],
        }),
      ),
    );

    for (const department of departments) {
      expect(department.signals.likelyEngineering).toBe(false);
      expect(department.signals.category).not.toBe("engineering");
    }
  });

  it("uses fuzzy matching for noisy department labels", () => {
    const [department] = normalizeGreenhouseDepartments([
      {
        id: 1,
        name: "2200 Enginering Platform",
        parent_id: null,
        child_ids: [],
        jobs: [],
      },
    ]);

    expect(department?.signals).toEqual({
      likelyEngineering: true,
      matchedTerms: ["engineering", "engineer"],
      normalizedName: "Enginering Platform",
      category: "engineering",
      categoryConfidence: "high",
      categoryMatchedTerms: ["engineering", "engineer"],
    });
  });
});
