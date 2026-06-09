import type { Meta, StoryObj } from "@storybook/react";
import { Flame, Ghost, MessageCircle, Send } from "lucide-react";
import { IconContainer } from "../IconContainer";
import { DividedPanel, DividedPanelItem, DividedPanelItemHeader } from ".";

const meta = {
  title: "UI / DividedPanel",
  component: DividedPanel,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "dark",
      values: [{ name: "dark", value: "#080808" }],
    },
  },
} satisfies Meta<typeof DividedPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

const stats = [
  {
    icon: Send,
    label: "Jobs Applied To",
    value: 10,
    subText: "keep going, sweetie...",
  },
  {
    icon: MessageCircle,
    label: "Interviews",
    value: 2,
    subText: "we love progress...",
  },
  {
    icon: Ghost,
    label: "Ghosted",
    value: 2,
    subText: "it me, not you...",
  },
  {
    icon: Flame,
    label: "Existential Crisis",
    value: "∞",
    subText: "who even am I...",
    tone: "accent" as const,
  },
];

export const DammitStats: Story = {
  render: () => (
    <div className="w-full p-8">
      <DividedPanel>
        {stats.map(({ icon: Icon, label, value, subText, tone }) => (
          <DividedPanelItem
            key={label}
            className="border-divider-1000 nth-[n+3]:border-t lg:nth-[n+3]:border-t-0 gap-2 px-4 py-6 even:border-l lg:border-l lg:px-6 lg:py-0 lg:first:border-l-0"
          >
            <DividedPanelItemHeader className="text-cream-800 flex flex-col items-center justify-center gap-2 sm:flex-row">
              <IconContainer
                tone={tone}
                className={
                  tone === "accent"
                    ? "text-orange-1000 [&_svg_*]:stroke-orange-1000"
                    : "text-cream-800 [&_svg_*]:stroke-cream-800"
                }
              >
                <Icon />
              </IconContainer>
              {label}
            </DividedPanelItemHeader>
            <div className="text-cream-1000 text-center text-4xl font-bold">
              {value}
            </div>
            <div className="font-overpass-mono text-foreground-900 text-xxs text-center tracking-tighter">
              {subText}
            </div>
          </DividedPanelItem>
        ))}
      </DividedPanel>
    </div>
  ),
};
