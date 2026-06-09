import { type NextRequest, NextResponse } from "next/server";
import { verifyApiKey } from "@/lib/auth/api-key";
import { matchJobsByTitleTerm } from "@/lib/jobs/matching";
import {
  fetchGreenhouseJobs,
  GREENHOUSE_JOBS_REVALIDATE_SECONDS,
} from "@/lib/jobs/providers/greenhouse/client";
import { normalizeGreenhouseJobs } from "@/lib/jobs/providers/greenhouse/normalize";
import { jobsRouteParamsSchema, jobsRouteQuerySchema } from "./schema";

type RouteContext = {
  params: Promise<{ provider: string; identifier: string }>;
};

export async function GET(request: NextRequest, { params }: RouteContext) {
  const apiKey = verifyApiKey(request);

  if (!apiKey.ok) {
    return apiKey.response;
  }

  const parsedParams = jobsRouteParamsSchema.safeParse(await params);

  if (!parsedParams.success) {
    return NextResponse.json(
      { error: "Unsupported provider or identifier" },
      { status: 400 },
    );
  }

  const parsedQuery = jobsRouteQuerySchema.safeParse(
    Object.fromEntries(request.nextUrl.searchParams),
  );

  if (!parsedQuery.success) {
    return NextResponse.json({ error: "Invalid query" }, { status: 400 });
  }

  const { provider, identifier } = parsedParams.data;
  const { content, term } = parsedQuery.data;

  try {
    const jobsResponse = await fetchGreenhouseJobs(identifier, {
      includeContent: content,
    });
    const normalizedJobs = normalizeGreenhouseJobs(jobsResponse.jobs);
    const jobs = term
      ? matchJobsByTitleTerm(normalizedJobs, term).map((match) => match.job)
      : normalizedJobs;

    return NextResponse.json(
      {
        provider,
        identifier,
        resource: "jobs",
        endpoint: content ? "jobs?content=true" : "jobs",
        jobs,
        meta: {
          total: jobs.length,
          upstreamTotal: jobsResponse.meta.total,
          filter: term
            ? {
                field: "title",
                operator: "contains",
                value: term,
                totalBeforeFilter: normalizedJobs.length,
              }
            : null,
          cache: { revalidate: GREENHOUSE_JOBS_REVALIDATE_SECONDS },
        },
      },
      { status: 200 },
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to fetch jobs";

    return NextResponse.json({ error: message }, { status: 502 });
  }
}
