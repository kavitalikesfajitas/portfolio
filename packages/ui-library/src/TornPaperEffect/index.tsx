import React from "react";
import clsx from "clsx";
import { SVGFilter } from "./SVGFilter";

type TornPaperEffectProps = React.ComponentProps<"div"> & {
  text: string;
};

export function TornPaperEffect({
  className,
  text,
  ...rest
}: TornPaperEffectProps) {
  return (
    <div className={clsx(className)} {...rest}>
      <div className="ragged-text-filter bg-white text-gray-950">
        <p>{text}</p>
      </div>
      <SVGFilter />
    </div>
  );
}
