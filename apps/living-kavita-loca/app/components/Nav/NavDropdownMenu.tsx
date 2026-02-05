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
import { WORK_ITEMS } from "@/app/work/workItems";

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
          {WORK_ITEMS.map((item) => (
            <DropdownMenuLink
              key={item.slug}
              href={`/work/${item.slug}`}
              className="text-sm md:text-base"
            >
              {item.title}
            </DropdownMenuLink>
          ))}
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
