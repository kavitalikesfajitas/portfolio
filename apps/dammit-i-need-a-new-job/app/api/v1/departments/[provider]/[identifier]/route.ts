import { NextResponse } from "next/server";
import { JOB_PROVIDERS } from "@/lib/jobs/providers";
import { departmentsRouteParamsSchema } from "./schema";

type RouteContext = {
  params: Promise<{ provider: string; identifier: string }>;
};

// Lean into Next's ISR: prerender each board's response and regenerate it at
// most once per day. Unknown identifiers are generated on-demand and cached
// (dynamicParams defaults to true), so no generateStaticParams is needed for
// what is an open, user-supplied board token. On Vercel, Next emits the
// s-maxage/stale-while-revalidate headers and propagates on-demand purges to
// the edge, so we no longer hand-roll Cache-Control here.
export const dynamic = "force-static";
export const revalidate = 86_400;

export async function GET(_request: Request, { params }: RouteContext) {
  const parsedParams = departmentsRouteParamsSchema.safeParse(await params);

  if (!parsedParams.success) {
    return NextResponse.json(
      { error: "Unsupported provider or identifier" },
      { status: 400 },
    );
  }

  const { provider, identifier } = parsedParams.data;

  try {
    const { departments, revalidate } =
      await JOB_PROVIDERS[provider].fetchDepartments(identifier);

    return NextResponse.json(
      {
        provider,
        identifier,
        resource: "departments",
        endpoint: "departments",
        departments,
        meta: {
          totalDepartments: departments.length,
          totalNestedJobs: departments.reduce(
            (total, department) => total + department.jobCount,
            0,
          ),
          likelyEngineeringDepartments: departments.filter(
            (department) => department.signals.likelyEngineering,
          ).length,
          cache: { revalidate },
        },
      },
      { status: 200 },
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to fetch departments";

    return NextResponse.json({ error: message }, { status: 502 });
  }
}
