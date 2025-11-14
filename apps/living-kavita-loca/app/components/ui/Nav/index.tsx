"use client";

import * as React from "react";

import { useIsMobile } from "@kavita-likes-fajitas/ui-library/shadcn/hooks/useMobile";
import {
  NavigationMenu,
  NavigationMenuList,
} from "@kavita-likes-fajitas/ui-library/shadcn/components/ui/NavigationMenu";
import { ListThatGrowsOut } from "./ListThatGrowsOut";
import { motion } from "motion/react";
import { NavigationMenuItemLink } from "./NavigationMenuItem";
import { ListThatsFancy } from "./ListThatsFancy";
import { useEffect, useState } from "react";
import clsx from "clsx";

const navVariants = {
  centered: {
    top: "80%",
    left: "50%",
    x: "-50%",
    y: "-50%",
    width: "50%",
    borderRadius: 999,
    boxShadow: "0 12px 35px rgba(0,0,0,0.4)",
  },
  sticky: {
    top: 0,
    left: 0,
    x: 0,
    y: 0,
    width: "100%",
    borderRadius: 0,
    boxShadow: "0 4px 18px rgba(0,0,0,0.25)",
  },
} as const;

export function Nav() {
  const isMobile = useIsMobile();

  return (
    <NavigationMenu viewport={isMobile}>
      <NavigationMenuList className="flex-wrap text-gray-950 bg-white rounded-2xl ">
        <ListThatsFancy />
        <ListThatGrowsOut />
        <NavigationMenuItemLink />
      </NavigationMenuList>
    </NavigationMenu>
  );
}

export function CenterStickyNav() {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsSticky(window.scrollY > 40); // threshold in px
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      className={clsx(
        "fixed z-50 flex items-center gap-6 bg-white text-gray-950 px-6 py-3",
        "transition-[color,background] duration-200", // for colors; layout handled by Framer
      )}
      variants={navVariants}
      initial="centered"
      animate={isSticky ? "sticky" : "centered"}
      transition={{ type: "spring", stiffness: 260, damping: 30 }}
    >
      <Nav />
    </motion.nav>
  );
}
