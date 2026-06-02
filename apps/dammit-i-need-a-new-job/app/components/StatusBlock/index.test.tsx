import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { StatusBlock } from ".";

describe("given a <StatusBlock>", () => {
  test("it renders the component successfully", () => {
    render(<StatusBlock/>);
    expect(screen.getByText("Start working here")).toBeInTheDocument();
  });
});
