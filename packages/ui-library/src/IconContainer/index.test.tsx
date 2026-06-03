import { describe, test, expect } from "vitest";
import { render } from "@testing-library/react";
import { IconContainer } from ".";

describe("given an <IconContainer>", () => {
  test("it renders its children", () => {
    const { getByTestId } = render(
      <IconContainer>
        <svg data-testid="icon" />
      </IconContainer>,
    );
    expect(getByTestId("icon")).toBeInTheDocument();
  });

  test("it defaults to a plain, neutral, large icon with no chrome", () => {
    const { container } = render(<IconContainer />);
    const firstChild = container.firstChild as HTMLElement;
    expect(firstChild).toHaveClass("[&_svg]:size-7", "text-gray-1000");
    // plain has no background, border, padding, or rounding
    expect(firstChild.className).not.toMatch(/\bp-/);
    expect(firstChild.className).not.toMatch(/\bbg-/);
    expect(firstChild.className).not.toMatch(/\bborder\b/);
  });

  test("a soft variant adds a tinted background and padding", () => {
    const { container } = render(<IconContainer variant="soft" tone="primary" />);
    const firstChild = container.firstChild as HTMLElement;
    expect(firstChild).toHaveClass(
      "bg-rose-400/10",
      "text-rose-400",
      "p-2.5",
      "rounded-full",
    );
  });

  test("a solid variant sets a tone background with contrasting text", () => {
    const { container } = render(<IconContainer variant="solid" tone="accent" />);
    const firstChild = container.firstChild as HTMLElement;
    expect(firstChild).toHaveClass("bg-orange-500", "text-white");
  });

  test("it applies the requested size and shape", () => {
    const { container } = render(
      <IconContainer size="sm" variant="outline" shape="square" />,
    );
    const firstChild = container.firstChild as HTMLElement;
    expect(firstChild).toHaveClass("[&_svg]:size-4", "p-1.5", "rounded-none");
  });

  test("it merges a custom className and forwards span props", () => {
    const { getByLabelText } = render(
      <IconContainer className="custom-class" aria-label="settings" />,
    );
    expect(getByLabelText("settings")).toHaveClass("custom-class");
  });
});
