import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { NonMainNav } from ".";

describe.skip("given a <NonMainNav>", () => {
  test("it renders the component successfully", () => {
    render(<NonMainNav />);
    expect(screen.getByText("Living Kavita Loca")).toBeInTheDocument();
  });
});
