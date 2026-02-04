"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@kavita-likes-fajitas/shadcn-ui-lib/components/ui/navigation-menu";
import { StandardNavigationMenuItemLink } from "./StandardNavigationMenuItemLink";
import { DropdownMenuBasic } from "./DropdownMenu";

type NavProps = {
  className?: string;
};

export function Nav({ className }: NavProps) {
  return (
    <NavigationMenu className={className}>
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
