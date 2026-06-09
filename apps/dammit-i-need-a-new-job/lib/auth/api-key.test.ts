import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { API_KEY_HEADER, verifyApiKey } from "./api-key";

const VALID_KEY = "super-secret-key";

function requestWithKey(key?: string): Request {
  const headers = new Headers();

  if (key !== undefined) {
    headers.set(API_KEY_HEADER, key);
  }

  return new Request("https://example.com/api/v1/jobs/greenhouse/acme", {
    headers,
  });
}

describe("verifyApiKey", () => {
  beforeEach(() => {
    vi.stubEnv("NODE_ENV", "test");
    vi.stubEnv("JOBS_API_KEY", VALID_KEY);
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("allows requests without a key in development", () => {
    vi.stubEnv("NODE_ENV", "development");
    vi.stubEnv("JOBS_API_KEY", "");

    expect(verifyApiKey(requestWithKey())).toEqual({ ok: true });
  });

  it("allows a request with the matching key", () => {
    expect(verifyApiKey(requestWithKey(VALID_KEY))).toEqual({ ok: true });
  });

  it("rejects a request with a wrong key", async () => {
    const result = verifyApiKey(requestWithKey("nope"));

    expect(result.ok).toBe(false);

    if (!result.ok) {
      expect(result.response.status).toBe(401);
      await expect(result.response.json()).resolves.toEqual({
        error: "Unauthorized",
      });
    }
  });

  it("rejects a request missing the key header", () => {
    const result = verifyApiKey(requestWithKey());

    expect(result.ok).toBe(false);

    if (!result.ok) {
      expect(result.response.status).toBe(401);
    }
  });

  it("rejects a request whose key is a prefix of the expected key", () => {
    const result = verifyApiKey(requestWithKey(VALID_KEY.slice(0, 4)));

    expect(result.ok).toBe(false);

    if (!result.ok) {
      expect(result.response.status).toBe(401);
    }
  });

  it("returns 500 when the server key is not configured", () => {
    vi.stubEnv("JOBS_API_KEY", "");

    const result = verifyApiKey(requestWithKey(VALID_KEY));

    expect(result.ok).toBe(false);

    if (!result.ok) {
      expect(result.response.status).toBe(500);
    }
  });
});
