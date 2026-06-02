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
      {map(StatHeaders, ({ Icon, label, tone, subText }: StatHeader) => (
        <StatusBlock key={label} className="gap-2">
          <StatusBlockHeader
            className={clsx("flex flex-row gap-2 items-center justify-center")}
          >
            <IconContainer tone={tone}>
              <Icon />
            </IconContainer>
            {label}
          </StatusBlockHeader>
          <div className="text-4xl font-bold text-center">27</div>
          <div className="font-overpass-mono text-[10px] leading-tight tracking-tighter text-center">
            {subText}
          </div>
        </StatusBlock>
      ))}
    </StatsContainer>
  );
}
