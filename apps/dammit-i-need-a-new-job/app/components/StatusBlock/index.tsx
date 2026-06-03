import React from "react";
import clsx from "clsx";

type StatusBlockProps = React.PropsWithChildren<{
  className?: string;
}>;

export function StatusBlock({ className, children }: StatusBlockProps) {
  return (
    <div
      className={clsx(
        "flex min-w-0 flex-col items-center text-center lg:grid lg:row-span-3 lg:grid-rows-subgrid",
        className,
      )}
    >
      {children}
    </div>
  );
}

type StatusBlockHeaderProps = React.PropsWithChildren<{
  className?: string;
}>;

export function StatusBlockHeader({
  className,
  children,
}: StatusBlockHeaderProps) {
  return (
    <div
      className={clsx(
        "font-overpass-mono uppercase tracking-tighter text-xs",
        "text-center",
        className,
      )}
    >
      {children}
    </div>
  );
}
