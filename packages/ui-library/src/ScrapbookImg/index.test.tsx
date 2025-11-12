import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ScrapbookImg } from ".";

describe("given a <ScrapbookImg>", () => {
  test("it renders the component successfully", () => {
    render(<ScrapbookImg/>);
    expect(screen.getByText("Start working here")).toBeInTheDocument();
  });
});
