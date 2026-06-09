import { NextResponse } from "next/server";
import { fetchGreenHouseJobsForCompany } from "./api";
import { validSources } from "./constants";
import { assertAuthorized, isValidCompany, isValidSource } from "./utils";

type RouteContext = {
  params: Promise<{ source: string; identifier: string }>;
};

export async function GET(_request: Request, { params }: RouteContext) {
  const isAuthorized =
    assertAuthorized(_request) || process.env.NODE_ENV === "development";

  if (!isAuthorized) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { source, identifier } = await params;
  if (!isValidSource(source) || !isValidCompany(identifier)) {
    return NextResponse.json(
      { error: "Unauthorized Company" },
      { status: 401 },
    );
  }
  const { jobs, meta } = await fetchGreenHouseJobsForCompany(identifier);
  return NextResponse.json(
    { source, company: identifier, jobs, meta },
    { status: 200 },
  );

  return NextResponse.json({ error: "Unsupported source" }, { status: 404 });
}
