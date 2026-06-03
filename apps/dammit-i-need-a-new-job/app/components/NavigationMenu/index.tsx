import React from "react";
import clsx from "clsx";
import Image from "next/image";
import FireLogo from "@/public/images/dammit-flame.png";

type NavigationMenuProps = {
  className?: string;
};

export function NavigationMenu({ className }: NavigationMenuProps) {
  return (
    <nav
      className={clsx(
        "sticky top-0 z-50 w-full flex flex-col gap-5 bg-neutral-950 text-cream-1000",
        className,
      )}
    >
      <hr className=" w-full self-center border-orange-1000 border-t-2 mt-8" />
      <div className=" flex-1 flex flex-row gap-2 items-center">
        <div className="font-overpass-mono uppercase tracking-tighter text-2xl text-cream-1000 font-bold">
          DAMMIT.
        </div>
        <Image
          src={FireLogo}
          alt="fire logo"
          placeholder="blur"
          quality={75}
          className="w-8 h-8 animate-pulse"
        />
      </div>
    </nav>
  );
}
