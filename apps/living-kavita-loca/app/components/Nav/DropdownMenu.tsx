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

export function DropdownMenuBasic() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>Explore</DropdownMenuTrigger>
      <DropdownMenuContent align="center" className="border-none shadow-none">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Recent Projects</DropdownMenuLabel>
          <DropdownMenuLink href="/work/opensea-swoosh-id" className="text-sm">
            Dynamic Svg for Swoosh Id
          </DropdownMenuLink>
          <DropdownMenuLink
            href="/work/contentful-graphql-proxy"
            className="text-sm"
          >
            Contentful GraphQL Proxy
          </DropdownMenuLink>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
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
    <DropdownMenuItem asChild>
      <Link href={href} className={className}>
        {children}
      </Link>
    </DropdownMenuItem>
  );
};
