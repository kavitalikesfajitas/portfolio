import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { GlamChatHero } from ".";

describe("given a <GlamChatHero>", () => {
  test("it renders the component successfully", () => {
    render(<GlamChatHero/>);
    expect(screen.getByText("Start working here")).toBeInTheDocument();
  });
});
