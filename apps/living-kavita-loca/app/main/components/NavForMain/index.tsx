"use client";
import { Nav } from "@/app/components/Nav";
import { CenterStickyNav } from "@kavita-likes-fajitas/ui-library/Navigation/CenterToStickyNav";
import { LivingKavitaLocaLogo } from "@/app/components/Nav/LivingKavitaLocaLogo";

type NavForMainProps = {
  isMobile: boolean;
};

export function NavForMain({ isMobile }: NavForMainProps) {
  return (
    <CenterStickyNav InNavLogo={LivingKavitaLocaLogo}>
      <Nav isMobile={isMobile} />
    </CenterStickyNav>
  );
}
