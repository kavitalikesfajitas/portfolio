import {
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@kavita-likes-fajitas/ui-library/shadcn/components/ui/NavigationMenu";
import Link from "next/link";

export default function SimpleList() {
  return (
    <NavigationMenuItem className="hidden md:block">
      <NavigationMenuTrigger>Simple</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid w-[200px] gap-4">
          <li>
            <NavigationMenuLink asChild>
              <Link href="#">Components</Link>
            </NavigationMenuLink>
            <NavigationMenuLink asChild>
              <Link href="#">Documentation</Link>
            </NavigationMenuLink>
            <NavigationMenuLink asChild>
              <Link href="#">Blocks</Link>
            </NavigationMenuLink>
          </li>
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}
