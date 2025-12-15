import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { HeroContainer } from ".";

describe("given a <Container>", () => {
  test("it renders the component successfully", () => {
    render(<HeroContainer />);
    expect(screen.getByText("Start working here")).toBeInTheDocument();
  });
});
