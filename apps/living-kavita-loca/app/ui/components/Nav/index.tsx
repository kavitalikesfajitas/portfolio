"use client";

import {
  NavigationMenu,
  NavigationMenuList,
} from "@kavita-likes-fajitas/shadcn-ui-lib/components/ui/navigation-menu";
import { ListThatsFancy } from "./ListThatsFancy";
import { StandardNavigationMenuItemLink } from "./StandardNavigationMenuItemLink";
import Link from "next/link";

type NavProps = {
  isMobile: boolean;
};

export function Nav({ isMobile }: NavProps) {
  return (
    <NavigationMenu
      viewport={isMobile}
      className="px-3.5 py-2 bg-white text-gray-950"
    >
      <NavigationMenuList id="nav-list" className=" text-gray-950 bg-white ">
        <ListThatsFancy />
        <StandardNavigationMenuItemLink>
          <Link href="https://github.com/kavitalikesfajitas" shallow={true}>
            Github
          </Link>
        </StandardNavigationMenuItemLink>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
