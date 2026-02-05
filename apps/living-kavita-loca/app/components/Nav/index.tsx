"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@kavita-likes-fajitas/shadcn-ui-lib/components/ui/navigation-menu";
import { NavDropdownMenu } from "./NavDropdownMenu";
import clsx from "clsx";

type NavProps = {
  className?: string;
};

export function Nav({ className }: NavProps) {
  return (
    <NavigationMenu
      id="nav"
      className={clsx(className, "flex items-center justify-center")}
    >
      <NavigationMenuList>
        <NavigationMenuItem
          className={clsx(
            // Layout
            "flex flex-col items-center justify-center gap-1 h-9",
          )}
        >
          <a
            href="https://github.com/kavitalikesfajitas"
            target="_blank"
            rel="noopener noreferrer"
            className={clsx(
              // Typography
              "text-sm md:text-base font-medium",
              // Hover states
              "hover:bg-accent hover:text-accent-foreground",
              // Focus states
              "focus:bg-accent focus:text-accent-foreground",
              // Borders & spacing
              "rounded-sm",
              "focus-visible:ring-ring/50 focus-visible:outline-1 focus-visible:ring-[3px]",
              // Transitions
              "outline-none transition-all",
              // Active states
              "data-[active=true]:bg-accent/50 data-[active=true]:text-accent-foreground",
              "data-[active=true]:hover:bg-accent data-[active=true]:focus:bg-accent",
              "px-1 md:px-3 ",
              "flex flex-col items-center justify-center gap-1 ",
            )}
          >
            Github
          </a>
        </NavigationMenuItem>
        <NavigationMenuItem className="flex flex-col items-center justify-center gap-1 h-9">
          <NavDropdownMenu />
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
