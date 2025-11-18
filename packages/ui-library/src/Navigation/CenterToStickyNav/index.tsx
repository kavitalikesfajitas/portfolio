import clsx from "clsx";
import { useScroll, useSpring, useTransform, motion } from "motion/react";
import Image from "next/image";
import { useIsLessThanDesktop } from "@kavita-likes-fajitas/shadcn-ui-lib/hooks/useBreakpoint";

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
  const isLessThanDesktop = useIsLessThanDesktop();

  const progress = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    mass: 0.2,
  });

  const range: [number, number] = [0, 0.2];

  const variant = isMobile
    ? variants.mobile
    : isLessThanDesktop
      ? variants.md
      : variants.lg;

  const top = useTransform(progress, range, [variant.top, "0%"]);
  const width = useTransform(progress, range, [variant.width, "100%"]);
  const borderRadius = useTransform(progress, range, [variant.borderRadius, 0]);
  const boxShadow = useTransform(progress, range, [
    "0 12px 35px rgba(0,0,0,0.4)",
    "0 4px 18px rgba(0,0,0,0.25)",
  ]);
  console.log({ progress });
  // 💋 + text logo animation (nav version)
  const logoOpacity = useTransform(progress, range, [0, 1]);
  const logoScale = useTransform(progress, range, [0.8, 1]);
  const logoY = useTransform(progress, range, ["20%", "0%"]);
  const logoWidth = useTransform(progress, range, ["0%", "100%"]);
  const logoDisplay = useTransform(progress, [0, 1], ["none", "flex"]);
  return (
    <motion.div
      className={clsx(
        "sticky left-0 z-50 mx-auto flex min-w-fit items-center justify-between gap-6 overflow-visible bg-white text-gray-950",
        "rounded-full",
      )}
      style={{ top, width, borderRadius, boxShadow }}
    >
      {/* Brand lockup: lips + text */}
      <motion.div
        style={{
          opacity: logoOpacity,
          scale: logoScale,
          y: logoY,
          display: logoDisplay,
          width: logoWidth,
        }}
        className="flex items-center gap-2"
      >
        <div className="relative h-8 w-8 md:h-9 md:w-9">
          <Image
            src="/images/lips-glossy.png"
            alt="Living Kavita Loca lips"
            fill
            className="object-contain"
          />
        </div>
        <span className="text-xs font-semibold uppercase tracking-[0.25em] md:text-sm">
          Living Kavita Loca
        </span>
      </motion.div>

      {/* Nav items in the center/right */}
      <div className="flex flex-1 items-center justify-center gap-6">
        {children}
      </div>
    </motion.div>
  );
}
