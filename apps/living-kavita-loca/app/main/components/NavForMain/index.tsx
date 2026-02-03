"use client";
import { Nav } from "@/app/components/Nav";
import { CenterStickyNav } from "@kavita-likes-fajitas/ui-library/Navigation/CenterToStickyNav";
import { LivingKavitaLocaLogo } from "@/app/components/Nav/LivingKavitaLocaLogo";
import { useIsMobile } from "@kavita-likes-fajitas/shadcn-ui-lib/hooks/useBreakpoint";

export function NavForMain() {
  const isMobile = useIsMobile();

  return (
    <CenterStickyNav InNavLogo={LivingKavitaLocaLogo}>
      <Nav isMobile={isMobile!} />
    </CenterStickyNav>
  );
}
