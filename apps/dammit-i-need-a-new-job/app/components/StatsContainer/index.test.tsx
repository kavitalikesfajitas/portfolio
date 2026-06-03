import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { StatsContainer } from ".";

describe("given a <StatsContainer>", () => {
  test("it renders the component successfully", () => {
    render(<StatsContainer>Stats content</StatsContainer>);
    expect(screen.getByText("Stats content")).toBeInTheDocument();
  });
});
