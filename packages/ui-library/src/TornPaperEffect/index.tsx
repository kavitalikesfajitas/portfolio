import React, { type PropsWithChildren } from "react";
import clsx from "clsx";
import { SVGFilter } from "./SVGFilter";
import "./index.css";

type TornPaperEffectProps = PropsWithChildren<React.ComponentProps<"div">>;

export function TornPaperEffect({
  className,
  children,
  ...rest
}: TornPaperEffectProps) {
  return (
    <div
      className={clsx(className, "ragged-text-filter bg-white text-gray-950")}
      {...rest}
    >
      <SVGFilter className={clsx()} />
      <p>{children}</p>
    </div>
  );
}
