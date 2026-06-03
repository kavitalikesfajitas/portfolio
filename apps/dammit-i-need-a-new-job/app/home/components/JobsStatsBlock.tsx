import { StatsContainer } from "@/app/components/StatsContainer";
import {
  StatHeaders,
  type StatHeader,
} from "@/app/components/StatsContainer/headers";
import { StatusBlock, StatusBlockHeader } from "@/app/components/StatusBlock";
import clsx from "clsx";
import map from "lodash/map";
import { IconContainer } from "@kavita-likes-fajitas/ui-library/IconContainer";

export function JobsStatsBlock() {
  return (
    <StatsContainer>
      {map(StatHeaders, ({ Icon, label, value, tone, subText }: StatHeader) => (
        <StatusBlock
          key={label}
          className="gap-2 border-border-1000 px-4 py-6 even:border-l nth-[n+3]:border-t lg:border-l lg:px-6 lg:py-0 lg:first:border-l-0 lg:nth-[n+3]:border-t-0"
        >
          <StatusBlockHeader
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
          </StatusBlockHeader>
          <div className="text-4xl font-bold text-center text-cream-1000">
            {value}
          </div>
          <div className="font-overpass-mono text-[10px] leading-tight tracking-tighter text-center text-text-900">
            {subText}
          </div>
        </StatusBlock>
      ))}
    </StatsContainer>
  );
}
