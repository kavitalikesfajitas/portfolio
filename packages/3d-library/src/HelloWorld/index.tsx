import type { PropsWithChildren } from "react";
import clsx from "clsx";

export function HelloWorld(props: PropsWithChildren<{ className?: string }>) {
  return (
    <div className={clsx("text-lg font-bold text-red-500", props.className)}>
      {props.children}
    </div>
  );
}
