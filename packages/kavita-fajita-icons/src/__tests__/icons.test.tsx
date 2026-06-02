import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { createRef } from "react";
import { ArrowRight, Flame } from "../index";

describe("generated icons", () => {
  it("renders an icon as an inline svg", () => {
    const { container } = render(<ArrowRight />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute("viewBox", "0 0 64 64");
    // currentColor lets the consumer drive color via CSS `color`
    expect(svg?.querySelector("[stroke='currentColor']")).toBeInTheDocument();
  });

  it("spreads props and forwards a ref onto the svg", () => {
    const ref = createRef<SVGSVGElement>();
    const { container } = render(
      <Flame ref={ref} className="size-6" data-testid="flame" />,
    );
    const svg = container.querySelector("svg");
    expect(ref.current).toBe(svg);
    expect(svg).toHaveClass("size-6");
    expect(svg).toHaveAttribute("data-testid", "flame");
  });
});
