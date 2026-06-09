import { NextResponse } from "next/server";
import {
  fetchGreenhouseDepartments,
  GREENHOUSE_DEPARTMENTS_REVALIDATE_SECONDS,
} from "@/lib/jobs/providers/greenhouse/client";
import { normalizeGreenhouseDepartments } from "@/lib/jobs/providers/greenhouse/normalize";
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
    const departmentsResponse = await fetchGreenhouseDepartments(identifier);
    const departments = normalizeGreenhouseDepartments(
      departmentsResponse.departments,
    );

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
          cache: { revalidate: GREENHOUSE_DEPARTMENTS_REVALIDATE_SECONDS },
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
