import { timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";

export const API_KEY_HEADER = "x-api-key";

type ApiKeyVerificationResult =
  | { ok: true }
  | { ok: false; response: NextResponse };

function isDevelopment() {
  return process.env.NODE_ENV === "development";
}

function safeEqual(a: string, b: string): boolean {
  const aBuffer = Buffer.from(a);
  const bBuffer = Buffer.from(b);

  // timingSafeEqual throws on length mismatch; compare lengths separately so a
  // wrong-length key still takes a comparable amount of time to reject.
  if (aBuffer.length !== bBuffer.length) {
    timingSafeEqual(aBuffer, aBuffer);
    return false;
  }

  return timingSafeEqual(aBuffer, bBuffer);
}

/**
 * Verifies the request carries a valid `x-api-key` header outside development.
 */
export function verifyApiKey(request: Request): ApiKeyVerificationResult {
  if (isDevelopment()) {
    return { ok: true };
  }

  const expected = process.env.JOBS_API_KEY;

  if (!expected) {
    return {
      ok: false,
      response: NextResponse.json(
        { error: "Server misconfiguration" },
        { status: 500 },
      ),
    };
  }

  const provided = request.headers.get(API_KEY_HEADER);

  if (!provided || !safeEqual(provided, expected)) {
    return {
      ok: false,
      response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
    };
  }

  return { ok: true };
}
