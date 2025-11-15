"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import clsx from "clsx";

type CenterStickyNavProps = React.PropsWithChildren<{
  isMobile: boolean;
}>;

export function CenterStickyNav2({ isMobile, children }: CenterStickyNavProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  // Scroll progress relative to this sticky container area
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start start"],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    mass: 0.2,
  });

  // START SIZE
  const startWidth = isMobile ? "303px" : "50%";

  // Animate width to 100%
  const width = useTransform(progress, [0, 1], [startWidth, "100%"]);
  const borderRadius = useTransform(progress, [0, 1], [999, 0]);
  const boxShadow = useTransform(
    progress,
    [0, 1],
    ["0 12px 35px rgba(0,0,0,0.4)", "0 4px 18px rgba(0,0,0,0.25)"],
  );

  return (
    <div
      ref={ref}
      className="
        sticky
        top-4
        z-50
        flex
        justify-center
        pointer-events-none
      "
    >
      <motion.nav
        className={clsx(
          "pointer-events-auto",
          "bg-white text-gray-950 px-6 py-3 flex items-center justify-center gap-6",
        )}
        style={{
          width,
          borderRadius,
          boxShadow,
        }}
      >
        {children}
      </motion.nav>
    </div>
  );
}
