import { NextResponse } from "next/server";
import { assertAuthorized } from "./utils";

type RouteContext = {
  params: Promise<{ source: string }>;
};

export async function GET(_request: Request, { params }: RouteContext) {
  const isAuthorized =
    assertAuthorized(_request) || process.env.NODE_ENV === "development";

  if (!isAuthorized) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { source } = await params;

  // TODO: fetch and normalize jobs for the given source
  return NextResponse.json(
    {
      source,
      jobs: [],
    },
    { status: 200 },
  );
}
