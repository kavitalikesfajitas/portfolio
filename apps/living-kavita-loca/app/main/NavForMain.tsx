"use client";
import { Nav } from "@/ui/components/Nav";
import { useIsMobile } from "@kavita-likes-fajitas/shadcn-ui-lib/hooks/useBreakpoint";
import { CenterStickyNav } from "@kavita-likes-fajitas/ui-library/Navigation/CenterToStickyNav";

export function NavForMain() {
  const isMobile = useIsMobile();
  return (
    <CenterStickyNav isMobile={isMobile}>
      <Nav isMobile={isMobile} />
    </CenterStickyNav>
  );
}
