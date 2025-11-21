"use client";
import { Nav } from "@/ui/components/Nav";

import { CenterStickyNav } from "@kavita-likes-fajitas/ui-library/Navigation/CenterToStickyNav";

type NavForMainProps = {
  isMobile: boolean;
};
export function NavForMain({ isMobile }: NavForMainProps) {
  return (
    <CenterStickyNav isMobile={isMobile}>
      <Nav isMobile={isMobile} />
    </CenterStickyNav>
  );
}
