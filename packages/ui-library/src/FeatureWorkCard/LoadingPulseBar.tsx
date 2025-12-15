import clsx from "clsx";
import type { HTMLAttributes } from "react";
import type { PropsWithChildren } from "react";

type LoadingBarPulseProps = HTMLAttributes<HTMLDivElement>;

export function LoadingBarPulse({
  className,
  ...props
}: PropsWithChildren<LoadingBarPulseProps>) {
  return (
    <div
      aria-label="Content loading..."
      className={clsx("overflow-hidden", className)}
      {...props}
    >
      <div className="animate-loading-bar-pulse h-[2px] bg-gradient-to-l from-green-500 to-transparent" />
    </div>
  );
}
