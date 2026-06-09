import { NextResponse } from "next/server";
import {
  fetchGreenhouseJobs,
  GREENHOUSE_JOBS_REVALIDATE_SECONDS,
} from "@/lib/jobs/providers/greenhouse/client";
import { normalizeGreenhouseJobs } from "@/lib/jobs/providers/greenhouse/normalize";
import { jobsRouteParamsSchema, jobsRouteQuerySchema } from "./schema";

type RouteContext = {
  params: Promise<{ provider: string; identifier: string }>;
};

export async function GET(request: Request, { params }: RouteContext) {
  const parsedParams = jobsRouteParamsSchema.safeParse(await params);

  if (!parsedParams.success) {
    return NextResponse.json(
      { error: "Unsupported provider or identifier" },
      { status: 400 },
    );
  }

  const url = new URL(request.url);
  const parsedQuery = jobsRouteQuerySchema.safeParse({
    content: url.searchParams.get("content") ?? undefined,
  });

  if (!parsedQuery.success) {
    return NextResponse.json({ error: "Invalid query" }, { status: 400 });
  }

  const { provider, identifier } = parsedParams.data;
  const { content } = parsedQuery.data;

  try {
    const jobsResponse = await fetchGreenhouseJobs(identifier, {
      includeContent: content,
    });
    const jobs = normalizeGreenhouseJobs(jobsResponse.jobs);

    return NextResponse.json(
      {
        provider,
        identifier,
        resource: "jobs",
        endpoint: content ? "jobs?content=true" : "jobs",
        jobs,
        meta: {
          totalJobs: jobs.length,
          upstreamTotalJobs: jobsResponse.meta.total,
          content,
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
