import React from "react";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import FireLogo from "@/public/images/dammit-flame.png";

type NavigationMenuProps = {
  className?: string;
};

export function NavigationMenu({ className }: NavigationMenuProps) {
  return (
    <nav
      className={clsx(
        "sticky top-0 z-50 flex w-full flex-col gap-4 bg-neutral-950 text-cream-1000 sm:gap-5",
        className,
      )}
    >
      <hr className="mt-6 w-full self-center border-t border-orange-1000/80 sm:mt-8" />
      <div className="flex w-full flex-wrap items-center justify-between gap-x-4 gap-y-3 px-5 pb-2 sm:gap-x-6 sm:px-6">
        <div className="flex items-center gap-2">
          <div className="font-overpass-mono text-xl font-bold uppercase tracking-tighter text-cream-1000 sm:text-2xl">
            DAMMIT.
          </div>
          <Image
            src={FireLogo}
            alt="fire logo"
            placeholder="blur"
            quality={75}
            className="h-6 w-6 animate-pulse sm:h-8 sm:w-8"
          />
        </div>
        <div className="flex items-center gap-4 font-overpass-mono text-[10px] font-semibold uppercase tracking-tighter sm:gap-6 sm:text-xs">
          <Link
            href="/"
            className="text-orange-1000 transition-colors duration-200 hover:text-cream-1000"
          >
            Home
          </Link>
          <Link
            href="/companies"
            className="text-orange-1000 transition-colors duration-200 hover:text-cream-1000"
          >
            companies
          </Link>

          <a
            href="https://livingkavitaloca.com"
            className="font-overpass-mono text-[10px] font-semibold uppercase tracking-tighter text-cream-800 underline transition-colors duration-200 hover:text-orange-1000 sm:text-xs"
          >
            created by kavita chaudhry
          </a>
        </div>
      </div>
    </nav>
  );
}
