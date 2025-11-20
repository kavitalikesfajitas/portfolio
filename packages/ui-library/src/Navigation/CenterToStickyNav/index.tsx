import clsx from "clsx";
import { useScroll, useSpring, useTransform, motion } from "motion/react";
import Image from "next/image";
import { useIsDesktopOrLarger } from "@kavita-likes-fajitas/shadcn-ui-lib/hooks/useBreakpoint";

const variants = {
  mobile: {
    top: "55%",
    left: "50%",
    x: "-50%",
    y: "-50%",
    width: "36%",
    borderRadius: 99,
    boxShadow: "0 12px 35px rgba(0,0,0,0.4)",
  },
  lg: {
    top: "78%",
    left: "50%",
    x: "-50%",
    y: "-50%",
    width: "50%",
    borderRadius: 999,
    boxShadow: "0 12px 35px rgba(0,0,0,0.4)",
  },
  md: {
    top: "70%",
    left: "50%",
    x: "-50%",
    y: "-50%",
    width: "50%",
    borderRadius: 999,
    boxShadow: "0 12px 35px rgba(0,0,0,0.4)",
  },
} as const;

type CenterStickyNavProps = React.PropsWithChildren<{
  isMobile: boolean;
}>;

export function CenterStickyNav({ isMobile, children }: CenterStickyNavProps) {
  const { scrollYProgress } = useScroll();

  const isDesktopOrLarger = useIsDesktopOrLarger();
  const progress = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    mass: 0.2,
  });

  const range: [number, number] = [0, 0.2];

  const variant = isMobile
    ? variants.mobile
    : !!isDesktopOrLarger
      ? variants.lg
      : variants.md;

  const top = useTransform(progress, range, [variant.top, "0%"]);
  const width = useTransform(progress, range, [variant.width, "100%"]);
  const borderRadius = useTransform(progress, range, [variant.borderRadius, 0]);
  const boxShadow = useTransform(progress, range, [
    "0 12px 35px rgba(0,0,0,0.4)",
    "0 4px 18px rgba(0,0,0,0.25)",
  ]);

  // 💋 + text logo animation (nav version)
  // Start logo animation at 50% of nav animation (0.1 to 0.2)
  const logoRange: [number, number] = [0.1, 0.2];
  const logoOpacity = useTransform(progress, logoRange, [0, 1]);
  const logoScale = useTransform(progress, logoRange, [0.8, 1]);
  const logoY = useTransform(progress, logoRange, ["20%", "0%"]);

  const logoFlexBasis = useTransform(progress, logoRange, ["0%", "40%"]);
  const logoFlexShrink = useTransform(progress, logoRange, [0, 0]);

  // Nav items: move from center to right as logo appears
  // Flex-grow: starts at 1 (takes all space, centers content), ends at 0 (no extra space)
  const navFlexGrow = useTransform(progress, logoRange, [1, 0]);

  return (
    <motion.div
      className={clsx(
        "sticky left-0 z-50 mx-auto flex min-w-fit items-center justify-between overflow-visible bg-white text-gray-950",
        "rounded-full",
      )}
      style={{ top, width, borderRadius, boxShadow }}
    >
      <motion.div
        style={{
          opacity: logoOpacity,
          scale: logoScale,
          y: logoY,
          flexBasis: logoFlexBasis,
          flexShrink: logoFlexShrink,
        }}
        className="flex items-center gap-1 overflow-hidden whitespace-nowrap md:gap-2"
      >
        <span className="pl-1 text-xs font-semibold uppercase leading-tight tracking-tight sm:text-sm md:pl-2 md:text-base md:tracking-[0.25em]">
          Living Kavita Loca
        </span>
        <div className="relative h-6 w-6 md:h-9 md:w-9">
          <Image
            src="/images/lips-glossy.png"
            alt="Living Kavita Loca lips"
            fill
            className="object-contain"
          />
        </div>
      </motion.div>

      {/* Nav items in the center/right */}
      <motion.div
        className="flex items-center justify-center"
        style={{ flexGrow: navFlexGrow }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
