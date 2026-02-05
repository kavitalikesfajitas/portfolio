import { describe, test, expect } from "vitest";
import { render } from "@testing-library/react";
import { Nav } from ".";

describe.skip("given a <Nav>", () => {
  test("it renders the component successfully", () => {
    const { container } = render(<Nav />);
    expect(container).toBeInTheDocument();
  });
});
