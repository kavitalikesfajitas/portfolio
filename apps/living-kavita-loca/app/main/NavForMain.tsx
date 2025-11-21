"use client";
import { Nav } from "@/ui/components/Nav";

import { CenterStickyNav } from "@kavita-likes-fajitas/ui-library/Navigation/CenterToStickyNav";

type NavForMainProps = {
  isMobile: boolean;
};
export function NavForMain({ isMobile }: NavForMainProps) {
  return (
    <CenterStickyNav>
      <Nav isMobile={isMobile} />
    </CenterStickyNav>
  );
}
