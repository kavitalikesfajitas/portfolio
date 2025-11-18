import {
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@kavita-likes-fajitas/shadcn-ui-lib/components/ui/navigation-menu";

type StandardNavigationMenuItemLinkProps = {
  children: React.ReactNode;
  className?: string;
};
export function StandardNavigationMenuItemLink({
  children,
  className,
}: StandardNavigationMenuItemLinkProps) {
  return (
    <NavigationMenuItem className={className} id="nav-item">
      <NavigationMenuLink
        asChild
        className={navigationMenuTriggerStyle()}
        id="nav-link"
      >
        {children}
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
}
