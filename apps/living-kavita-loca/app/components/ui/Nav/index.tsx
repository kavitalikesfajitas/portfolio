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
    <NavigationMenu viewport={isMobile} className="px-3">
      <NavigationMenuList id="nav-list" className=" text-gray-950 bg-white ">
        <ListThatsFancy />
        <ListThatGrowsOut />
        <NavigationMenuItemLink />
      </NavigationMenuList>
    </NavigationMenu>
  );
}
