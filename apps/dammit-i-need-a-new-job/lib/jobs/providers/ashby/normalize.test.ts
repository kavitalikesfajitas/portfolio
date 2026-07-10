import { describe, expect, it } from "vitest";
import { normalizeAshbyDepartments, normalizeAshbyJobs } from "./normalize";

describe("normalizeAshbyJobs", () => {
  it("maps Ashby jobs into the internal job shape", () => {
    expect(
      normalizeAshbyJobs([
        {
          id: "job_123",
          title: "Senior Product Engineer",
          department: "Engineering",
          team: "Product Engineering",
          location: "Remote - United States",
          publishedDate: "2026-06-01T15:20:00-04:00",
          jobUrl: "https://jobs.ashbyhq.com/acme/job_123",
          applyUrl: "https://jobs.ashbyhq.com/acme/application/job_123",
        },
      ]),
    ).toEqual([
      expect.objectContaining({
        id: "ashby:job_123",
        provider: "ashby",
        providerJobId: "job_123",
        title: "Senior Product Engineer",
        location: "Remote - United States",
        absoluteUrl: "https://jobs.ashbyhq.com/acme/job_123",
        updatedAt: "2026-06-01T19:20:00.000Z",
        firstPublishedAt: "2026-06-01T19:20:00.000Z",
        departments: [
          expect.objectContaining({
            name: "Product Engineering",
            parentId: null,
            childIds: [],
          }),
        ],
      }),
    ]);
  });
});

describe("normalizeAshbyDepartments", () => {
  it("groups listed Ashby jobs by team and classifies engineering departments", () => {
    const departments = normalizeAshbyDepartments([
      {
        id: "job_123",
        title: "Product Engineer",
        department: "Engineering",
        team: "Product Engineering",
        location: "Remote",
        publishedDate: "2026-06-01T00:00:00.000Z",
        jobUrl: "https://jobs.ashbyhq.com/acme/job_123",
      },
      {
        id: "job_456",
        title: "Lifecycle Marketer",
        department: "Marketing",
        team: "Marketing",
        location: "Remote",
        publishedDate: "2026-06-01T00:00:00.000Z",
        isListed: false,
        jobUrl: "https://jobs.ashbyhq.com/acme/job_456",
      },
    ]);

    expect(departments).toHaveLength(1);
    expect(departments[0]).toEqual(
      expect.objectContaining({
        name: "Product Engineering",
        jobCount: 1,
        signals: expect.objectContaining({
          likelyEngineering: true,
          normalizedName: "Product Engineering",
          category: "engineering",
        }),
      }),
    );
  });
});
