import { describe, test, expect } from "vitest";
import { render } from "@testing-library/react";
import { Nav } from ".";

describe("given a <TornPaperEffect>", () => {
  test("it renders the component successfully", () => {
    const { container, debug } = render(<Nav isMobile={false} />);
  });
});
