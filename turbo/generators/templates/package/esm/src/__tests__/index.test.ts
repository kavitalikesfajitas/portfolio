import { describe, it, expect } from "vitest";

describe("hello world", () => {
  it("says hello", () => {
    expect("hello world").toBe("hello world");
  });
});
