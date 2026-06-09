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

export const revalidate = 86_400;
const DEPARTMENTS_CACHE_CONTROL =
  "public, s-maxage=86400, stale-while-revalidate=3600";

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
      {
        status: 200,
        headers: { "Cache-Control": DEPARTMENTS_CACHE_CONTROL },
      },
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to fetch departments";

    return NextResponse.json({ error: message }, { status: 502 });
  }
}
