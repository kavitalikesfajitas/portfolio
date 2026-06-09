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
        <div className="flex items-center gap-6 font-overpass-mono text-xs font-semibold uppercase tracking-tighter">
          <Link
            href="/"
            className="text-cream-800 transition-colors duration-200 hover:text-orange-1000"
          >
            about
          </Link>
          <Link
            href="/companies"
            className="text-orange-1000 transition-colors duration-200 hover:text-cream-1000"
          >
            companies
          </Link>
        </div>
      </div>
    </nav>
  );
}
