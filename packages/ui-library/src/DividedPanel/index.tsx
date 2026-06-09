import React from "react";
import clsx from "clsx";
import {
  Card,
  CardContent,
} from "@kavita-likes-fajitas/shadcn-ui-lib/components/ui/card";

type DividedPanelProps = React.PropsWithChildren<{
  className?: string;
  contentClassName?: string;
}>;

export function DividedPanel({
  className,
  contentClassName,
  children,
}: DividedPanelProps) {
  return (
    <Card
      className={clsx(
        "border-divider-1000 bg-neutral-910 text-cream-1000 w-full",
        className,
      )}
    >
      <CardContent
        className={clsx(
          "grid grid-cols-2 p-0 lg:grid-cols-4",
          contentClassName,
        )}
      >
        {children}
      </CardContent>
    </Card>
  );
}

type DividerStyle = "left" | "right" | "none";

/**
 * Responsive divider borders between items. The panel is a 2-column grid on
 * mobile and a 4-column grid on desktop, so the dividers have to switch sides
 * and breakpoints — that's what makes these strings long.
 *
 * - `left`  — for the default `grid-cols-2 lg:grid-cols-4` panel
 * - `right` — for a `sm:grid-cols-2 lg:grid-cols-4` panel that stacks on mobile
 * - `none`  — no dividers
 */
const dividerClasses: Record<DividerStyle, string> = {
  left: "border-divider-1000 even:border-l nth-[n+3]:border-t lg:border-l lg:first:border-l-0 lg:nth-[n+3]:border-t-0",
  right:
    "border-divider-1000 sm:odd:border-r sm:nth-[n+3]:border-t lg:border-r lg:border-t-0 lg:last:border-r-0",
  none: "",
};

type DividedPanelItemProps = React.PropsWithChildren<{
  className?: string;
  dividers?: DividerStyle;
}>;

export function DividedPanelItem({
  className,
  dividers = "left",
  children,
}: DividedPanelItemProps) {
  return (
    <div
      className={clsx(
        "flex min-w-0 flex-col items-center text-center",
        dividerClasses[dividers],
        className,
      )}
    >
      {children}
    </div>
  );
}

type DividedPanelItemHeaderProps = React.PropsWithChildren<{
  className?: string;
}>;

export function DividedPanelItemHeader({
  className,
  children,
}: DividedPanelItemHeaderProps) {
  return (
    <div
      className={clsx(
        "font-overpass-mono text-center text-xs uppercase tracking-tighter",
        className,
      )}
    >
      {children}
    </div>
  );
}

export type {
  DividedPanelProps,
  DividedPanelItemProps,
  DividedPanelItemHeaderProps,
};
