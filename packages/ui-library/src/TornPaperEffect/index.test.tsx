import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { TornPaperEffect } from ".";

describe("given a <TornPaperEffect>", () => {
  test("it renders the component successfully", () => {
    render(<TornPaperEffect/>);
    expect(screen.getByText("Start working here")).toBeInTheDocument();
  });
});
