import { type NextRequest, NextResponse } from "next/server";
import { verifyApiKey } from "@/lib/auth/api-key";
import { matchJobsByTitleTerm } from "@/lib/jobs/matching";
import { JOB_PROVIDERS } from "@/lib/jobs/providers";
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

  console.log({ parsedQuery });
  if (!parsedQuery.success) {
    return NextResponse.json({ error: "Invalid query" }, { status: 400 });
  }

  const { provider, identifier } = parsedParams.data;
  const { term } = parsedQuery.data;

  try {
    const {
      jobs: normalizedJobs,
      revalidate,
      upstreamTotal,
    } = await JOB_PROVIDERS[provider].fetchJobs(identifier);
    const jobs = term
      ? matchJobsByTitleTerm(normalizedJobs, term).map((match) => match.job)
      : normalizedJobs;

    return NextResponse.json(
      {
        provider,
        identifier,
        resource: "jobs",
        endpoint: "jobs",
        jobs,
        meta: {
          total: jobs.length,
          upstreamTotal,
          filter: term
            ? {
                field: "title",
                operator: "contains",
                value: term,
                totalBeforeFilter: normalizedJobs.length,
              }
            : null,
          cache: { revalidate },
        },
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "private, no-store",
          Vary: "x-api-key",
        },
      },
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to fetch jobs";

    return NextResponse.json({ error: message }, { status: 502 });
  }
}
