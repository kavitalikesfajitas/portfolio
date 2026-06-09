import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { DividedPanel, DividedPanelItem, DividedPanelItemHeader } from ".";

describe("given a <DividedPanel>", () => {
  test("it renders stat item content", () => {
    render(
      <DividedPanel>
        <DividedPanelItem>
          <DividedPanelItemHeader>Interviews</DividedPanelItemHeader>
          <div>2</div>
        </DividedPanelItem>
      </DividedPanel>,
    );

    expect(screen.getByText("Interviews")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
  });
});
