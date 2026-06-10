import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { CompanyJobsTable } from "./CompanyJobsTable";
import type { CompanyJob, DepartmentFilterOption } from "../types";

const departmentOptions = Array.from({ length: 12 }, (_, index) => ({
  name: `Team ${index + 1}`,
  count: index + 1,
})) satisfies DepartmentFilterOption[];

function mockMatchMedia(matches: boolean) {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: (query: string) => ({
      matches,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }),
  });
}

function renderCompanyJobsTable() {
  return render(
    <CompanyJobsTable jobs={[]} departmentOptions={departmentOptions} />,
  );
}

function makeJobs(count: number): CompanyJob[] {
  return Array.from({ length: count }, (_, index) => ({
    id: `job-${index + 1}`,
    title: `Job ${index + 1}`,
    absoluteUrl: `https://example.com/jobs/${index + 1}`,
    location: "Remote",
    departments: ["Team 1"],
    updatedAt: "2026-06-01T00:00:00.000Z",
  }));
}

function getFilterContent(buttonName: string) {
  const button = screen.getByRole("button", { name: buttonName });
  const contentId = button.getAttribute("aria-controls");

  expect(contentId).toBeTruthy();

  const content = document.getElementById(contentId as string);

  expect(content).not.toBeNull();

  return { button, content: content as HTMLElement };
}

describe("given a <CompanyJobsTable>", () => {
  test("it collapses filters below the two-column layout and reveals the first 10 team filters", () => {
    mockMatchMedia(false);

    renderCompanyJobsTable();

    const { button, content } = getFilterContent("Show");

    expect(button).toHaveAttribute("aria-expanded", "false");
    expect(content).toHaveAttribute("data-state", "closed");
    expect(content).toHaveClass("hidden");

    fireEvent.click(button);

    expect(screen.getByRole("button", { name: "Hide" })).toHaveAttribute(
      "aria-expanded",
      "true",
    );
    expect(content).toHaveAttribute("data-state", "open");
    expect(content).toHaveClass("block");
    expect(screen.getAllByRole("checkbox")).toHaveLength(10);
    expect(screen.getByRole("button", { name: "Show 2 more" })).toBeVisible();
  });

  test("it reveals additional team filters on request", () => {
    mockMatchMedia(false);

    renderCompanyJobsTable();

    fireEvent.click(screen.getByRole("button", { name: "Show" }));
    fireEvent.click(screen.getByRole("button", { name: "Show 2 more" }));

    expect(screen.getAllByRole("checkbox")).toHaveLength(12);
    expect(screen.getByRole("button", { name: "Show fewer" })).toBeVisible();
  });

  test("it keeps filters open in the two-column layout", async () => {
    mockMatchMedia(true);

    renderCompanyJobsTable();

    const { button, content } = getFilterContent("Show");

    await waitFor(() => {
      expect(button).toHaveAttribute("aria-expanded", "true");
      expect(content).toHaveAttribute("data-state", "open");
      expect(content).toHaveClass("block");
    });
  });

  test("it renders the first 25 jobs before showing more on request", () => {
    mockMatchMedia(true);

    render(
      <CompanyJobsTable
        jobs={makeJobs(28)}
        departmentOptions={departmentOptions}
      />,
    );

    expect(screen.getByRole("heading", { name: "Job 1" })).toBeVisible();
    expect(screen.getByRole("heading", { name: "Job 25" })).toBeVisible();
    expect(
      screen.queryByRole("heading", { name: "Job 26" }),
    ).not.toBeInTheDocument();
    expect(screen.getByText("Showing 25 of 28 jobs.")).toBeVisible();

    fireEvent.click(screen.getByRole("button", { name: "Load 3 more" }));

    expect(screen.getByRole("heading", { name: "Job 28" })).toBeVisible();
    expect(
      screen.queryByRole("button", { name: "Load 3 more" }),
    ).not.toBeInTheDocument();
  });

  test("it skips the load more control when there are 25 or fewer jobs", () => {
    mockMatchMedia(true);

    render(
      <CompanyJobsTable
        jobs={makeJobs(25)}
        departmentOptions={departmentOptions}
      />,
    );

    expect(screen.getByRole("heading", { name: "Job 25" })).toBeVisible();
    expect(
      screen.queryByRole("button", { name: /Load/ }),
    ).not.toBeInTheDocument();
  });
});
