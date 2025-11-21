import { describe, test, expect } from "vitest";
import { render } from "@testing-library/react";
import { TornPaperEffect } from ".";

describe("given a <TornPaperEffect>", () => {
  test("it renders the component successfully", () => {
    const { container } = render(<TornPaperEffect />);
    const firstChild = container.firstChild as HTMLElement;
    expect(firstChild).toHaveClass("ragged-text-filter bg-white text-gray-950");
  });
});
