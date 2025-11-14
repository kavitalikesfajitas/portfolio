import {
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@kavita-likes-fajitas/ui-library/shadcn/components/ui/NavigationMenu";
import Link from "next/link";

export function NavigationMenuItemLink() {
  return (
    <NavigationMenuItem>
      <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
        <Link href="/docs">Docs</Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
}
