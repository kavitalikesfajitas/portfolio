import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { NavigationMenu } from ".";

describe("given a <NavigationMenu>", () => {
  test("it renders the component successfully", () => {
    render(<NavigationMenu />);
    expect(screen.getByText("DAMMIT.")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "learn more" })).toHaveAttribute(
      "href",
      "/learn-more",
    );
  });
});
