import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ChatGptGenPage } from ".";

describe("given a <ChatGptGenPage>", () => {
  test("it renders the component successfully", () => {
    render(<ChatGptGenPage/>);
    expect(screen.getByText("Start working here")).toBeInTheDocument();
  });
});
