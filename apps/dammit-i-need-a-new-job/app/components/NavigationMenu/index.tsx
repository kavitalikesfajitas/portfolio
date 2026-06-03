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
      <hr className="mt-8 w-full self-center border-t border-orange-1000/80" />
      <div className="flex w-full flex-wrap items-center justify-between gap-x-6 gap-y-3 px-6 pb-2">
        <div className="flex items-center gap-2">
          <div className="font-overpass-mono text-2xl font-bold uppercase tracking-tighter text-cream-1000">
            DAMMIT.
          </div>
          <Image
            src={FireLogo}
            alt="fire logo"
            placeholder="blur"
            quality={75}
            className="h-8 w-8 animate-pulse"
          />
        </div>
        <a
          href="https://livingkavitaloca.com"
          className="font-overpass-mono text-xs font-semibold uppercase tracking-tighter underline text-cream-800 transition-colors duration-200 hover:text-orange-1000"
        >
          created by kavita chaudhry
        </a>
      </div>
    </nav>
  );
}
