import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from "@kavita-likes-fajitas/shadcn-ui-lib/components/ui/navigation-menu";
import clsx from "clsx";
import Link from "next/link";

export function ListThatsFancy() {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger className="px-0 rounded-sm">
        Recent Projects
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="w-auto left-2.5 md:w-96 flex flex-row md:flex-col gap-4 justify-start  text-sm">
          <ListItem href="/docs" title="Introduction">
            Re-usable components built with Tailwind CSS.
          </ListItem>
          <ListItem href="/docs/installation" title="Installation">
            How to install dependencies and structure your app.
          </ListItem>
          <ListItem href="/docs/primitives/typography" title="Typography">
            Styles for headings, paragraphs, lists...etc
          </ListItem>
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}

export function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props} id={`list-item-${title}`}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="flex flex-col gap-1 text-xs">
            <div className="leading-none font-medium">{title}</div>
            <div className="text-muted-foreground line-clamp-2">{children}</div>
          </div>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}

{
  /* <li className="row-span-3">
<NavigationMenuLink asChild>
  <Link
    className={clsx(
      "from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md",
      "bg-linear-to-b p-4 no-underline outline-hidden transition-all duration-200 select-none focus:shadow-md md:p-6",
    )}
    href="/"
  >
    <div className="mb-2 text-lg font-medium sm:mt-4">
      portfolio
    </div>
    <p className="text-muted-foreground text-sm leading-tight">
      Some of my favorite projects and experiences.
    </p>
  </Link>
</NavigationMenuLink>
</li>
<ListItem href="/work/opensea-swoosh-id" title="OpenSea Swoosh ID">
Beautifully crafted NFTs for Nike&apos;s .SWOOSH digital membership
program.
</ListItem>
<ListItem
href="/work/contentful-graphql-proxy"
title="Contentful GraphQL Proxy"
>
A high-performance GraphQL layer in front of Contentful that caches,
normalizes, and instruments content delivery for Product Detail
Pages (PDPs).
</ListItem> */
}
