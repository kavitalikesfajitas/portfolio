import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Hero } from ".";

describe("given a <Hero>", () => {
  test("it renders the component successfully", () => {
    render(<Hero />);
    expect(screen.getByText("Start working here")).toBeInTheDocument();
  });
});
