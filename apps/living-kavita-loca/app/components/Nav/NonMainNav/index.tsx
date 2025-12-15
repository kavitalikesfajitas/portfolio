import React from "react";
import clsx from "clsx";
import { Nav } from "..";
import { LivingKavitaLocaLogo } from "../LivingKavitaLocaLogo";
import { useIsMobile } from "@kavita-likes-fajitas/shadcn-ui-lib/hooks/useBreakpoint";

type NonMainNavProps = {
  className?: string;
};

export function NonMainNav({ className }: NonMainNavProps) {
  const isMobile = useIsMobile();
  return (
    <div
      className={clsx(
        "sticky left-0 z-50 mx-auto flex w-full items-center justify-between overflow-visible bg-white text-gray-950",
        "top-0 ",
        className,
      )}
    >
      <div
        className={clsx(
          "flex shrink-0 items-center gap-1 overflow-hidden whitespace-nowrap md:gap-2",
        )}
      >
        <LivingKavitaLocaLogo />
      </div>
      <Nav
        isMobile={isMobile!}
        className="h-fit flex-1 grow-0 w-full sticky top-0 "
      />
    </div>
  );
}
