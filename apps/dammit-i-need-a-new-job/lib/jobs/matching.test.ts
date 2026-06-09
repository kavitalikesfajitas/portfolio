import { describe, expect, it } from "vitest";
import { matchJobsByTitleTerm } from "./matching";
import type { NormalizedJob } from "./providers/greenhouse/normalize";

const baseJob: NormalizedJob = {
  id: "greenhouse:1",
  provider: "greenhouse",
  providerJobId: 1,
  internalJobId: null,
  title: "Senior Product Engineer",
  location: null,
  absoluteUrl: "https://job-boards.greenhouse.io/acme/jobs/1",
  updatedAt: "2026-06-01T15:20:00-04:00",
  requisitionId: null,
  language: null,
  companyName: null,
  firstPublishedAt: null,
  departments: [],
  offices: [],
};

describe("matchJobsByTitleTerm", () => {
  it("returns title matches without changing the job data", () => {
    const accountExecutive = {
      ...baseJob,
      id: "greenhouse:2",
      providerJobId: 2,
      title: "Account Executive",
    };

    expect(
      matchJobsByTitleTerm([baseJob, accountExecutive], "engineer"),
    ).toEqual([
      {
        job: baseJob,
        matchedFields: ["title"],
        matchedTerms: ["engineer"],
      },
    ]);
  });

  it("matches case-insensitively", () => {
    expect(matchJobsByTitleTerm([baseJob], "ENGINEER")).toHaveLength(1);
  });
});
