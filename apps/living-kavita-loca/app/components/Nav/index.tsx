"use client";

import {
  NavigationMenu,
  NavigationMenuList,
} from "@kavita-likes-fajitas/shadcn-ui-lib/components/ui/navigation-menu";
import { ListThatsFancy } from "./ListThatsFancy";
import { StandardNavigationMenuItemLink } from "./StandardNavigationMenuItemLink";
import clsx from "clsx";

type NavProps = {
  isMobile: boolean;
  className?: string;
};

export function Nav({ isMobile, className }: NavProps) {
  console.log("isMobile", isMobile);
  return (
    <NavigationMenu
      viewport={isMobile}
      className={clsx(" py-2 bg-white text-gray-1000 ", className)}
    >
      <NavigationMenuList id="nav-list" className=" text-gray-1000 bg-white ">
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
