import {
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@kavita-likes-fajitas/ui-library/shadcn/components/ui/NavigationMenu";
import Link from "next/link";

export const ListWithSubtext = () => {
  return (
    <NavigationMenuItem className="hidden md:block">
      <NavigationMenuTrigger>List</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid w-[300px] gap-4">
          <li>
            <NavigationMenuLink asChild>
              <Link href="#">
                <div className="font-medium">Components</div>
                <div className="text-muted-foreground">
                  Browse all components in the library.
                </div>
              </Link>
            </NavigationMenuLink>
            <NavigationMenuLink asChild>
              <Link href="#">
                <div className="font-medium">Documentation</div>
                <div className="text-muted-foreground">
                  Learn how to use the library.
                </div>
              </Link>
            </NavigationMenuLink>
            <NavigationMenuLink asChild>
              <Link href="#">
                <div className="font-medium">Blog</div>
                <div className="text-muted-foreground">
                  Read our latest blog posts.
                </div>
              </Link>
            </NavigationMenuLink>
          </li>
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};
