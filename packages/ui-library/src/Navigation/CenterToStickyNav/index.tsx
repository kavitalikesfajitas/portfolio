import clsx from "clsx";
import { useScroll, useSpring, useTransform, motion } from "motion/react";
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
  // 0 at top of page, 1 at very bottom
  const { scrollYProgress } = useScroll();
  const isLessThanDesktop = useIsLessThanDesktop();
  // Smooth the progress a bit so the animation feels nice
  const progress = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    mass: 0.2,
  });

  // We only morph the nav in the first 20% of scroll
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

  return (
    <motion.div
      className={clsx(
        "sticky left-0 z-50 mx-auto flex min-w-fit items-center justify-center gap-6 overflow-visible scroll-smooth bg-white text-gray-950",
        "rounded-full",
      )}
      style={{ top, width, borderRadius, boxShadow }}
    >
      {children}
    </motion.div>
  );
}
