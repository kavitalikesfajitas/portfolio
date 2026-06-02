import type { Meta, StoryObj } from "@storybook/react";
import { Search } from "lucide-react";
import { IconContainer } from ".";

const meta = {
  title: "UI / IconContainer",
  component: IconContainer,
  args: {
    children: <Search />,
    size: "lg",
    tone: "neutral",
    variant: "plain",
    shape: "circle",
  },
  argTypes: {
    size: { control: "inline-radio", options: ["sm", "md", "lg", "xl"] },
    tone: {
      control: "inline-radio",
      options: ["neutral", "muted", "primary", "accent"],
    },
    variant: {
      control: "inline-radio",
      options: ["plain", "soft", "outline", "solid"],
    },
    shape: {
      control: "inline-radio",
      options: ["circle", "rounded", "square"],
    },
  },
} satisfies Meta<typeof IconContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: (args) => (
    <div className="flex items-center gap-4">
      <IconContainer {...args} variant="plain" />
      <IconContainer {...args} variant="soft" />
      <IconContainer {...args} variant="outline" />
      <IconContainer {...args} variant="solid" />
    </div>
  ),
};

export const Tones: Story = {
  render: (args) => (
    <div className="flex items-center gap-4">
      <IconContainer {...args} tone="neutral" />
      <IconContainer {...args} tone="muted" />
      <IconContainer {...args} tone="primary" />
      <IconContainer {...args} tone="accent" />
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-4">
      <IconContainer {...args} size="sm" />
      <IconContainer {...args} size="md" />
      <IconContainer {...args} size="lg" />
      <IconContainer {...args} size="xl" />
    </div>
  ),
};
