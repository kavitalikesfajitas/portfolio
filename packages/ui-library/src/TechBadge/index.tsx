import {
  Badge,
  type BadgeProps,
} from "@kavita-likes-fajitas/shadcn-ui-lib/components/ui/badge";
import { IconMap, TECH_MAP, TechType } from "./constants";
import { useMemo } from "react";

const stripPunctuation = (str: string) => str.replace(/[^\w]/g, "");

type TechBadgeProps = BadgeProps & {
  tech: string;
};

export function TechBadge({ tech, ...props }: TechBadgeProps) {
  const techKey = stripPunctuation(tech).toLowerCase();
  const techObj = TECH_MAP[techKey] ?? {
    label: tech,
    type: TechType.Other,
  };

  if (techObj == undefined) return null;
  const Icon = useMemo(() => IconMap[techObj.type], [techObj.type]);
  return (
    <Badge {...props}>
      <Icon />
      {techObj.label}
    </Badge>
  );
}
