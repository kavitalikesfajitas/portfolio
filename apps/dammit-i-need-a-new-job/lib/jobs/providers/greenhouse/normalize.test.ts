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
        updatedAt: "2026-06-01T15:20:00-04:00",
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
});
