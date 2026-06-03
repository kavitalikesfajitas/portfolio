import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { StatusBlock } from ".";

describe("given a <StatusBlock>", () => {
  test("it renders the component successfully", () => {
    render(<StatusBlock>Current status</StatusBlock>);
    expect(screen.getByText("Current status")).toBeInTheDocument();
  });
});
