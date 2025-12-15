import React from "react";
import clsx from "clsx";

type HeroContainerProps = React.ComponentProps<"div">;

export function HeroContainer({ className, ...rest }: HeroContainerProps) {
  return (
    <div className={clsx(className)} {...rest}>
      Start working here
    </div>
  );
}
