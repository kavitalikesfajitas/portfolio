"use client";

import {
  NavigationMenu,
  NavigationMenuList,
} from "@kavita-likes-fajitas/ui-library/shadcn/components/ui/NavigationMenu";
import { ListThatGrowsOut } from "./ListThatGrowsOut";
import { ListThatsFancy } from "./ListThatsFancy";
import { NavigationMenuItemLink } from "./NavigationMenuItem";

type NavProps = {
  isMobile: boolean;
};

export function Nav({ isMobile }: NavProps) {
  return (
    <NavigationMenu viewport={isMobile}>
      <NavigationMenuList className="flex-wrap text-gray-950 bg-white rounded-2xl ">
        <ListThatsFancy />
        <ListThatGrowsOut />
        <NavigationMenuItemLink />
      </NavigationMenuList>
    </NavigationMenu>
  );
}
