import type { Meta, StoryObj } from "@storybook/react";
import { ThemedButton } from "./ThemedButton";

const meta = {
  title: "UI / ThemedButton",
  component: ThemedButton,
  args: {
    children: "Click me",
    type: "button" as const,
  },
} satisfies Meta<typeof ThemedButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
