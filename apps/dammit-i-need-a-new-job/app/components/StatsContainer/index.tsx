import React from "react";
import clsx from "clsx";
import {
  Card,
  CardContent,
} from "@kavita-likes-fajitas/shadcn-ui-lib/components/ui/card";

type StatsContainerProps = React.PropsWithChildren<{
  className?: string;
}>;

export function StatsContainer({ className, children }: StatsContainerProps) {
  return (
    <Card
      className={clsx(
        "w-full flex bg-neutral-910 text-cream-1000 border-divider-1000",
        className,
      )}
    >
      <CardContent className="grid grid-cols-2 lg:grid-cols-4 lg:grid-rows-[auto_auto_auto] p-0">
        {children}
      </CardContent>
    </Card>
  );
}
