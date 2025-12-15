"use client";
import { Nav } from "@/app/ui/components/Nav";
import { useIsMobile } from "@kavita-likes-fajitas/shadcn-ui-lib/hooks/useBreakpoint";
import { CenterStickyNav } from "@kavita-likes-fajitas/ui-library/Navigation/CenterToStickyNav";
import Image from "next/image";

export const LivingKavitaLocaInNavLogo = () => {
  return (
    <>
      <span className="pl-1 text-xs font-semibold uppercase leading-tight tracking-tight sm:text-sm md:pl-2 md:text-base md:tracking-[0.25em]">
        Living Kavita Loca
      </span>
      <div className="relative h-6 w-6 md:h-9 md:w-9">
        <Image
          src="/images/hero/lips-glossy.png"
          alt="Living Kavita Loca lips"
          fill
          className="object-contain"
        />
      </div>
    </>
  );
};

export function NavForMain() {
  const isMobile = useIsMobile();

  return (
    <CenterStickyNav InNavLogo={LivingKavitaLocaInNavLogo}>
      <Nav isMobile={isMobile!} />
    </CenterStickyNav>
  );
}
