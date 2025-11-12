import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { HelloWorld } from ".";

describe("given a <HelloWorld>", () => {
  test("then it renders the children", () => {
    render(<HelloWorld>Hello World!</HelloWorld>);
    expect(screen.getByText("Hello World!")).toBeInTheDocument();
  });
});
