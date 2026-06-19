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
          <DropdownMenuSeparator />
          <DropdownMenuLabel className="text-sm md:text-base">
            Websites
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuExternalLink
            href="https://dammitigottagetanewjob.com/"
            className="text-sm md:text-base"
          >
            Dammit I Gotta Get A New Job - A Side Quest
          </DropdownMenuExternalLink>
          <DropdownMenuLink href="/old-site" className="text-sm md:text-base">
            Old Living Kavita Loca Site
          </DropdownMenuLink>
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

const DropdownMenuExternalLink = ({
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
      <a href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    </DropdownMenuItem>
  );
};
