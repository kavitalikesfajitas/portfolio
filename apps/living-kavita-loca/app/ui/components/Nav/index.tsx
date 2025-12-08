"use client";

import {
  NavigationMenu,
  NavigationMenuList,
} from "@kavita-likes-fajitas/shadcn-ui-lib/components/ui/navigation-menu";
import { ListThatsFancy } from "./ListThatsFancy";
import { StandardNavigationMenuItemLink } from "./StandardNavigationMenuItemLink";

type NavProps = {
  isMobile: boolean;
};

export function Nav({ isMobile }: NavProps) {
  return (
    <NavigationMenu
      viewport={isMobile}
      className="dark py-2 bg-white text-gray-950 rounded-full"
    >
      <NavigationMenuList id="nav-list" className=" text-gray-950 bg-white ">
        <ListThatsFancy />
        <StandardNavigationMenuItemLink>
          <a
            href="https://github.com/kavitalikesfajitas"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </a>
        </StandardNavigationMenuItemLink>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
