import React from "react";
import clsx from "clsx";

type StatusBlockProps = React.PropsWithChildren<{
  className?: string;
}>;

export function StatusBlock({ className, children }: StatusBlockProps) {
  return (
    <div
      className={clsx(
        // Inherit the parent grid's rows so header / value / sub-text align
        // across every column regardless of how long a label wraps.
        "grid row-span-3 grid-rows-subgrid text-center",
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
