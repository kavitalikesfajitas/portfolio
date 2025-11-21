"use client";
import { Nav } from "@/ui/components/Nav";
import { CenterStickyNav } from "@kavita-likes-fajitas/ui-library/Navigation/CenterToStickyNav";
import Image from "next/image";

type NavForMainProps = {
  isMobile: boolean;
};

const LivingKavitaLocaInNavLogo = () => {
  return (
    <>
      <span className="pl-1 text-xs font-semibold uppercase leading-tight tracking-tight sm:text-sm md:pl-2 md:text-base md:tracking-[0.25em]">
        Living Kavita Loca
      </span>
      <div className="relative h-6 w-6 md:h-9 md:w-9">
        <Image
          src="/images/lips-glossy.png"
          alt="Living Kavita Loca lips"
          fill
          className="object-contain"
        />
      </div>
    </>
  );
};
export function NavForMain({ isMobile }: NavForMainProps) {
  return (
    <CenterStickyNav InNavLogo={LivingKavitaLocaInNavLogo}>
      <Nav isMobile={isMobile} />
    </CenterStickyNav>
  );
}
