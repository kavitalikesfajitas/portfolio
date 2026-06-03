import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, test } from "vitest";
import { RightContentHero } from ".";

describe("given a <RightContentHero>", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  test("it updates the days since laid off counter", () => {
    render(<RightContentHero />);

    expect(screen.getByText("32")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Add one day" }));
    expect(screen.getByText("33")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Subtract one day" }));
    expect(screen.getByText("32")).toBeInTheDocument();
  });

  test("it loads the saved counter after mount", async () => {
    window.localStorage.setItem("dammit.daysSinceLaidOff", "42");

    render(<RightContentHero />);

    await waitFor(() => {
      expect(screen.getByText("42")).toBeInTheDocument();
    });
  });
});
