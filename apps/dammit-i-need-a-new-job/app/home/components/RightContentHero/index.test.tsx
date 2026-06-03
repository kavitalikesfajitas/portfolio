import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { RightContentHero } from ".";

describe("given a <RightContentHero>", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test("it updates the days since laid off counter", async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    vi.setSystemTime(new Date(2026, 5, 3, 12));

    render(<RightContentHero />);

    await waitFor(() => {
      expect(screen.getByText("37")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole("button", { name: "Add one day" }));
    expect(screen.getByText("38")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Subtract one day" }));
    expect(screen.getByText("37")).toBeInTheDocument();
  });

  test("it loads the saved counter after mount", async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    vi.setSystemTime(new Date(2026, 5, 3, 12));
    window.localStorage.setItem("dammit.daysSinceLaidOff", "42");

    render(<RightContentHero />);

    expect(screen.queryByText("37")).not.toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("42")).toBeInTheDocument();
    });
  });
});
