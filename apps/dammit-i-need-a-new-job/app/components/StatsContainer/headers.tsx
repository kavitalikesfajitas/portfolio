import type { ComponentType, SVGProps } from "react";
import type { IconContainerTone } from "@kavita-likes-fajitas/ui-library/IconContainer";
import {
  PaperPlane,
  ChatBubble,
  Ghost,
  Flame,
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
  },
  INTERVIEWS: {
    Icon: ChatBubble,
    label: "Interviews",
    subText: "we love progress...",
  },
  GHOSTED: {
    Icon: Ghost,
    label: "Ghosted",
    subText: "it me, not you...",
  },
  EXISTENTIAL_CRISIS: {
    Icon: Flame,
    label: "Existential Crisis",
    tone: "accent",
    subText: "who even am I...",
  },
};
