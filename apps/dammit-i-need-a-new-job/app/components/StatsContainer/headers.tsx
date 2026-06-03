import type { ComponentType, SVGProps } from "react";
import type { IconContainerTone } from "@kavita-likes-fajitas/ui-library/IconContainer";
import {
  PaperPlane,
  ChatBubble,
  Ghost,
  Infinity as InfinityIcon,
} from "@kavita-likes-fajitas/kavita-fajita-icons";

export type IconProps = SVGProps<SVGSVGElement> & {
  title?: string;
  titleId?: string;
};

export type StatHeader = {
  Icon: ComponentType<IconProps>;
  label: string;
  subText?: string;
  tone?: IconContainerTone;
  value?: number | string;
};

export enum StatHeaderKey {
  JOBS_APPLIED = "JOBS_APPLIED",
  INTERVIEWS = "INTERVIEWS",
  GHOSTED = "GHOSTED",
  EXISTENTIAL_CRISIS = "EXISTENTIAL_CRISIS",
}

export const StatHeaders: Record<StatHeaderKey, StatHeader> = {
  JOBS_APPLIED: {
    Icon: PaperPlane,
    label: "Jobs Applied To",
    subText: "keep going, sweetie...",
    value: 10,
  },
  INTERVIEWS: {
    Icon: ChatBubble,
    label: "Interviews",
    subText: "we love progress...",
    value: 2,
  },
  GHOSTED: {
    Icon: Ghost,
    label: "Ghosted",
    subText: "it me, not you...",
    value: 2,
  },
  EXISTENTIAL_CRISIS: {
    Icon: InfinityIcon,
    label: "Existential Crisis",
    tone: "accent",
    subText: "who even am I...",
    value: "∞",
  },
};
