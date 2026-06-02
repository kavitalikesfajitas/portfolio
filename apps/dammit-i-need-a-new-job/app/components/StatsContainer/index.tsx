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
    <Card className={clsx("w-full flex", className)}>
      <CardContent className="grid grid-cols-4 grid-rows-[auto_auto_auto] divide-x divide-gray-200 *:px-6">
        {children}
      </CardContent>
    </Card>
  );
}
