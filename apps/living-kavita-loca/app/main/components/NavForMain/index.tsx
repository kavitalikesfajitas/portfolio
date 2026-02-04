"use client";
import { Nav } from "@/app/components/Nav";
import { CenterStickyNav } from "@kavita-likes-fajitas/ui-library/Navigation/CenterToStickyNav";
import { LivingKavitaLocaLogo } from "@/app/components/Nav/LivingKavitaLocaLogo";

export function NavForMain() {
  return (
    <CenterStickyNav InNavLogo={LivingKavitaLocaLogo}>
      <Nav className="" />
    </CenterStickyNav>
  );
}
