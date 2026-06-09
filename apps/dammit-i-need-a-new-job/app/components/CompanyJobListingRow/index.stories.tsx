import type { Meta, StoryObj } from "@storybook/react";
import { CompanyJobListingRow } from ".";

const meta = {
  title: "Dammit/CompanyJobListingRow",
  component: CompanyJobListingRow,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "dammit",
      values: [{ name: "dammit", value: "#080808" }],
    },
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen w-screen bg-neutral-950 p-8 text-cream-1000">
        <div className="mx-auto w-full max-w-4xl">
          <Story />
        </div>
      </div>
    ),
  ],
  args: {
    companyName: "Vercel",
    updatedLabel: "5m ago",
    engineeringDepartmentCount: 7,
    engineeringJobCount: 17,
    departments: [
      { name: "Engineering", count: 17, isPrimary: true },
      { name: "Field Engineering", count: 7 },
      { name: "Solution Engineering", count: 4 },
    ],
    extraDepartmentCount: 4,
  },
} satisfies Meta<typeof CompanyJobListingRow>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Vercel: Story = {};
