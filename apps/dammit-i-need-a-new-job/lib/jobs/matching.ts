import type { NormalizedJob } from "./providers/greenhouse/normalize";

export type JobTitleMatch = {
  job: NormalizedJob;
  matchedFields: ["title"];
  matchedTerms: string[];
};

export function matchJobsByTitleTerm(
  jobs: NormalizedJob[],
  term: string,
): JobTitleMatch[] {
  const normalizedTerm = term.trim().toLowerCase();

  if (!normalizedTerm) {
    return [];
  }

  return jobs
    .filter((job) => job.title.toLowerCase().includes(normalizedTerm))
    .map((job) => ({
      job,
      matchedFields: ["title"],
      matchedTerms: [normalizedTerm],
    }));
}
