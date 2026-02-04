"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@kavita-likes-fajitas/shadcn-ui-lib/components/ui/navigation-menu";

import { StandardNavigationMenuItemLink } from "./StandardNavigationMenuItemLink";

import { DropdownMenuBasic } from "./DropdownMenu";

export function Nav() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <StandardNavigationMenuItemLink>
          <a
            href="https://github.com/kavitalikesfajitas"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </a>
        </StandardNavigationMenuItemLink>
        <NavigationMenuItem>
          <DropdownMenuBasic />
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
