import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { NavBar } from ".";

describe("given a <NavBar>", () => {
  test("then it renders the children", () => {
    render(<NavBar navLinks={[]} />);
    expect(screen.getByText("Open main menu")).toBeInTheDocument();
  });
});
