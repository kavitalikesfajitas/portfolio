import clsx from "clsx";
import type { PropsWithChildren } from "react";

type SiteMaxWidthProps = PropsWithChildren<{
  className?: string;
}>;

export function SiteMaxWidth(props: SiteMaxWidthProps) {
  return (
    <div
      className={clsx(
        "relative w-full max-w-screen-3xl mx-auto",
        props.className,
      )}
    >
      {props.children}
    </div>
  );
}

type SiteWrapperProps = PropsWithChildren<{
  className?: string;
  innerClassName?: string;
}>;

export function SiteWrapper(props: SiteWrapperProps) {
  return (
    <div className={clsx("w-full px-3 md:px-6", props.className)}>
      {/* This is separated so that padding isn't included in max-width, and so that it can be use independently */}
      <SiteMaxWidth className={props.innerClassName ?? ""}>
        {props.children}
      </SiteMaxWidth>
    </div>
  );
}
