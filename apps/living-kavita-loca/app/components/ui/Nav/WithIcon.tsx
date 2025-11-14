import {
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@kavita-likes-fajitas/ui-library/shadcn/components/ui/NavigationMenu";
import Link from "next/link";
import { CircleCheckIcon, CircleHelpIcon, CircleIcon } from "lucide-react";

const NavigationMenuItemWithIcon = () => {
  return (
    <NavigationMenuItem className="hidden md:block">
      <NavigationMenuTrigger>With Icon</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid w-[200px] gap-4">
          <li>
            <NavigationMenuLink asChild>
              <Link href="#" className="flex-row items-center gap-2">
                <CircleHelpIcon />
                Backlog
              </Link>
            </NavigationMenuLink>
            <NavigationMenuLink asChild>
              <Link href="#" className="flex-row items-center gap-2">
                <CircleIcon />
                To Do
              </Link>
            </NavigationMenuLink>
            <NavigationMenuLink asChild>
              <Link href="#" className="flex-row items-center gap-2">
                <CircleCheckIcon />
                Done
              </Link>
            </NavigationMenuLink>
          </li>
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};

export default NavigationMenuItemWithIcon;
