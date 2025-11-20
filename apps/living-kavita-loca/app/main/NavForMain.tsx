"use client";
import { Nav } from "@/ui/components/Nav";
import { forwardRef } from "react";

import { CenterStickyNav } from "@kavita-likes-fajitas/ui-library/Navigation/CenterToStickyNav";

type NavForMainProps = {
  isMobile: boolean;
};
export const NavForMain = forwardRef<HTMLDivElement, NavForMainProps>(
  function NavForMain({ isMobile }, ref) {
    return (
      <CenterStickyNav ref={ref} isMobile={isMobile}>
        <Nav isMobile={isMobile} />
      </CenterStickyNav>
    );
  },
);
