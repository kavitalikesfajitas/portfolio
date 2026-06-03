import type { Meta, StoryObj } from "@storybook/react";
import { RoseThemedButton } from "./RoseThemedButton";

const meta = {
  title: "UI / RoseThemedButton",
  component: RoseThemedButton,
  args: {
    children: "Click me",
    type: "button" as const,
  },
} satisfies Meta<typeof RoseThemedButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
