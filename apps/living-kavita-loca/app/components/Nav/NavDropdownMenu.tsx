"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@kavita-likes-fajitas/shadcn-ui-lib/components/ui/dropdown-menu";
import Link from "next/link";
import clsx from "clsx";

export function NavDropdownMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="">
        <span className=" pr-1">Explore</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="p-3">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-sm md:text-base">
            Recent Projects
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuLink
            href="/work/opensea-swoosh-id"
            className="text-sm md:text-base"
          >
            Dynamic Svg for Swoosh Id
          </DropdownMenuLink>
          <DropdownMenuLink
            href="/work/contentful-graphql-proxy"
            className="text-sm md:text-base"
          >
            Contentful GraphQL Proxy
          </DropdownMenuLink>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-sm md:text-base text-muted-foreground italic cursor-default"
            disabled
          >
            More projects coming soon...
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const DropdownMenuLink = ({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}): React.ReactNode => {
  return (
    <DropdownMenuItem className={clsx("p-2", className)} asChild>
      <Link href={href}>{children}</Link>
    </DropdownMenuItem>
  );
};
