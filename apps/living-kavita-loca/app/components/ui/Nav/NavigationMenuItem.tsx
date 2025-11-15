import {
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@kavita-likes-fajitas/ui-library/shadcn/components/ui/NavigationMenu";

type StandardNavigationMenuItemLinkProps = {
  children: React.ReactNode;
  className?: string;
};
export function StandardNavigationMenuItemLink({
  children,
  className,
}: StandardNavigationMenuItemLinkProps) {
  return (
    <NavigationMenuItem className={className}>
      <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
        {children}
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
}
