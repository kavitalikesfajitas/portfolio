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
      className={clsx(
        className,
        "ragged-text-filter text-gray-1000 bg-white",
        className,
      )}
      {...rest}
    >
      <SVGFilter className={clsx()} />
      {children}
    </div>
  );
}
