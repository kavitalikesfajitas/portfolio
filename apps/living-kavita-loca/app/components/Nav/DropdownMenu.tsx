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

export function DropdownMenuBasic() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>Explore</DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="border-none shadow-none p-3"
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel>Recent Projects</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuLink href="/work/opensea-swoosh-id" className="text-sm">
            Dynamic Svg for Swoosh Id
          </DropdownMenuLink>
          <DropdownMenuLink
            href="/work/contentful-graphql-proxy"
            className="text-sm"
          >
            Contentful GraphQL Proxy
          </DropdownMenuLink>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-sm text-muted-foreground italic cursor-default"
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
