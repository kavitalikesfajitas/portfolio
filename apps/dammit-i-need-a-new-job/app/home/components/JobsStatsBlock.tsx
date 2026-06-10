import {
  StatHeaders,
  type StatHeader,
} from "@/app/components/StatsContainer/headers";
import clsx from "clsx";
import map from "lodash/map";
import { IconContainer } from "@kavita-likes-fajitas/ui-library/IconContainer";
import {
  DividedPanel,
  DividedPanelItem,
  DividedPanelItemHeader,
} from "@kavita-likes-fajitas/ui-library/DividedPanel";

export function JobsStatsBlock() {
  return (
    <DividedPanel>
      {map(StatHeaders, ({ Icon, label, value, tone, subText }: StatHeader) => (
        <DividedPanelItem
          key={label}
          className="gap-2 border-divider-1000 px-4 py-6 even:border-l nth-[n+3]:border-t lg:grid lg:row-span-3 lg:grid-rows-subgrid lg:border-l lg:px-6 lg:py-0 lg:first:border-l-0 lg:nth-[n+3]:border-t-0"
        >
          <DividedPanelItemHeader
            className={clsx(
              "flex flex-col gap-2 items-center justify-center text-cream-800 sm:flex-row",
            )}
          >
            <IconContainer
              tone={tone}
              className={clsx(
                tone === "accent"
                  ? "text-orange-1000 [&_svg_*]:stroke-orange-1000"
                  : "text-cream-800 [&_svg_*]:stroke-cream-800",
              )}
            >
              <Icon />
            </IconContainer>
            {label}
          </DividedPanelItemHeader>
          <div className="text-4xl font-bold text-center text-cream-1000">
            {value}
          </div>
          <div className="font-overpass-mono text-[10px] leading-tight tracking-tighter text-center text-foreground-900">
            {subText}
          </div>
        </DividedPanelItem>
      ))}
    </DividedPanel>
  );
}
